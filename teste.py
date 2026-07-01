import requests
from bs4 import BeautifulSoup
import json
import time

URL_BASE = "https://meusanimes.blog"

def iniciar_coleta_infinita():
    print("🤖 Robô de Coleta Automática Iniciado...")
    lista_de_animes_final = []
    links_mapeados = set()
    
    pagina = 1
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

    while True:
        url_da_pagina = f"{URL_BASE}/a/page/{pagina}/"
        print(f"🌐 Lendo página {pagina} -> {url_da_pagina}")
        
        try:
            resposta = requests.get(url_da_pagina, headers=headers, timeout=15)
            
            # Se a página não existir (ex: passou da última página do site), o robô para.
            if resposta.status_code == 404:
                print(f"🏁 Fim das páginas alcançado (Erro 404 na página {pagina}). Finalizando...")
                break
            elif resposta.status_code != 200:
                print(f"⚠️ Erro {resposta.status_code} na página {pagina}. Tentando próxima...")
                pagina += 1
                continue
                
        except Exception as e:
            print(f"❌ Erro de conexão na página {pagina}: {e}")
            break

        soup = BeautifulSoup(resposta.text, 'html.parser')
        divs_poster = soup.find_all('div', class_='poster')
        
        # Se a página carregar mas não tiver nenhum anime dentro dela, significa que acabou.
        if not divs_poster:
            print(f"🏁 Nenhun anime encontrado na página {pagina}. Encerrando coleta...")
            break
            
        contador_da_pagina = 0
        
        for div in divs_poster:
            tag_img = div.find('img')
            tag_a = div.find('a', href=True)
            
            if tag_img and tag_a:
                nome_anime = tag_img.get('alt', '').strip()
                img_anime = tag_img.get('src', '').strip()
                link_anime = tag_a['href'].strip()
                
                if link_anime not in links_mapeados:
                    links_mapeados.add(link_anime)
                    
                    lista_de_animes_final.append({
                        "nome": nome_anime,
                        "imagem": img_anime,
                        "link": link_anime
                    })
                    contador_da_pagina += 1

        print(f"🎯 Capturados {contador_da_pagina} novos animes na página {pagina}.")
        
        # Salva o progresso atual no arquivo JSON
        with open('lista_animes.json', 'w', encoding='utf-8') as f:
            json.dump(lista_de_animes_final, f, indent=4, ensure_ascii=False)
        
        # Avança para a próxima página e espera 0.5 segundos
        pagina += 1
        time.sleep(0.5)

    print(f"\n💾 SUCESSO! O robô varreu todo o site e guardou {len(lista_de_animes_final)} animes em 'lista_animes.json'!")

if __name__ == "__main__":
    iniciar_coleta_infinita()