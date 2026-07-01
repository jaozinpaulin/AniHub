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

def iniciar_mineracao_final_otimizada_com_resgate():
    animes_mapeados = carregar_links_episodios()
    
    if not animes_mapeados:
        print("Nenhum dado encontrado para minerar.")
        return
        
    # --- 🔌 SISTEMA DE RESGATE CONTRA QUEDA DE ENERGIA ---
    banco_final_leve = []
    animes_ja_salvos = set()
    
    try:
        with open('banco_final_super_leve.json', 'r', encoding='utf-8') as f:
            banco_final_leve = json.load(f)
            for item in banco_final_leve:
                animes_ja_salvos.add(item['nome'])
        print(f"🔄 Resgate ativado! Encontrei {len(animes_ja_salvos)} animes já minerados salvos no arquivo.")
    except FileNotFoundError:
        print("🆕 Nenhum arquivo anterior encontrado. Começando do zero absoluto.")
    # -----------------------------------------------------
        
    print(f"🤖 Robô Premium Otimizado Iniciado... Processando {len(animes_mapeados)} animes.")
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
    
    for i_anime, anime in enumerate(animes_mapeados, start=1):
        # 🚨 Pula os animes que o robô já tinha completado antes da luz cair
        if anime['anime'] in animes_ja_salvos:
            print(f"<h3>⏭️ [{i_anime}/{len(animes_mapeados)}] Ignorando '{anime['anime']}' (Já está salvo sã e salvo)</h3>")
            continue
            
        print(f"\n📺 [{i_anime}/{len(animes_mapeados)}] Entrando no fluxo de: {anime['anime']}")
        temporadas_mineradas = []
        
        for temp in anime['temporadas']:
            num_temporada = temp['temporada']
            links_eps = temp['links_episodios']
            total_eps_temporada = len(links_eps)
            
            print(f"   🔹 Processando a Temporada {num_temporada} ({total_eps_temporada} episódios)...")
            
            id_player_temporada = None
            audio_temporada = "Legendado"
            lista_episodios_finais = []
            
            for idx_ep, url_ep in enumerate(links_eps, start=1):
                print(f"      🔄 [{idx_ep}/{total_eps_temporada}] Acessando: {url_ep}")
                
                try:
                    resposta = requests.get(url_ep, headers=headers, timeout=12)
                    # CORRIGIDO: Se der erro, ele apenas pula este link, sem travar o código abaixo
                    if resposta.status_code != 200:
                        print(f"      ⚠️ Erro {resposta.status_code}. Pulando este episódio...")
                        continue
                        
                    soup = BeautifulSoup(resposta.text, 'html.parser')
                    
                    # 1. SE FOR O PRIMEIRO EPISÓDIO: Fixa o ID do player e o Áudio da temporada inteira
                    if idx_ep == 1:
                        iframe = soup.find('iframe')
                        if iframe and 'src' in iframe.attrs:
                            src_iframe = iframe['src']
                            match = re.search(r'/video/(\d+)', src_iframe)
                            if match:
                                id_player_temporada = match.group(1)
                        
                        span_qualidade = soup.find('span', class_='qualidade')
                        if span_qualidade:
                            audio_temporada = span_qualidade.text.strip()
                            
                        print(f"      🎯 Dados da Temporada definidos -> ID: {id_player_temporada} | Áudio: {audio_temporada}")
                    
                    # 2. PARA TODOS OS EPISÓDIOS: Pega apenas a Thumbnail da cena
                    div_g_item = soup.find('div', class_='g-item')
                    thumbnail_url = ""
                    if div_g_item and div_g_item.find('img'):
                        thumbnail_url = div_g_item.find('img').get('src', '')
                    
                    # Guarda o episódio leve na lista da temporada
                    lista_episodios_finais.append({
                        "ep": idx_ep,
                        "thumb": thumbnail_url
                    })
                    
                    # Mantém o servidor deles feliz
                    time.sleep(1)
                    
                except Exception as e:
                    print(f"      ❌ Erro de conexão ao acessar o link: {e}")
                    continue
            
            # Só valida a temporada se conseguirmos pescar o ID do player principal dela
            if id_player_temporada and lista_episodios_finais:
                temporadas_mineradas.append({
                    "num_temporada": num_temporada,
                    "total_episodios": total_eps_temporada,
                    "id_player": id_player_temporada,
                    "audio": audio_temporada,
                    "episodios": lista_episodios_finais
                })
        
        # Se coletou as temporadas, monta o pacote completo do anime
        if temporadas_mineradas:
            # Usa a primeira imagem encontrada como capa padrão do card do anime
            capa_anime = temporadas_mineradas[0]['episodios'][0]['thumb'] if temporadas_mineradas[0]['episodios'] else ""
            
            banco_final_leve.append({
                "nome": anime['anime'],
                "capa": capa_anime,
                "url_original": anime['url_catalogo'],
                "temporadas": temporadas_mineradas
            })
            
        # Gravação em lote segura: atualiza o arquivo de minuto em minuto a cada anime pronto
        with open('banco_final_super_leve.json', 'w', encoding='utf-8') as f:
            json.dump(banco_final_leve, f, indent=4, ensure_ascii=False)
        print(f"💾 Progresso de '{anime['anime']}' salvo com sucesso!")

    print("\n🎯 BASE FINAL ULTRA COMPACTA PRONTA EM 'banco_final_super_leve.json'!")

if __name__ == "__main__":
    iniciar_mineracao_final_otimizada_com_resgate()