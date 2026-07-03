import requests
from bs4 import BeautifulSoup
import json
import time
import os

URL_BASE = "https://meusanimes.blog"

def iniciar_coleta_infinita():
    print("🤖 Robô de Coleta Automática Ultra Rápido Iniciado...")
    
    lista_de_animes_final = []
    links_mapeados = set()
    
    # CARREGA O ARQUIVO EXISTENTE
    if os.path.exists('lista_animes.json'):
        try:
            print("📂 Carregando histórico para filtragem rápida...")
            with open('lista_animes.json', 'r', encoding='utf-8') as f:
                lista_de_animes_final = json.load(f)
                if not isinstance(lista_de_animes_final, list):
                    lista_de_animes_final = []
            
            for item in lista_de_animes_final:
                if "link" in item:
                    links_mapeados.add(item["link"])
                    
            print(f"✅ Histórico carregado! {len(links_mapeados)} animes mapeados.")
        except Exception as e:
            print(f"⚠️ Erro ao ler histórico: {e}. Criando novo.")

    pagina = 1
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

    while True:
        url_da_pagina = f"{URL_BASE}/a/page/{pagina}/"
        print(f"🌐 Lendo página {pagina} -> {url_da_pagina}")
        
        try:
            resposta = requests.get(url_da_pagina, headers=headers, timeout=15)
            if resposta.status_code == 404:
                print(f"🏁 Fim das páginas alcançado (404).")
                break
            elif resposta.status_code != 200:
                print(f"⚠️ Erro {resposta.status_code}. Pulando...")
                pagina += 1
                continue
        except Exception as e:
            print(f"❌ Erro de conexão: {e}")
            break

        soup = BeautifulSoup(resposta.text, 'html.parser')
        divs_poster = soup.find_all('div', class_='poster')
        
        if not divs_poster:
            print(f"🏁 Página vazia. Encerrando...")
            break
            
        contador_novos_da_pagina = 0
        
        for div in divs_poster:
            tag_a = div.find('a', href=True)
            if tag_a:
                link_anime = tag_a['href'].strip()
                
                # Se já tem no arquivo, ignora e vai pro próximo da página
                if link_anime in links_mapeados:
                    continue
                
                tag_img = div.find('img')
                nome_anime = tag_img.get('alt', '').strip() if tag_img else "Sem Nome"
                img_anime = tag_img.get('src', '').strip() if tag_img else ""
                
                links_mapeados.add(link_anime)
                lista_de_animes_final.append({
                    "nome": nome_anime,
                    "imagem": img_anime,
                    "link": link_anime
                })
                contador_novos_da_pagina += 1

        # 🚨 O SEGREDO DA VELOCIDADE:
        # Se a página tem animes, mas nenhum deles era novo, significa que o robô chegou na parte
        # do site que você já coletou da última vez. Como o site é cronológico, não há por que continuar.
        if contador_novos_da_pagina == 0 and len(links_mapeados) > 0:
            print("\n⚡ [FAST EXIT] Todos os animes desta página já estão no seu arquivo!")
            print("Como o site está atualizado até aqui, não há necessidade de ler as páginas anteriores.")
            break

        # Salva apenas se achou algo novo na página (economiza escrita no disco) 
        if contador_novos_da_pagina > 0:
            print(f"🎯 +{contador_novos_da_pagina} novos adicionados.")
            with open('lista_animes.json', 'w', encoding='utf-8') as f:
                json.dump(lista_de_animes_final, f, indent=4, ensure_ascii=False)
        
        pagina += 1
        time.sleep(0.3) # Pausa ligeiramente menor e mais ágil

    print(f"\n💾 SUCESSO! Total de animes no arquivo: {len(lista_de_animes_final)}")

if __name__ == "__main__":
    iniciar_coleta_infinita()