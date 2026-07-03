import requests
from bs4 import BeautifulSoup
import json
import time
import os

URL_BASE = "https://meusanimes.blog"
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def extrair_id_video(url_episodio):
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


def extrair_detalhes_do_anime(url_anime, dados_existentes=None):
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
    id_unico_do_anime = dados_existentes.get("id_video", "") if dados_existentes else ""
    ja_pegou_id = True if id_unico_do_anime else False
    
    total_episodios_geral = 0

    div_seasons = soup.find('div', id='seasons')
    if div_seasons:
        blocos_temporada = div_seasons.find_all('div', class_='se-c')
        
        for bloco in blocos_temporada:
            tag_num = bloco.find('span', class_=lambda x: x and 'se-t' in x)
            num_temporada = tag_num.text.strip() if tag_num else None
            
            if not num_temporada:
                tag_title = bloco.find('span', class_='title')
                if tag_title and "Temporada" in tag_title.text:
                    num_temporada = tag_title.text.replace("Temporada", "").strip().split()[0]
                else:
                    num_temporada = str(len(temporadas) + 1)
            
            chave_temporada = f"Temporada {num_temporada}"
            
            temporadas[chave_temporada] = {
                "total_episodios_temporada": 0,
                "episodios": []
            }
            
            tag_ul = bloco.find('ul', class_='episodios')
            if tag_ul:
                itens_li = tag_ul.find_all('li')
                for li in itens_li:
                    div_title = li.find('div', class_='episodiotitle')
                    tag_a_ep = div_title.find('a', href=True) if div_title else li.find('a', href=True)
                    link_episodio = tag_a_ep['href'].strip() if tag_a_ep else ""
                    
                    if link_episodio:
                        div_imagen = li.find('div', class_='imagen')
                        img_ep = div_imagen.find('img') if div_imagen else li.find('img')
                        capa_episodio = img_ep['src'].strip() if img_ep and img_ep.has_attr('src') else ""
                        
                        div_numerando = li.find('div', class_='numerando')
                        num_episodio = div_numerando.text.split('-')[-1].strip() if div_numerando else "0"
                        
                        if not ja_pegou_id:
                            print(f"  🎬 Buscando ID de referência no Ep {num_episodio} da {chave_temporada}...")
                            id_unico_do_anime = extrair_id_video(link_episodio)
                            if id_unico_do_anime:
                                ja_pegou_id = True
                                
                        temporadas[chave_temporada]["episodios"].append({
                            "numero_episodio": num_episodio,
                            "capa_episodio": capa_episodio,
                            "link": link_episodio
                        })
            
            total_da_temporada = len(temporadas[chave_temporada]["episodios"])
            temporadas[chave_temporada]["total_episodios_temporada"] = total_da_temporada
            total_episodios_geral += total_da_temporada

    total_temporadas = len(temporadas)

    anime_completo = {
        "nome": nome,
        "id_video": id_unico_do_anime,  
        "data_lancamento": data_lancamento,
        "capa": capa,
        "classificacao": classificacao,
        "generos": generos,
        "lore": lore,
        "link_anime": url_anime,
        "total_temporadas": total_temporadas,
        "total_episodios_geral": total_episodios_geral,
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

    lista_original = []
    if os.path.exists('detalhes_animes.json'):
        try:
            print("💾 Carregando base de dados 'detalhes_animes.json'...")
            with open('detalhes_animes.json', 'r', encoding='utf-8') as f:
                lista_original = json.load(f)
                if not isinstance(lista_original, list):
                    lista_original = []
        except Exception as e:
            print(f"⚠️ Erro ao ler base existente: {e}.")

    total_animes = len(links_totais)
    print(f"\n🔗 Pronto! Analisando {total_animes} links.\n")
    
    for indice, link in enumerate(links_totais, start=1):
        posicao_do_anime = None
        anime_antigo = None
        
        for i, item in enumerate(lista_original):
            if item.get("link_anime") == link:
                posicao_do_anime = i
                anime_antigo = item
                break
        
        # 🚨 MODO TURBO ATIVADO AQUI:
        # Se o anime já existe, tem ID de vídeo coletado e NÃO está marcado como "Em Lançamento", 
        # significa que ele está concluído. Pulamos o acesso web para economizar tempo!
        if anime_antigo and anime_antigo.get("id_video"):
            generos_antigos = anime_antigo.get("generos", [])
            
            if "Em Lançamento" not in generos_antigos:
                print(f"⚡ [PULO TURBO] [{indice}/{total_animes}] Mantendo antigo (Já finalizado): {link}")
                
                # Caso o arquivo antigo ainda não tenha o total geral calculado, injeta agora!
                if "total_episodios_geral" not in anime_antigo:
                    total_calculado = sum(t.get("total_episodios_temporada", 0) for t in anime_antigo.get("temporadas", {}).values())
                    lista_original[posicao_do_anime]["total_episodios_geral"] = total_calculado
                    
                    with open('detalhes_animes.json', 'w', encoding='utf-8') as f:
                        json.dump(lista_original, f, indent=4, ensure_ascii=False)
                continue

        # Executa a raspagem de internet normal se for Novo ou se estiver "Em Lançamento"
        if anime_antigo:
            print(f"🔄 [{indice}/{total_animes}] Atualizando link ativo (Em Lançamento): {link}")
        else:
            print(f"📦 [{indice}/{total_animes}] Inserindo novo anime no arquivo: {link}")
        
        resultado_anime = extrair_detalhes_do_anime(link, dados_existentes=anime_antigo)
        
        if resultado_anime:
            if posicao_do_anime is not None:
                lista_original[posicao_do_anime] = resultado_anime
            else:
                lista_original.append(resultado_anime)
            
            with open('detalhes_animes.json', 'w', encoding='utf-8') as f:
                json.dump(lista_original, f, indent=4, ensure_ascii=False)
        
        time.sleep(0.4)

    print(f"\n💾 SUCESSO COMPLETO! O arquivo 'detalhes_animes.json' foi atualizado no modo ultra rápido!")


if __name__ == "__main__":
    executar_robo_completo()