import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';

import { IoPlaySharp } from "react-icons/io5";
import { FaChevronLeft, FaStar } from "react-icons/fa";
import { PiArrowsOutLineHorizontalBold } from "react-icons/pi";
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineSquares2X2, } from "react-icons/hi2";

import dados from '../api/detalhes_animes.json'

export default function Video() {

    const { id, tem, ep } = useParams()
    const anime = dados.filter(ani => ani.id_video === id);

    const idAnime = Number(id);
    const temporadaAtual = Number(tem);
    const episodioAtual = Number(ep);

    const [animeId, setAnimeId] = useState(idAnime);
    const [episodio, setEpisodio] = useState(episodioAtual);
    const [temporada, setTemporada] = useState(temporadaAtual);

    const urlDoIframe = `https://serv01.meusdoramas.club/#/video/${animeId}/${temporada}/${episodio}/`;

    const totalEp = anime[0].temporadas.find(tem => tem.id === temporada).total_episodios_temporada



    return (
        <section className="relative w-full mx-auto min-h-screen py-20 bg-zinc-950/90 mb-16 rounded-2xl flex justify-center">

            <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-blue-600/30 blur-[120px]" />
            <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-purple-600/30 blur-[120px]" />

            <div className="w-full max-w-6xl mx-auto mt-14 space-y-6 border-2 rounded border-zinc-900  p-10">
                <Link
                    to={`/anime/${idAnime}`}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-zinc-800/70 border border-zinc-700 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800/90 transition-all duration-300 group">

                    <FaChevronLeft className="text-sm group-hover:-translate-x-1 group-hover:text-blue-500 transition-all duration-300" />

                    <span className="font-medium">
                        Voltar
                    </span>
                </Link>

                <div className="relative aspect-video border border-zinc-700/70">

                    <iframe src={urlDoIframe} className="w-full h-full border-0" title="teste" scrolling="no"
                        allowFullScreen referrerPolicy="no-referrer" />
                </div>

                <div>
                    <h1 className="text-3xl font-bold text-white">
                        {anime[0].nome}
                    </h1>

                    <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-lg bg-zinc-800 px-3 py-1 text-sm text-zinc-300">
                            {anime[0].generos.includes("Dublado") ? "Dublado" : "Legendado"}
                        </span>

                        <span className="rounded-lg bg-zinc-800 px-3 py-1 text-sm text-zinc-300">
                            Temporada {temporada}
                        </span>

                        <span className="rounded-lg bg-blue-500/15 px-3 py-1 text-sm text-blue-400">
                            Episódio {episodio}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-white bg-zinc-950 p-5">

                    <button
                        onClick={() => setEpisodio(prev => Math.max(1, prev - 1))}
                        className={`flex items-center justify-center gap-2 p-6 border rounded-l-lg transition-all duration-300 group ${episodio === 1
                            ? "border-zinc-800 bg-zinc-900/40 text-zinc-500 cursor-not-allowed"
                            : "border-zinc-800 bg-zinc-950/60 hover:border-zinc-600 hover:bg-zinc-900/65 cursor-pointer"
                            }`}
                        disabled={episodio === 1}>
                        <HiOutlineChevronLeft
                            className={`text-xl transition-transform duration-300 ${episodio === 1 ? "" : "group-hover:-translate-x-1"}`} />

                        <span>Anterior</span>
                    </button>

                    <Link to={`/anime/${idAnime}`}>
                        <button className=" w-full flex items-center justify-center gap-2 p-6 border border-zinc-700 bg-zinc-950  hover:border-blue-600 hover:bg-zinc-950/70 transition-all duration-300 cursor-pointer group">

                            <HiOutlineSquares2X2 className="text-xl group-hover:rotate-90 transition-transform duration-300" />
                            <span>Todos os episódios</span>

                        </button>
                    </Link>
                    <button
                        onClick={() => setEpisodio(prev => Math.min(totalEp, prev + 1))}
                        disabled={episodio === totalEp}
                        className={`flex items-center justify-center gap-2 p-6 border rounded-r-lg transition-all duration-300 group ${episodio === totalEp
                            ? "border-zinc-800 bg-zinc-900/40 text-zinc-500 cursor-not-allowed"
                            : "border-zinc-800 bg-zinc-950/60 hover:border-zinc-600 hover:bg-zinc-900/65 cursor-pointer"
                            }`}>

                        <span>Próximo</span>

                        <HiOutlineChevronRight
                            className={`text-xl : transition-transform duration-300 ${episodio === totalEp ? "" : "group-hover:translate-x-1"}`} />

                    </button>

                </div>

                <div className="mt-16 bg-zinc-950 border-r-2 border border-zinc-700/40 rounded-b-2xl p-6 flex flex-col md:flex-row gap-6 items-center">

                    <img src={anime[0].capa} alt={anime[0].nome} className="w-40 rounded-xl object-cover" />
                    <div className="w-full text-white">

                        <div className="flex flex-wrap gap-2 mb-5">
                            <span className="px-3 py-1 rounded-full bg-zinc-800 flex items-center gap-1">
                                <FaStar className="text-yellow-400" />
                                {anime[0].classificacao}
                            </span>

                            <span className="px-3 py-1 rounded-full bg-zinc-800">
                                {anime[0].total_episodios_geral} Episódios
                            </span>

                            <span className="px-3 py-1 rounded-full bg-zinc-800">
                                {anime[0].total_temporadas} Temporada(s)
                            </span>

                            <span className="px-3 py-1 rounded-full bg-zinc-800">
                                {anime[0].generos.includes("Dublado")
                                    ? "Dublado"
                                    : "Legendado"}
                            </span>

                            <span className="px-3 py-1 rounded-full bg-zinc-800">
                                {anime[0].data_lancamento}
                            </span>

                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">

                            {anime[0].generos
                                .filter(g =>
                                    g !== "Dublado" &&
                                    g !== "Legendado" &&
                                    !g.startsWith("Letra")
                                )
                                .map(genero => (
                                    <span
                                        key={genero}
                                        className="px-3 py-1 border border-zinc-700 rounded-full text-zinc-300 text-sm">
                                        {genero}
                                    </span>
                                ))}

                        </div>


                    </div>

                </div>
            </div>

        </section>
    )
}





/* ajusta o video o tamnho pra fazer os limites dos botoes */