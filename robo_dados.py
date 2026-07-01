import requests
from bs4 import BeautifulSoup
import json
import time

URL_BASE = "https://meusanimes.blog"
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def extrair_id_video(url_episodio):
    """
    Entra na página de um único episódio para pegar o ID do vídeo.
    """
    try:
        resposta = requests.get(url_episodio, headers=HEADERS, timeout=15)
        if resposta.status_code != 200:
            return ""
            
        soup = BeautifulSoup(resposta.text, 'html.parser')
        
        div_play = soup.find('div', class_='play-box-iframe')
        iframe = div_play.find('iframe') if div_play else soup.find('iframe')
        
        if iframe and iframe.has_attr('src'):
            src = iframe['src']
            if "/video/" in src:
                parte_id = src.split("/video/")[1]
                id_video = parte_id.split("/")[0]
                return id_video
                
        return ""
    except Exception as e:
        print(f"  ⚠️ Erro ao extrair ID do episódio {url_episodio}: {e}")
        return ""


def extrair_detalhes_do_anime(url_anime):
    try:
        resposta = requests.get(url_anime, headers=HEADERS, timeout=15)
        if resposta.status_code != 200:
            return None
    except Exception as e:
        print(f"❌ Erro de conexão no link {url_anime}: {e}")
        return None

    soup = BeautifulSoup(resposta.text, 'html.parser')
    
    tag_h1 = soup.find('h1')
    nome = tag_h1.text.replace("Online", "").strip() if tag_h1 else "Sem Nome"
    
    tag_date = soup.find('span', class_='date', itemprop='dateCreated')
    data_lancamento = tag_date.text.strip() if tag_date else "Não informada"
    
    div_poster = soup.find('div', class_='poster')
    tag_img = div_poster.find('img', itemprop='image') if div_poster else None
    capa = tag_img['src'].strip() if tag_img and tag_img.has_attr('src') else ""
    
    tag_rating = soup.find('span', itemprop='ratingValue')
    classificacao = tag_rating.text.strip() if tag_rating else "0"
    
    div_generos = soup.find('div', class_='sgeneros')
    generos = [a.text.strip() for a in div_generos.find_all('a')] if div_generos else []
    
    div_content = soup.find('div', class_='wp-content')
    tag_p = div_content.find('p') if div_content else None
    lore = tag_p.text.strip() if tag_p else ""
    if lore.startswith("Assistir"):
        partes_lore = lore.split(",", 1)
        if len(partes_lore) > 1:
            lore = partes_lore[1].strip()

    temporadas = {}
    id_unico_do_anime = "" # Variavel para guardar o ID que pegaremos apenas uma vez
    ja_pegou_id = False # Marcador para saber se já achamos o ID

    div_seasons = soup.find('div', id='seasons')
    if div_seasons:
        blocos_temporada = div_seasons.find_all('div', class_='se-c')
        for bloco in blocos_temporada:
            tag_num_temporada = bloco.find('span', class_='se-o')
            num_temporada = tag_num_temporada.text.strip() if tag_num_temporada else "1"
            
            chave_temporada = f"Temporada {num_temporada}"
            
            temporadas[chave_temporada] = {
                "total_episodios_temporada": 0,
                "episodios": []
            }
            
            tag_ul_episodios = bloco.find('ul', class_='episodios')
            if tag_ul_episodios:
                itens_li = tag_ul_episodios.find_all('li')
                for li in itens_li:
                    div_imagen = li.find('div', class_='imagen')
                    img_ep_tag = div_imagen.find('img') if div_imagen else None
                    capa_episodio = img_ep_tag['src'].strip() if img_ep_tag and img_ep_tag.has_attr('src') else ""

                    div_numerando = li.find('div', class_='numerando')
                    num_episodio = div_numerando.text.split('-')[-1].strip() if div_numerando else "0"
                    
                    div_title = li.find('div', class_='episodiotitle')
                    tag_a_ep = div_title.find('a', href=True) if div_title else None
                    link_episodio = tag_a_ep['href'].strip() if tag_a_ep else ""
                    
                    if link_episodio:
                        # 🚨 APENAS UMA VEZ POR ANIME: Entra no link se ainda não tiver o ID
                        if not ja_pegou_id:
                            print(f"  🎬 Buscando ID de referência no Ep {num_episodio}...")
                            id_unico_do_anime = extrair_id_video(link_episodio)
                            if id_unico_do_anime:
                                ja_pegou_id = True # Achou um ID válido? Ativa o marcador para ignorar as próximas páginas de ep

                        temporadas[chave_temporada]["episodios"].append({
                            "numero_episodio": num_episodio,
                            "capa_episodio": capa_episodio,
                            "link": link_episodio
                        })

            total_convertido = len(temporadas[chave_temporada]["episodios"])
            temporadas[chave_temporada]["total_episodios_temporada"] = total_convertido

    total_temporadas = len(temporadas)

    # O "id_video" agora fica na raiz do objeto do anime
    anime_completo = {
        "nome": nome,
        "id_video": id_unico_do_anime,  # 👈 ID salvo aqui na raiz do objeto!
        "data_lancamento": data_lancamento,
        "capa": capa,
        "classificacao": classificacao,
        "generos": generos,
        "lore": lore,
        "link_anime": url_anime,
        "total_temporadas": total_temporadas,
        "temporadas": temporadas
    }
    
    return anime_completo


def executar_robo_completo():
    try:
        print("📂 Carregando links do arquivo 'lista_animes.json'...")
        with open('lista_animes.json', 'r', encoding='utf-8') as f:
            dados_animes = json.load(f)
            
        links_totais = [item["link"] for item in dados_animes if "link" in item]
        
    except FileNotFoundError:
        print("⚠️ Atenção: O arquivo 'lista_animes.json' não foi encontrado!")
        return

    total_animes = len(links_totais)
    print(f"\n🔗 Pronto! Encontrados {total_animes} links para processar.\n")
    
    dados_finais = []
    
    for indice, link in enumerate(links_totais, start=1):
        print(f"📦 [{indice}/{total_animes}] Extraindo: {link}")
        
        resultado_anime = extrair_detalhes_do_anime(link)
        
        if resultado_anime:
            dados_finais.append(resultado_anime)
            
            with open('detalhes_animes.json', 'w', encoding='utf-8') as f:
                json.dump(dados_finais, f, indent=4, ensure_ascii=False)
        
        time.sleep(0.4)

    print(f"\n💾 SUCESSO COMPLETO! O robô salvou tudo em 'detalhes_animes.json'!")


if __name__ == "__main__":
    executar_robo_completo()