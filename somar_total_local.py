import json
import os

def converter_temporadas_para_lista_local():
    caminho_arquivo = 'detalhes_animes.json'
    
    if not os.path.exists(caminho_arquivo):
        print(f"⚠️ Erro: O arquivo '{caminho_arquivo}' não foi encontrado!")
        return

    try:
        print(f"📂 Abrindo '{caminho_arquivo}' para reestruturar as temporadas...")
        with open(caminho_arquivo, 'r', encoding='utf-8') as f:
            lista_animes = json.load(f)
    except Exception as e:
        print(f"❌ Erro ao ler o arquivo JSON: {e}")
        return

    print(f"📊 Processando {len(lista_animes)} animes...")
    contador_convertidos = 0

    for anime in lista_animes:
        nome_anime = anime.get("nome", "Sem Nome")
        temporadas_antigas = anime.get("temporadas", {})
        
        # 🚨 VERIFICAÇÃO: Se já for uma lista, significa que este anime já foi convertido!
        if isinstance(temporadas_antigas, list):
            continue
            
        nova_lista_temporadas = []
        
        # Varre o objeto antigo (Ex: chave="Temporada 1", dados={...})
        for chave_temporada, dados_temporada in temporadas_antigas.items():
            
            # Extrai o número do ID a partir do nome da temporada
            try:
                id_temporada = int(chave_temporada.replace("Temporada", "").strip())
            except ValueError:
                id_temporada = len(nova_lista_temporadas) + 1
                
            # Pega os dados que já existiam
            lista_eps = dados_temporada.get("episodios", [])
            total_eps = dados_temporada.get("total_episodios_temporada", len(lista_eps))
            
            # 🛠️ MONTA O NOVO FORMATO EXATO QUE VOCÊ PEDIU
            bloco_temporada_novo = {
                "id": id_temporada,
                "nome": chave_temporada,  # Ex: "Temporada 1"
                "total_episodios_temporada": total_eps,
                "episodios": lista_eps
            }
            
            nova_lista_temporadas.append(bloco_temporada_novo)
            
        # Ordena a lista pelo ID para garantir que a Temporada 1 venha antes da 2, 3, etc.
        nova_lista_temporadas.sort(key=lambda x: x["id"])
        
        # Substitui o objeto antigo pela lista nova na raiz do anime
        anime["temporadas"] = nova_lista_temporadas
        contador_convertidos += 1
        print(f"  ✓ {nome_anime} convertido para formato Lista []")

    # Salva o arquivo modificado
    if contador_convertidos > 0:
        try:
            with open(caminho_arquivo, 'w', encoding='utf-8') as f:
                json.dump(lista_animes, f, indent=4, ensure_ascii=False)
            print(f"\n✨ SUCESSO COMPLETO! {contador_convertidos} animes foram reestruturados para o novo formato!")
        except Exception as e:
            print(f"❌ Erro ao salvar o arquivo: {e}")
    else:
        print("\n😎 Tudo certo! Todos os animes já estão usando o formato de Lista [].")

if __name__ == "__main__":
    converter_temporadas_para_lista_local()