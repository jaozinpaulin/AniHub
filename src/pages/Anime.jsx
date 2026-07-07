import { useNavigate, Link, useParams, useLocation } from "react-router-dom";

import { FaStar, FaHeart, FaChevronDown, FaChevronLeft } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";

import dados from '../api/detalhes_animes.json'
import { useState } from "react";


export default function Anime() {

    const navigate = useNavigate();
    const location = useLocation();
    const [loreExpandida, setLoreExpandida] = useState(false);

    const { id } = useParams();

    const animeShow = dados.find((anime) => {
        return anime.id_video === id
    })


    const [temporadaAtual, setTemporadaAtual] = useState(1)
    const temporada = animeShow.temporadas.find((t) => t.id === temporadaAtual);


    const [open, setOpen] = useState(false);


    return (

        <section className="py-10 md:py-20 bg-zinc-950 text-white">

            <div className="hidden md:block relative w-full md:h-[400px] lg:h-[500px] overflow-hidden bg-zinc-900">
                <div className="absolute md:top-20 md:left-20 h-72 w-72 rounded-full bg-blue-600/40 blur-[120px]" />
                <div className="absolute md:bottom-20 md:right-20 h-72 w-72 rounded-full bg-purple-600/40 blur-[120px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-zinc-950" />
            </div>


            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8 relative mt-20 sm:mt-24 md:-mt-44 lg:-mt-56 z-10 border-b-2 border-zinc-800 p-4 md:p-3 px-4 sm:px-6 md:px-10 xl:px-6 bg-zinc-950/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none rounded-xl md:rounded-none mx-4 sm:mx-6 md:mx-auto">

                <button
                    onClick={() => navigate(location.state?.from || '/')}
                    className="w-min flex items-center gap-2 px-3.5 py-2 md:px-5 md:py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all duration-300 cursor-pointer group text-xs md:text-base md:absolute md:-top-20 ">

                    <FaChevronLeft className="text-[10px] md:text-sm group-hover:-translate-x-1 group-hover:text-blue-500 transition-all duration-300" />
                    <span className="font-medium">Voltar</span>
                </button>

                <div className="w-40 sm:w-48 md:w-60 mx-auto md:mx-0 flex-shrink-0 mt-4 md:mt-0">
                    <img
                        src={animeShow.capa}
                        alt={animeShow.nome}
                        className="rounded-xl shadow-2xl border border-zinc-800 w-full object-cover aspect-[2/3]"
                    />
                </div>

                <div className="flex-1 flex flex-col gap-4 min-w-0 text-center md:text-left">

                    <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">

                        <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
                            {animeShow.generos.filter(g =>
                                g !== 'Dublado' &&
                                g !== 'Legendado' &&
                                !g.startsWith('Letra')
                            ).map((gen, i) => (
                                <span
                                    key={i}
                                    className="bg-zinc-900 border border-zinc-800/60 text-zinc-300 px-2.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs md:text-sm font-medium whitespace-nowrap shadow-sm"
                                >
                                    {gen}
                                </span>
                            ))}
                        </div>

                        <div className="w-full sm:w-auto flex justify-center sm:justify-end">
                            <button className="w-full sm:w-auto px-4 py-2 sm:py-2.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 rounded-lg sm:rounded-xl flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer text-xs md:text-sm font-semibold active:scale-[0.98]">
                                <FaHeart className="text-red-500 text-xs md:text-sm" />
                                <span>Favoritar</span>
                            </button>
                        </div>
                    </div>

                    <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold tracking-tight break-words text-zinc-100">
                        {animeShow.nome}
                    </h1>

                    <div className="flex items-center gap-1.5 justify-center md:justify-start text-xs md:text-sm">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-zinc-300 font-semibold">{animeShow.classificacao} / 10</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-2 text-left">
                        <div className="bg-zinc-900/40 border border-zinc-800/40 p-2.5 rounded-xl">
                            <p className="text-zinc-500 text-[10px] md:text-xs font-medium uppercase tracking-wider">Episódios</p>
                            <p className="text-white font-semibold text-xs sm:text-base mt-0.5">{animeShow.total_episodios_geral}</p>
                        </div>

                        <div className="bg-zinc-900/40 border border-zinc-800/40 p-2.5 rounded-xl">
                            <p className="text-zinc-500 text-[10px] md:text-xs font-medium uppercase tracking-wider truncate">Lançamento</p>
                            <p className="text-white font-semibold text-xs sm:text-base mt-0.5">{animeShow.data_lancamento?.split(',')[1] || animeShow.data_lancamento}</p>
                        </div>

                        <div className="bg-zinc-900/40 border border-zinc-800/40 p-2.5 rounded-xl">
                            <p className="text-zinc-500 text-[10px] md:text-xs font-medium uppercase tracking-wider">Temporadas</p>
                            <p className="text-white font-semibold text-xs sm:text-base mt-0.5">{animeShow.total_temporadas}</p>
                        </div>

                        <div className="bg-zinc-900/40 border border-zinc-800/40 p-2.5 rounded-xl">
                            <p className="text-zinc-500 text-[10px] md:text-xs font-medium uppercase tracking-wider">Áudio</p>
                            <p className="text-white font-semibold text-xs sm:text-base mt-0.5">
                                {animeShow.generos.includes("Dublado") ? "Dublado" : "Legendado"}
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="max-w-7xl mx-auto border-r-0 md:border-r-2 border-y-2 border-zinc-800 px-4 sm:px-6 md:px-10 xl:px-6 mt-6">

                <div className="py-4 border-b-2 border-zinc-800 flex flex-col md:flex-row items-start gap-4 justify-between">

                    <div className="flex-1">
                        <p className="text-zinc-400 leading-relaxed text-xs md:text-sm whitespace-pre-line text-justify md:text-left">
                            {loreExpandida
                                ? animeShow.lore
                                : `${animeShow.lore.substring(0, 200)}${animeShow.lore.length > 200 ? '...' : ''}`
                            }
                        </p>
                    </div>

                    {animeShow.lore.length > 200 && (
                        <button
                            onClick={() => setLoreExpandida(!loreExpandida)}
                            className="flex items-center gap-1.5 text-blue-500 hover:text-blue-400 font-semibold text-xs md:text-sm transition-colors cursor-pointer self-end md:self-start mt-1 flex-shrink-0">

                            <span>{loreExpandida ? 'Ler menos' : 'Ler mais'}</span>
                            <FaChevronDown
                                className={`text-[10px] md:text-xs transition-transform duration-300 ${loreExpandida ? "rotate-180" : ""
                                    }`} />
                        </button>
                    )}
                </div>

                <div className="border-t-0 bg-zinc-900/10">
                    <h3 className="text-lg md:text-xl font-bold text-white mt-2">
                        Temporadas e Episódios
                    </h3>
                    <p className="text-zinc-400 text-xs md:text-sm mt-1">
                        Escolha uma temporada e acompanhe todos os episódios.
                    </p>

                    <div className="py-4">
                        <div className="w-full md:w-72 relative">
                            <button
                                type="button"
                                onClick={() => setOpen(!open)}
                                className="w-full flex items-center justify-between bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 cursor-pointer hover:bg-zinc-900 transition-colors">
                                <span className="text-white font-semibold text-sm">
                                    Temporada {temporadaAtual}
                                </span>
                                <FaChevronDown className={`text-xs transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                            </button>

                            {open && (
                                <div className="absolute left-0 top-full mt-2 w-full bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden z-30 shadow-2xl max-h-60 overflow-y-auto">
                                    {animeShow.temporadas.map((tem) => (
                                        <button
                                            key={tem.id}
                                            type="button"
                                            onClick={() => {
                                                setTemporadaAtual(tem.id);
                                                setOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-3 text-sm transition duration-200 cursor-pointer ${temporadaAtual === tem.id
                                                ? "bg-blue-500/20 text-blue-400 font-semibold"
                                                : "text-zinc-300 hover:bg-zinc-900"
                                                }`}
                                        >
                                            {tem.nome}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>





                    <div className="flex flex-col gap-2.5 mb-3">
                        {temporada?.episodios?.map((ani) => (
                            <div
                                key={ani.numero_episodio}
                                className="flex flex-row items-center gap-2 sm:gap-4 bg-zinc-950/40 border border-zinc-800 p-2 sm:p-3 rounded-lg sm:rounded-xl hover:border-zinc-700 transition-all">

                                <div className="w-24 min-w-[96px] sm:w-36 md:w-44 aspect-video rounded-md sm:rounded-lg overflow-hidden flex-shrink-0 bg-zinc-900 border border-zinc-800/50">
                                    <img
                                        src={ani.capa_episodio}
                                        alt={`Episódio ${ani.numero_episodio}`}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>

                                <div className="flex-1 flex flex-row items-center justify-between gap-1.5 sm:gap-4 min-w-0">

                                    <div className="flex flex-col text-left min-w-0 pr-1">
                                        <span className="text-blue-500 font-bold text-[11px] sm:text-sm md:text-base truncate">
                                            Episódio {ani.numero_episodio}
                                        </span>
                                        <span className="font-semibold text-[9px] sm:text-xs text-zinc-500 mt-0.5">
                                            Temp. {temporadaAtual}
                                        </span>
                                        {animeShow.data_lancamento && (
                                            <p className="text-zinc-400 text-[9px] sm:text-xs mt-0.5 truncate max-[400px]:hidden">
                                                {animeShow.data_lancamento}
                                            </p>
                                        )}
                                    </div>

                                    <Link to={`/video/${animeShow.id_video}/${temporadaAtual}/${ani.numero_episodio}`} className="flex-shrink-0">
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1.5 sm:px-5 sm:py-2 md:px-6 md:py-2.5 rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-sm transition-colors duration-300 cursor-pointer shadow-md active:scale-[0.98]">
                                            Assistir
                                        </button>
                                    </Link>
                                </div>

                            </div>
                        ))}
                    </div>

                </div>

            </div>

        </section>
    );
}

/* ajustart as temporadas efeitos */
