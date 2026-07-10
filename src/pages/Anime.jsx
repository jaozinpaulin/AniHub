import { useNavigate, Link, useParams, useLocation } from "react-router-dom";
import { FaStar, FaHeart, FaChevronDown, FaChevronLeft, FaRegHeart } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";

import dados from '../api/detalhes_animes.json'
import { useState, useContext } from "react";
import { FavoritesContext } from "../context/FavoritesProvider";

export default function Anime() {
    // 1. Desestruturado o toggleFavorite do Context
    const { isFavorite, toggleFavorite } = useContext(FavoritesContext)

    const navigate = useNavigate();
    const location = useLocation();
    const [loreExpandida, setLoreExpandida] = useState(false);

    const { id } = useParams();

    const animeShow = dados.find((anime) => {
        return anime.id_video === id
    })

    const favorito = isFavorite(animeShow.id_video);

    const [temporadaAtual, setTemporadaAtual] = useState(1)
    const temporada = animeShow.temporadas.find((t) => t.id === temporadaAtual);

    const [open, setOpen] = useState(false);

    return (
        <section className="py-10 md:py-20 bg-zinc-950 text-white selection:bg-blue-500/30">

            <div className="hidden md:block relative w-full md:h-[400px] lg:h-[500px] overflow-hidden bg-zinc-900">
                <div className="absolute md:top-20 md:left-20 h-72 w-72 rounded-full bg-blue-600/40 blur-[120px]" />
                <div className="absolute md:bottom-20 md:right-100 h-72 w-72 rounded-full bg-purple-600/40 blur-[120px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-zinc-950" />
            </div>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8 relative mt-12 max-[480px]:mt-8 sm:mt-24 md:-mt-44 lg:-mt-56 z-10 border-b-2 border-zinc-800 p-4 md:p-3 px-4 sm:px-6 md:px-10 xl:px-6 bg-zinc-950/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none rounded-xl md:rounded-none mx-4 sm:mx-6 md:mx-auto">

                <div className="w-full flex flex-row items-center justify-between gap-2 relative md:absolute md:-top-20 md:left-0 md:w-full z-20 pb-4 md:pb-0 sm:px-5">

                    <button
                        onClick={() => navigate(location.state?.from || '/')}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all duration-300 cursor-pointer group text-[11px] sm:text-xs md:text-base shrink-0 shadow-md">
                        <FaChevronLeft className="text-[10px] md:text-sm group-hover:-translate-x-1 group-hover:text-blue-500 transition-all duration-300" />
                        <span className="font-medium">Voltar</span>
                    </button>

                    <div className="relative group/container inline-block">
                        <div className="absolute inset-0 m-auto -z-10 h-28 w-28 rounded-full bg-red-600/25 blur-[45px] transition-all duration-300 group-hover/container:bg-red-600/30" />

                        {/* 2. Alterado onClick de addFavorite para toggleFavorite */}
                        <button
                            type="button"
                            onClick={() => toggleFavorite(animeShow)}
                            className={`flex items-center justify-center cursor-pointer gap-2 px-4 py-2 rounded-xl border shadow-md font-medium text-[11px] sm:text-xs md:text-base transition-all duration-300 active:scale-95 group w-[105px] sm:w-[120px] md:w-[140px]
                                ${favorito
                                    ? "bg-zinc-950/50 border-red-500/40 text-red-400"
                                    : "bg-zinc-900 border-zinc-700 text-zinc-200 hover:border-red-500/40"
                                }`}
                        >
                            {favorito ? (
                                <FaHeart className="text-red-500 text-sm md:text-base transition-transform duration-300 group-hover:scale-110" />
                            ) : (
                                <FaRegHeart className="text-red-500 text-sm md:text-base transition-all duration-300 group-hover:scale-110" />
                            )}

                            <span className="tracking-wide block truncate">
                                {favorito ? "Favorito" : "Favoritar"}
                            </span>
                        </button>
                    </div>

                </div>

                <div className="w-40 sm:w-48 md:w-60 mx-auto md:mx-0 flex-shrink-0 mt-4 md:mt-0">
                    <img
                        src={animeShow.capa}
                        alt={animeShow.nome}
                        className="rounded-xl shadow-2xl border border-zinc-800 w-full object-cover aspect-[2/3]"
                    />
                </div>

                <div className="flex-1 flex flex-col gap-4 min-w-0 text-center md:text-left">

                    <div className="w-full flex flex-row flex-wrap items-center gap-1.5 max-[480px]:gap-1 justify-center md:justify-start border-t border-b border-zinc-900/60 md:border-none py-2.5 md:py-0 text-left">
                        {animeShow.generos.filter(g =>
                            g !== 'Dublado' &&
                            g !== 'Legendado' &&
                            g !== 'Letra' &&
                            !g.startsWith('Letra')
                        ).map((gen, i) => (
                            <span
                                key={i}
                                className="bg-zinc-900 border border-zinc-800/60 text-zinc-300 px-2 py-0.5 max-[480px]:px-1.5 max-[480px]:text-[10px] rounded-md text-[11px] sm:text-xs md:text-sm font-medium whitespace-nowrap shadow-sm"
                            >
                                {gen}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold tracking-tight break-words text-zinc-100">
                        {animeShow.nome}
                    </h1>

                    <div className="flex items-center gap-1.5 justify-center md:justify-start text-xs md:text-sm">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-zinc-300 font-semibold">{animeShow.classificacao} / 10</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 mt-2 text-left">
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
                            <p className="text-white font-semibold text-xs sm:text-base mt-0.5 truncate">
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
                                className={`text-[10px] md:text-xs transition-transform duration-300 ${loreExpandida ? "rotate-180" : ""}`}
                            />
                        </button>
                    )}
                </div>

                {/* Seção das Temporadas Estilizada */}
                <div className="border-t-0 bg-zinc-900/10 pt-4">
                    <h3 className="text-lg md:text-xl font-bold text-white">
                        Temporadas e Episódios
                    </h3>
                    <p className="text-zinc-400 text-xs md:text-sm mt-1">
                        Escolha uma temporada e acompanhe todos os episódios.
                    </p>

                    <div className="py-4">
                        <div className="w-full md:w-72 relative">
                            {/* Botão Dropdown com Efeitos */}
                            <button
                                type="button"
                                onClick={() => setOpen(!open)}
                                className={`w-full flex items-center justify-between bg-zinc-900 border rounded-xl px-4 py-3 cursor-pointer transition-all duration-300 shadow-md outline-none
                                    ${open
                                        ? "border-blue-500/50 bg-zinc-850 shadow-blue-950/20 shadow-lg"
                                        : "border-zinc-800 hover:border-zinc-700 hover:bg-zinc-850"
                                    }`}
                            >
                                <span className="text-white font-semibold text-sm">
                                    Temporada {temporadaAtual}
                                </span>
                                <FaChevronDown className={`text-xs text-zinc-400 transition-transform duration-300 ease-out ${open ? "rotate-180 text-blue-400" : ""}`} />
                            </button>

                            {/* Menu Dropdown com efeito de fade-in suave */}
                            {open && (
                                <div className="absolute left-0 top-full mt-2 w-full bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden z-30 shadow-2xl max-h-60 overflow-y-auto backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200">
                                    {animeShow.temporadas.map((tem) => (
                                        <button
                                            key={tem.id}
                                            type="button"
                                            onClick={() => {
                                                setTemporadaAtual(tem.id);
                                                setOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-3 text-sm transition duration-200 cursor-pointer border-b border-zinc-800/40 last:border-none
                                                ${temporadaAtual === tem.id
                                                    ? "bg-blue-600/15 text-blue-400 font-bold border-l-2 border-l-blue-500"
                                                    : "text-zinc-300 hover:bg-zinc-800/70 hover:text-white"
                                                }`}
                                        >
                                            {tem.nome}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Lista de Episódios com efeito hover nos cards */}
                    <div className="flex flex-col gap-2.5 mb-3">
                        {temporada?.episodios?.map((ani) => (
                            <div
                                key={ani.numero_episodio}
                                className="flex flex-row items-center gap-2 sm:gap-4 bg-zinc-900/30 border border-zinc-800/80 p-2 sm:p-3 rounded-lg sm:rounded-xl hover:border-zinc-700 hover:bg-zinc-900/60 transition-all duration-300 group/episode"
                            >
                                {/* Thumbnail Container */}
                                <div className="w-24 min-w-[96px] sm:w-36 md:w-44 aspect-video rounded-md sm:rounded-lg overflow-hidden flex-shrink-0 bg-zinc-950 border border-zinc-800/50 relative">
                                    <img
                                        src={ani.capa_episodio}
                                        alt={`Episódio ${ani.numero_episodio}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover/episode:scale-102 group-hover/episode:brightness-[0.8]"
                                        loading="lazy"
                                    />
                                </div>

                                <div className="flex-1 flex flex-row items-center justify-between gap-1.5 sm:gap-4 min-w-0">
                                    <div className="flex flex-col text-left min-w-0 pr-1">
                                        <span className="text-blue-500 font-bold text-[11px] sm:text-sm md:text-base truncate transition-colors group-hover/episode:text-blue-400">
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
                                        <button className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 sm:px-5 sm:py-2 md:px-6 md:py-2.5 rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-sm transition-all duration-300 cursor-pointer shadow-md shadow-blue-600/10 active:scale-[0.96]">
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