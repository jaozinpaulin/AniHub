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

        <section className="relative w-full mx-auto min-h-dvh  pt-20 sm:py-5 bg-zinc-950/90 mb-16 rounded-2xl flex justify-center px-3 sm:px-0">

            <div className="hidden sm:block absolute top-20 left-20 h-72 w-72 rounded-full bg-blue-600/30 blur-[120px]" />
            <div className="hidden sm:block absolute bottom-20 right-20 h-72 w-72 rounded-full bg-purple-600/30 blur-[120px]" />

            <div className="w-full max-w-6xl mx-auto mt-4 sm:mt-10 space-y-4 sm:space-y-6 lg:border-2 lg:rounded lg:border-zinc-900 sm:p-10">

                <div className="flex justify-start">
                    <Link to={`/anime/${idAnime}`}
                        className="inline-flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-3 bg-zinc-800/70 border border-zinc-700 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800/90 transition-all duration-300 group text-xs sm:text-base">

                        <FaChevronLeft className="text-[10px] sm:text-sm group-hover:-translate-x-1 group-hover:text-blue-500 transition-all duration-300" />
                        <span className="font-medium">Voltar</span>
                    </Link>
                </div>

                <div className="relative aspect-video border border-zinc-700/70 w-full ">
                    <iframe
                        src={urlDoIframe}
                        className="w-full h-full border-0"
                        title="teste"
                        scrolling="no"
                        allowFullScreen
                        referrerPolicy="no-referrer" />
                </div>

                <div className="space-y-1 sm:space-y-2">
                    <h1 className="text-lg sm:text-2xl font-bold text-white leading-tight">
                        {anime[0].nome}
                    </h1>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        <span className="rounded-lg bg-zinc-800 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-sm text-zinc-300">
                            {anime[0].generos.includes("Dublado") ? "Dublado" : "Legendado"}
                        </span>

                        <span className="rounded-lg bg-zinc-800 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-sm text-zinc-300">
                            Temporada {temporada}
                        </span>

                        <span className="rounded-lg bg-blue-500/15 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-sm text-blue-400">
                            Episódio {episodio}
                        </span>
                    </div>
                </div>

                <div className="w-full bg-zinc-950 rounded-xl">
                    <div className="flex flex-row sm:grid sm:grid-cols-3 gap-1.5 sm:gap-4 max-w-3xl mx-auto w-full text-white justify-between">

                        <button
                            onClick={() => setEpisodio(prev => Math.max(1, prev - 1))}
                            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1 sm:gap-2 p-2.5 sm:p-4 border rounded-lg transition-all duration-300 group ${episodio === 1
                                ? "border-zinc-800 bg-zinc-900/40 text-zinc-500 cursor-not-allowed"
                                : "border-zinc-800 bg-zinc-950/60 hover:border-zinc-600 hover:bg-zinc-900/65 cursor-pointer"
                                }`}
                            disabled={episodio === 1}>
                            <HiOutlineChevronLeft
                                className={`text-base sm:text-xl transition-transform duration-300 ${episodio === 1 ? "" : "group-hover:-translate-x-1"}`} />
                            <span className="text-xs sm:text-base truncate">Anterior</span>
                        </button>

                        <Link to={`/anime/${idAnime}`} className="flex-1 sm:flex-initial flex">
                            <button className="w-full flex items-center justify-center gap-1 sm:gap-2 p-2.5 sm:p-4 border border-zinc-700 bg-zinc-950 rounded-lg hover:border-blue-600 hover:bg-zinc-950/70 transition-all duration-300 cursor-pointer group">
                                <HiOutlineSquares2X2 className="text-base sm:text-xl group-hover:rotate-90 transition-transform duration-300 shrink-0" />
                                <span className="text-xs sm:text-base truncate">Episódios</span>
                            </button>
                        </Link>

                        <button
                            onClick={() => setEpisodio(prev => Math.min(totalEp, prev + 1))}
                            disabled={episodio === totalEp}
                            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1 sm:gap-2 p-2.5 sm:p-4 border rounded-lg transition-all duration-300 group ${episodio === totalEp
                                ? "border-zinc-800 bg-zinc-900/40 text-zinc-500 cursor-not-allowed"
                                : "border-zinc-800 bg-zinc-950/60 hover:border-zinc-600 hover:bg-zinc-900/65 cursor-pointer"
                                }`}>
                            <span className="text-xs sm:text-base truncate">Próximo</span>
                            <HiOutlineChevronRight
                                className={`text-base sm:text-xl transition-transform duration-300 ${episodio === totalEp ? "" : "group-hover:translate-x-1"}`} />
                        </button>

                    </div>
                </div>

                <div className="mt-6 sm:mt-12 bg-zinc-950 border border-zinc-700/40 rounded p-4 flex flex-col md:flex-row gap-5 md:gap-8 items-center md:items-start text-white">

                    <div className="shrink-0">
                        <img
                            src={anime[0].capa}
                            alt={anime[0].nome}
                            className="w-28 sm:w-36 md:w-40 rounded-xl object-cover shadow-2xl border border-zinc-800"
                        />
                    </div>

                    <div className="w-full flex flex-col items-center md:items-start gap-4">

                        <div className="text-center md:text-left">
                            <span className="text-zinc-500 text-xs uppercase tracking-wider font-semibold block mb-1">Você está assistindo</span>
                            <h2 className="text-lg sm:text-2xl font-bold text-zinc-100 line-clamp-1">{anime[0].nome}</h2>
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-start gap-1.5 sm:gap-2 text-[11px] sm:text-sm w-full">
                            <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center gap-1">
                                <FaStar className="text-yellow-400 text-[10px] sm:text-xs" />
                                <span className="font-medium">{anime[0].classificacao}</span>
                            </span>

                            <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                                {anime[0].total_episodios_geral} Eps
                            </span>

                            <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                                {anime[0].total_temporadas} Temp.
                            </span>

                            <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                                {anime[0].generos.includes("Dublado") ? "Dublado" : "Legendado"}
                            </span>

                            <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400">
                                {anime[0].data_lancamento}
                            </span>
                        </div>

                        <div className="hidden md:block w-full h-[1px] bg-zinc-800/60 my-1" />

                        <div className="flex flex-wrap justify-center md:justify-start gap-1.5 sm:gap-2 w-full">
                            {anime[0].generos
                                .filter(g =>
                                    g !== "Dublado" &&
                                    g !== "Legendado" &&
                                    !g.startsWith("Letra")
                                )
                                .map(genero => (
                                    <span
                                        key={genero}
                                        className="px-2.5 py-1 bg-zinc-900/50 border border-zinc-800 rounded-md text-zinc-400 text-xs sm:text-sm hover:text-zinc-200 hover:border-zinc-700 transition-colors duration-200">
                                        {genero}
                                    </span>
                                ))
                            }
                        </div>

                    </div>

                </div>
            </div>
        </section>
    )
}





/* ajusta o video o tamnho pra fazer os limites dos botoes */