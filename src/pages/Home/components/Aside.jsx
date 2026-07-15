import { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { FaChevronLeft, FaChevronRight, FaStar, FaPlay, FaChartLine, FaDiceFour } from "react-icons/fa";
import { FaShuffle, FaFilm, FaMasksTheater, FaClapperboard } from "react-icons/fa6";

import dadosAnimes from '../../../api/detalhes_animes.json'
import trailers from '../../../api/trailers.json'
import frases from '../../../api/frases.json'


const animes = dadosAnimes;
const trailersAnime = trailers;


const generosUnicos = [...new Set(animes.flatMap(anime => anime.generos).filter(ge => !ge.startsWith('Letra')))]


export default function Aside() {
    const location = useLocation();

    const [animesAleatorio, setAnimesAleatorio] = useState(null);

    const sortearNumAleatorio = () => {
        if (animes.length === 0) return

        const ani = animes[Math.floor(Math.random() * animes.length)]
        setAnimesAleatorio(ani)
    }
    useEffect(() => {
        sortearNumAleatorio()
    }, [animes])


    const [trailerAleatorio, setTrailerAleatorio] = useState()
    const sortearTrailerAleatorio = () => {
        if (trailers.length === 0) return

        const trailerUnico = trailers[Math.floor(Math.random() * trailers.length)]
        setTrailerAleatorio(trailerUnico)
    }

    useEffect(() => {
        sortearTrailerAleatorio()
    }, trailers)


    const totalEstrelas = animes.reduce((total, anime) => total + Number(anime.classificacao), 0)
    const mediaTotal = (totalEstrelas / animes.length).toFixed(1)

    const totalEpisodios = animes.reduce((total, ep) => total + ep.total_episodios_geral, 0)
    const [fraseAleatoria, setFraseAleatoria] = useState();

    const sortearFraseAleatoria = () => {
        if (frases.length === 0) return;

        const fraseUnica = frases[Math.floor(Math.random() * frases.length)];
        setFraseAleatoria(fraseUnica);
    };

    useEffect(() => {
        sortearFraseAleatoria();
    }, []);


    return (
        <aside className="hidden lg:block">

            {animesAleatorio && (
                <Link to={`/anime/${animesAleatorio.id_video}`}
                    state={{ from: location.pathname }}>
                    <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 transition-all duration-300 mb-3 hover:border-zinc-700/80 hover:bg-zinc-800/40 group">

                        <h3 className="w-full bg-zinc-800/40  border-l-2 border-blue-500/50 p-2.5 flex items-center gap-2 text-md font-bold text-white mb-4">
                            <FaShuffle className="text-blue-500 text-xs" />
                            Sugestão Aleatória
                        </h3>

                        <div className="flex flex-col 2xl:flex-row gap-4">


                            <div className="w-25 mx-auto 2xl:w-32 aspect-[3/4] rounded-lg overflow-hidden bg-zinc-950 ">
                                <img
                                    src={animesAleatorio.capa}
                                    alt={animesAleatorio.nome}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            <div className="flex flex-1 flex-col justify-between gap-3 min-w-0">

                                <div className="min-w-0">
                                    <span className="text-white inline-flex items-center gap-1 rounded-full bg-zinc-950/10 border border-zinc-500/20 px-2.5 py-0.5 text-xs font-bold">
                                        <FaStar className="text-[10px] text-yellow-400" />
                                        {Number(animesAleatorio.classificacao).toFixed(1)}
                                    </span>

                                    <h4 className="mt-2 text-sm font-bold text-zinc-100 transition-colors duration-300 group-hover:text-white truncate">
                                        {animesAleatorio.nome}
                                    </h4>

                                    <div className="mt-2 flex flex-wrap gap-1.5">
                                        {animesAleatorio.generos
                                            .filter(g => !g.startsWith("Letra"))
                                            .map(genero => (
                                                <span
                                                    key={genero}
                                                    className="rounded bg-zinc-800/80 border border-zinc-700/30 px-2 py-0.5 text-[10px] font-medium text-zinc-400 whitespace-nowrap">
                                                    {genero}
                                                </span>
                                            ))}
                                    </div>

                                    <p className="mt-2.5 text-xs text-zinc-400 leading-relaxed line-clamp-3">
                                        {animesAleatorio.lore || "Nenhuma descrição disponível para este anime."}
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </Link>
            )}

            <div className="mb-3 w-full bg-zinc-900 rounded-xl border border-zinc-800 p-4 text-white transition-all duration-300 hover:border-zinc-700/80 group">

                <h3 className="w-full bg-zinc-800/40 border-l-2 border-purple-500/50 p-2.5 flex items-center gap-2 text-md font-bold text-white mb-4">
                    <FaMasksTheater className="text-purple-500 text-xs" />
                    Gêneros em Alta
                </h3>

                <ul className="flex flex-wrap gap-2 mb-4">
                    {generosUnicos.slice(0, 8).map(a => (
                        <Link
                            key={a}
                            to={`/categories/${a}`}
                            state={{ from: location.pathname }}
                            className="flex-shrink-0"
                        >
                            <li className="px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-800/30 text-xs font-semibold text-zinc-400 hover:border-purple-500/40 hover:bg-purple-500/5 hover:text-purple-400 transition-all duration-300 cursor-pointer">
                                {a}
                            </li>
                        </Link>
                    ))}
                </ul>

                <div className="border-t border-zinc-800/80 pt-3 mt-1">
                    <Link
                        to="/categories"
                        state={{ from: location.pathname }}
                        className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg border border-zinc-800 bg-zinc-800/10 text-xs font-bold text-zinc-400 hover:text-white hover:border-purple-500/30 hover:bg-purple-500/5 active:scale-98 transition-all duration-300 cursor-pointer">
                        Ver mais gêneros
                        <FaChevronRight className="text-[10px] transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </div>

            <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 mb-3 transition-all duration-300 hover:border-zinc-700/80">

                <h3 className="w-full bg-zinc-800/40 border-l-2 border-emerald-500/50 p-2.5 flex items-center gap-2 text-md font-bold text-white mb-4">
                    <FaClapperboard className="text-emerald-500 text-xs" />
                    Estatísticas
                </h3>

                <div className="grid grid-cols-2 gap-3">

                    <div className="rounded-lg border border-zinc-800/80 bg-zinc-800/10 p-3.5 transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-600/5 group cursor-default">
                        <FaFilm className="mb-2 text-lg text-blue-400" />
                        <h4 className="text-xl font-black text-zinc-100 leading-none">{animes.length}</h4>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-500 mt-1 block">Animes</span>
                    </div>

                    <div className="rounded-lg border border-zinc-800/80 bg-zinc-800/10 p-3.5 transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-600/5 group cursor-default">
                        <FaMasksTheater className="mb-2 text-lg text-purple-400" />
                        <h4 className="text-xl font-black text-zinc-100  leading-none">{generosUnicos.length}</h4>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-500 mt-1 block">Gêneros</span>
                    </div>

                    <div className="rounded-lg border border-zinc-800/80 bg-zinc-800/10 p-3.5 transition-all duration-300 hover:border-yellow-500/40 hover:bg-yellow-600/5 group cursor-default">
                        <FaStar className="mb-2 text-lg text-yellow-400" />
                        <h4 className="text-xl font-black text-zinc-100 leading-none">{mediaTotal}</h4>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-500 mt-1 block">Nota Média</span>
                    </div>

                    <div className="rounded-lg border border-zinc-800/80 bg-zinc-800/10 p-3.5 transition-all duration-300 hover:border-emerald-500/40 hover:bg-emerald-600/5 group cursor-default">
                        <FaClapperboard className="mb-2 text-lg text-emerald-400" />
                        <h4 className="text-xl font-black text-zinc-100 leading-none">{totalEpisodios.toLocaleString()}</h4>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-500 mt-1 block">Episódios</span>
                    </div>

                </div>
            </div>

            <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-3 text-white">
                <h3 className="w-full bg-zinc-800/40 border-l-2 border-red-500/50 p-2.5 flex items-center gap-2 text-md font-bold text-white mb-4">
                    <FaFilm className="text-red-500 text-xs" />
                    Trailer em Destaque
                </h3>

                {trailerAleatorio && (
                    <div className="flex flex-col gap-4">

                        <div className="overflow-hidden rounded-xl border border-zinc-700">
                            <iframe
                                src={`https://www.youtube.com/embed/${trailerAleatorio.id_youtube}`}
                                className="w-full aspect-video"
                                allowFullScreen
                                loading="lazy"
                            />
                        </div>

                        <div className="min-w-0">
                            <h4 className="text-lg font-bold break-words">
                                {trailerAleatorio.nome}
                            </h4>
                            <p className="text-sm text-zinc-400">
                                {trailerAleatorio.canal}
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={sortearTrailerAleatorio}
                                className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 py-2 text-sm hover:border-red-500/50 cursor-pointer">
                                Outro trailer
                            </button>

                            <a
                                href={`https://www.youtube.com/watch?v=${trailerAleatorio.id_youtube}`}
                                target="_blank"
                                className="flex-1 rounded-lg bg-red-600 py-2 text-sm text-center font-medium hover:bg-red-700 transition-colors">
                                YouTube
                            </a>
                        </div>
                    </div>
                )}
            </div>

            {fraseAleatoria && (
                <div className="mt-3 w-full bg-zinc-900 rounded-xl border border-zinc-800 p-3 text-white">
                    <h3 className="w-full bg-zinc-800/40 border-l-2 border-orange-500/50 p-2.5 flex items-center gap-2 text-sm font-bold text-white mb-4">
                        <span className="text-orange-500 text-xs">💬</span>
                        Frase do Dia
                    </h3>

                    <div className="flex flex-col gap-4">
                        <p className="text-zinc-200 text-sm italic leading-relaxed">
                            "{fraseAleatoria.frase}"
                        </p>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-zinc-400">{fraseAleatoria.anime}</span>
                            <span className="text-xs font-semibold text-orange-400">— {fraseAleatoria.autor}</span>
                        </div>

                        <button
                            onClick={sortearFraseAleatoria}
                            className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 py-2 text-sm text-zinc-300 transition hover:border-orange-500/50 hover:text-white cursor-pointer">
                            Nova frase
                        </button>
                    </div>
                </div>
            )}

        </aside>
    )
}