import requests
from bs4 import BeautifulSoup
import json
import re
import time

def carregar_links_episodios():
    try:
        with open('links_dos_episodios.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print("❌ Erro: O arquivo 'links_dos_episodios.json' não foi encontrado!")
        return []

def iniciar_mineracao_otimizada():
    animes_mapeados = carregar_links_episodios()
    
    if not animes_mapeados:
        print("Nenhum dado encontrado para minerar.")
        return
        
    print(f"🤖 Robô Otimizado Iniciado... Gerando banco de dados leve.")
    banco_final_leve = []
    
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
    
    for i_anime, anime in enumerate(animes_mapeados, start=1):
        print(f"\n📺 [{i_anime}/{len(animes_mapeados)}] Processando Anime: {anime['anime']}")
        
        temporadas_mineradas = []
        
        for temp in anime['temporadas']:
            num_temporada = temp['temporada']
            links_eps = temp['links_episodios']
            total_eps_temporada = len(links_eps)
            
            print(f"   🔹 Temporada {num_temporada} ({total_eps_temporada} episódios)...")
            
            id_player_temporada = None
            audio_temporada = "Legendado"
            lista_episodios_finais = []
            
            # Percorre os episódios da temporada
            for idx, url_ep in enumerate(links_eps, start=1):
                print(f"      🔄 [{idx}/{total_eps_temporada}] Lendo página do episódio...")
                
                try:
                    resposta = requests.get(url_ep, headers=headers, timeout=12)
                    if resposta.status_code != 200:
                        continue
                        
                    soup = BeautifulSoup(resposta.text, 'html.parser')
                    
                    # Se for o PRIMEIRO episódio da temporada, pegamos o ID do player e o Áudio
                    if idx == 1:
                        iframe = soup.find('iframe')
                        if iframe and 'src' in iframe.attrs:
                            src_iframe = iframe['src']
                            match = re.search(r'/video/(\d+)', src_iframe)
                            if match:
                                id_player_temporada = match.group(1)
                        
                        span_qualidade = soup.find('span', class_='qualidade')
                        if span_qualidade:
                            audio_temporada = span_qualidade.text.strip()
                            
                        print(f"      🎯 Dados da Temporada fixados -> ID Player: {id_player_temporada} | Áudio: {audio_temporada}")
                    
                    # Para TODOS os episódios, pegamos apenas a Thumbnail (imagem de cena)
                    div_g_item = soup.find('div', class_='g-item')
                    thumbnail_url = ""
                    if div_g_item and div_g_item.find('img'):
                        thumbnail_url = div_g_item.find('img').get('src', '')
                    
                    # Adiciona o episódio super leve na lista
                    lista_episodios_finais.append({
                        "ep": idx,
                        "thumb": thumbnail_url
                    })
                    
                    # Pausa de segurança padrão
                    time.sleep(1)
                    
                except Exception as e:
                    print(f"      ❌ Erro no link: {e}")
                    continue
            
            # Se conseguimos pegar o ID do player da temporada, salvamos o bloco da temporada
            if id_player_temporada and lista_episodios_finais:
                temporadas_mineradas.append({
                    "num_temporada": num_temporada,
                    "total_episodios": total_eps_temporada,
                    "id_player": id_player_temporada,
                    "audio": audio_temporada,
                    "episodios": lista_episodios_finais
                })
        
        # Se o anime tem temporadas válidas, monta o objeto final dele
        if temporadas_mineradas:
            # Pegamos a primeira thumbnail do primeiro ep como a capa padrão do anime se precisar
            capa_anime = temporadas_mineradas[0]['episodios'][0]['thumb'] if temporadas_mineradas[0]['episodios'] else ""
            
            banco_final_leve.append({
                "nome": anime['anime'],
                "capa": capa_anime, # Capa do anime
                "url_original": anime['url_catalogo'],
                "temporadas": temporadas_mineradas
            })
            
        # Salva o arquivo a cada anime concluído
        with open('banco_final_super_leve.json', 'w', encoding='utf-8') as f:
            json.dump(banco_final_leve, f, indent=4, ensure_ascii=False)
        print(f"💾 Anime '{anime['anime']}' salvo e otimizado!")

    print("\n🎯 PROCESSO CONCLUÍDO! O arquivo 'banco_final_super_leve.json' está ultra compacto!")

if __name__ == "__main__":
    iniciar_mineracao_total_otimizada = iniciar_mineracao_otimizada()