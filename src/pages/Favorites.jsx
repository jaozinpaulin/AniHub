import { Link } from "react-router-dom";
import { animes } from "../api/animes";
import { HiOutlineHeart } from "react-icons/hi2";

import { useState } from 'react';

export default function Favorites() {

    // Estados para controlar qual anime e episódio o usuário está assistindo
    const [animeId, setAnimeId] = useState('37854');
    const [episodio, setEpisodio] = useState(1);
    const [temporada, setTemporada] = useState(1);


    const urlDoIframe = `https://serv01.meusdoramas.club/#/video/${animeId}/${temporada}/${episodio}/`;

    return (
        <div className="py-50 flex flex-col items-center bg-zinc-950 min-h-screen p-6 text-white">

            {/* 1. O PLAYER RESPONSIVO */}
            <div className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-2xl bg-black border border-zinc-800">
                <iframe
                    src={urlDoIframe}
                    className="w-full h-full"
                    scrolling="no"
                    allowFullScreen
                    referrerPolicy="no-referrer"
                />
            </div>

            {/* 2. CONTROLES DE EPISÓDIO (Seus Botões) */}
            <div className="mt-6 flex flex-col items-center gap-4">
                <h2 className="text-xl font-bold">Você está assistindo o Episódio {episodio}</h2>

                <div className="flex gap-2">
                    {/* Botão Voltar */}
                    <button
                        disabled={episodio === 1}
                        onClick={() => setEpisodio(episodio - 1)}
                        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 rounded-lg transition"
                    >
                        Anterior
                    </button>

                    {/* Lista de Episódios Rápida */}
                    {[1, 2, 3, 4, 5].map((numEp) => (
                        <button
                            key={numEp}
                            onClick={() => setEpisodio(numEp)}
                            className={`w-10 h-10 rounded-lg font-medium transition ${episodio === numEp ? 'bg-red-600 text-white' : 'bg-zinc-800 hover:bg-zinc-700'
                                }`}
                        >
                            {numEp}
                        </button>
                    ))}

                    {/* Botão Avançar */}
                    <button
                        onClick={() => setEpisodio(episodio + 1)}
                        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition"
                    >
                        Próximo
                    </button>
                </div>
            </div>

        </div>
    )
}



