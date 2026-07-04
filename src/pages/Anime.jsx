import { useNavigate, Link, useParams, useLocation } from "react-router-dom";

import { FaStar, FaHeart, FaChevronDown, FaChevronLeft } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";

import dados from '../api/detalhes_animes.json'
import { useState } from "react";


export default function Anime() {

    const navigate = useNavigate();
    const location = useLocation();

    const { id } = useParams();

    const animeShow = dados.find((anime) => {
        return anime.id_video === id
    })


    const [temporadaAtual, setTemporadaAtual] = useState(1)
    const temporada = animeShow.temporadas.find((t) => t.id === temporadaAtual);


    const [open, setOpen] = useState(false);


    return (<section className="py-10 md:py-20 bg-zinc-950 text-white">

        {/* Banner de fundo com altura responsiva */}
        <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden bg-zinc-900">
            <div className="absolute top-10 left-10 md:top-20 md:left-20 h-48 w-48 md:h-72 md:w-72 rounded-full bg-blue-600/40 blur-[80px] md:blur-[120px]" />
            <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20 h-48 w-48 md:h-72 md:w-72 rounded-full bg-purple-600/40 blur-[80px] md:blur-[120px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-zinc-950" />
        </div>

        {/* Bloco de informações principais - Mudança crucial para flex-col no mobile */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8 relative -mt-32 sm:-mt-40 md:-mt-60 z-10 border-r-0 md:border-r-2 border-b-2 border-zinc-800 p-4 md:p-3 px-4 sm:px-6 md:px-10 xl:px-6 bg-zinc-950/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none rounded-xl md:rounded-none">

            {/* Botão Voltar posicionado de forma segura */}
            <button
                onClick={() => navigate(location.state?.from || '/')}
                className="absolute -top-14 md:-top-20 left-4 md:left-3 flex items-center gap-2 px-4 py-2.5 md:px-5 md:py-3 bg-zinc-800/80 border border-zinc-700/50 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all duration-300 cursor-pointer group text-sm md:text-base">
                <FaChevronLeft className="text-xs md:text-sm group-hover:-translate-x-1 group-hover:text-blue-500 transition-all duration-300" />
                <span className="font-medium">Voltar</span>
            </button>

            {/* Container da Capa - Centralizado no mobile e tamanho controlado */}
            <div className="w-44 sm:w-52 md:w-60 mx-auto md:mx-0 flex-shrink-0 mt-4 md:mt-0">
                <img
                    src={animeShow.capa}
                    alt={animeShow.nome}
                    className="rounded-xl shadow-2xl border border-zinc-800 w-full object-cover aspect-[2/3]"
                />
            </div>

            {/* Textos e Metadados */}
            <div className="flex-1 flex flex-col gap-4 min-w-0 text-center md:text-left">

                <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Gêneros com scroll flexível se sobrarem */}
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {animeShow.generos.filter(g =>
                            g !== 'Dublado' &&
                            g !== 'Legendado' &&
                            !g.startsWith('Letra')
                        ).map((gen, i) => (
                            <span
                                key={i}
                                className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-1.5 rounded-xl text-xs md:text-sm font-medium whitespace-nowrap"
                            >
                                {gen}
                            </span>
                        ))}
                    </div>

                    <div className="flex justify-center sm:justify-end">
                        <button className="w-full sm:w-auto px-5 py-2.5 bg-zinc-900/90 border border-zinc-800 hover:bg-zinc-800 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer text-sm">
                            <FaHeart className="text-red-500" />
                            <span>Favoritar</span>
                        </button>
                    </div>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight break-words">
                    {animeShow.nome}
                </h1>

                <div className="flex items-center gap-2 justify-center md:justify-start text-sm">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-zinc-300 font-semibold">{animeShow.classificacao} / 10</span>
                </div>

                {/* Grid de Informações Técnicas - Ajustado para mobile */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-2 text-left">
                    <div className="bg-zinc-900/40 border border-zinc-800/60 p-3 rounded-xl">
                        <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Episódios</p>
                        <p className="text-white font-semibold text-sm sm:text-base mt-0.5">{animeShow.total_episodios_geral}</p>
                    </div>

                    <div className="bg-zinc-900/40 border border-zinc-800/60 p-3 rounded-xl">
                        <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider truncate">{animeShow.data_lancamento}</p>
                        <p className="text-white font-semibold text-sm sm:text-base mt-0.5">{animeShow.data_lancamento?.split(',')[1] || animeShow.data_lancamento}</p>
                    </div>

                    <div className="bg-zinc-900/40 border border-zinc-800/60 p-3 rounded-xl">
                        <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Temporadas</p>
                        <p className="text-white font-semibold text-sm sm:text-base mt-0.5">{animeShow.total_temporadas}</p>
                    </div>

                    <div className="bg-zinc-900/40 border border-zinc-800/60 p-3 rounded-xl">
                        <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Áudio</p>
                        <p className="text-white font-semibold text-sm sm:text-base mt-0.5">
                            {animeShow.generos.includes("Dublado") ? "Dublado" : "Legendado"}
                        </p>
                    </div>
                </div>

            </div>
        </div>

        {/* Seção de Lore e Episódios */}
        <div className="max-w-7xl mx-auto border-r-0 md:border-r-2 border-y-2 border-zinc-800 px-4 sm:px-6 md:px-10 xl:px-6 mt-6">

            <div className="py-4 border-b-2 border-zinc-800">
                <p className="text-zinc-400 leading-relaxed text-sm md:text-base whitespace-pre-line">
                    {animeShow.lore}
                </p>
            </div>

            <div className="border-t-0 p-2 sm:p-4 md:p-6 bg-zinc-900/10">
                <h3 className="text-lg md:text-xl font-bold text-white mt-2">
                    Temporadas e Episódios
                </h3>
                <p className="text-zinc-400 text-xs md:text-sm mt-1">
                    Escolha uma temporada e acompanhe todos os episódios.
                </p>

                {/* Dropdown seletor */}
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

                {/* Lista responsiva de episódios */}
                <div className="flex flex-col gap-4 mb-3">
                    {temporada?.episodios?.map((ani) => (
                        <div
                            key={ani.numero_episodio}
                            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-zinc-950/40 border border-zinc-800 p-3 rounded-xl hover:border-zinc-700 transition-all"
                        >
                            {/* Imagem do episódio mantendo aspecto correto no celular */}
                            <div className="w-full sm:w-44 aspect-video sm:h-24 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-900">
                                <img
                                    src={ani.capa_episodio}
                                    alt={`Episódio ${ani.numero_episodio}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Textos informativos e botão alinhados */}
                            <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex flex-col text-left">
                                    <span className="text-blue-500 font-bold text-sm md:text-base">
                                        Episódio {ani.numero_episodio}
                                    </span>
                                    <span className="font-semibold text-xs text-zinc-500">
                                        Temporada {temporadaAtual}
                                    </span>
                                    {animeShow.data_lancamento && (
                                        <p className="text-zinc-400 text-xs mt-1">
                                            {animeShow.data_lancamento}
                                        </p>
                                    )}
                                </div>

                                <Link to={`/video/${animeShow.id_video}/${temporadaAtual}/${ani.numero_episodio}`} className="w-full sm:w-auto">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors duration-300 cursor-pointer w-full sm:w-auto shadow-md">
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
