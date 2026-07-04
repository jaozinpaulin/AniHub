import { useRef, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";



import { FaChevronLeft, FaChevronRight, FaStar, FaPlay, FaChartLine, FaDiceFour } from "react-icons/fa";
import { FaShuffle, FaFilm, FaMasksTheater, FaClapperboard } from "react-icons/fa6";

import dadosAnimes from '../../../api/detalhes_animes.json'
import trailers from '../../../api/trailers.json'
import frases from '../../../api/frases.json'

const animes = dadosAnimes;
const trailersAnime = trailers;

const animesFiltradoTop = dadosAnimes.filter(ani => ani.classificacao >= 7)
    .sort((a, b) => b.classificacao - a.classificacao)

const generosUnicos = [...new Set(animes.flatMap(anime => anime.generos).filter(ge => !ge.startsWith('Letra')))]

export default function Trending() {
    const location = useLocation();



    const scrollAnimeRef = useRef(null)
    const scrollLeft = () => {
        scrollAnimeRef.current.scrollBy({
            left: -300,
            behavior: 'smooth'
        })
    }

    const scrollRight = () => {
        scrollAnimeRef.current.scrollBy({
            left: 300,
            behavior: 'smooth'
        })
    }

    /* numeros aleatorios */

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
        <section className="w-full  flex bg-zinc-900/70 pb-10 px-6 py-3 text-white">

            <div className="w-full lg:w-3/4">
                <div className="w-full">

                    <div className="mb-6 flex items-center justify-between rounded-l-lg border-r-2 border-orange-600/80 bg-zinc-800/70">

                        <h3 className="w-full px-2 py-4 text-xl font-bold text-white md:py-6 md:text-2xl">
                            Em Alta
                        </h3>

                        <div className="flex items-center gap-2 px-3 md:gap-4 md:px-8">

                            <button
                                onClick={scrollLeft}
                                className="flex h-9 w-9 items-center justify-center rounded bg-zinc-700 transition hover:bg-zinc-700/70 cursor-pointer md:h-10 md:w-10">

                                <FaChevronLeft />

                            </button>

                            <button
                                onClick={scrollRight}
                                className="flex h-9 w-9 items-center justify-center rounded bg-zinc-700 transition hover:bg-zinc-700/70 cursor-pointer md:h-10 md:w-10">

                                <FaChevronRight />

                            </button>

                        </div>

                    </div>

                    <div className="relative">

                        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-zinc-900 to-transparent md:w-12" />

                        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-zinc-900 to-transparent md:w-12" />

                        <div
                            ref={scrollAnimeRef}
                            className="flex gap-3 overflow-x-auto scroll-smooth scrollbar-none md:gap-4">

                            {animes.slice(0, 30).map((a) => {

                                const idPlayer = a.id_video;

                                return (
                                    <Link
                                        key={idPlayer}
                                        to={`/Anime/${idPlayer}`}
                                        state={{ from: location.pathname }}
                                    >

                                        <div className="group w-36 sm:w-40 md:w-44 lg:w-48 overflow-hidden rounded-xl bg-zinc-800 transition-colors duration-300 hover:bg-zinc-800/65">

                                            <div className="relative aspect-[2/3] overflow-hidden bg-zinc-900 flex items-center justify-center">

                                                <img
                                                    src={a.capa}
                                                    alt={`Banner do ${a.nome}`}
                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                />

                                                <div className="absolute top-2 right-2 flex items-center gap-1 rounded-lg bg-black/70 px-2 py-1 backdrop-blur-sm md:top-3 md:right-3">

                                                    <FaStar className="text-xs text-yellow-400" />

                                                    <span className="text-xs font-semibold text-white">
                                                        {Number(a.classificacao).toFixed(1)}
                                                    </span>

                                                </div>

                                            </div>

                                            <div className="flex h-12 items-center px-3 md:h-14">

                                                <h4 className="w-full line-clamp-2 text-sm font-bold transition-colors duration-300 group-hover:text-purple-400 md:text-base">
                                                    {a.nome}
                                                </h4>

                                            </div>

                                        </div>

                                    </Link>
                                );

                            })}

                        </div>

                    </div>

                </div>

                <section className="mt-6 w-full">

                    <h3 className="my-5 rounded-l-lg border-r-2 border-blue-600/80 bg-zinc-800/70 px-2 py-4 text-xl font-bold text-white md:py-6 md:text-2xl">
                        Mais Bem Avaliados
                    </h3>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-5 lg:grid-cols-5 xl:grid-cols-6">

                        {animesFiltradoTop.slice(0, 18).map((a) => (

                            <Link
                                key={a.id_video}
                                to={`/anime/${a.id_video}`}
                                state={{ from: location.pathname }}
                                className="group"
                            >

                                <div className="overflow-hidden rounded-xl border border-zinc-700/50 bg-zinc-800 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-600 hover:bg-zinc-800/70">

                                    <div className="relative aspect-[2/3] overflow-hidden bg-zinc-900">

                                        <img
                                            src={a.capa}
                                            alt={a.nome}
                                            className="h-full w-full object-cover"
                                        />

                                        <div className="absolute top-2 right-2 flex items-center gap-1 rounded-lg bg-black/70 px-2 py-1 backdrop-blur-sm md:top-3 md:right-3">

                                            <FaStar className="text-xs text-yellow-400" />

                                            <span className="text-xs font-semibold text-white">
                                                {Number(a.classificacao).toFixed(1)}
                                            </span>

                                        </div>

                                    </div>

                                    <div className="p-2">

                                        <h3 className="line-clamp-2 h-10 text-xs font-medium leading-5 text-white transition-colors group-hover:text-blue-400 md:text-sm">
                                            {a.nome}
                                        </h3>

                                    </div>

                                </div>

                            </Link>

                        ))}

                    </div>

                </section>

            </div>

            <aside className="hidden lg:block  lg:w-1/4 lg:pl-6">

                {/* Anime Aleatório */}
                {animesAleatorio && (
                    <div className="bg-zinc-900 rounded-xl mb-3  border border-zinc-800 p-3">

                        <h3 className="w-full bg-zinc-700/20 rounded-lg border border-zinc-700 p-2 flex items-center gap-2 text-lg font-bold text-white mb-4">
                            Anime aleatório
                        </h3>

                        <div className="flex flex-col 2xl:flex-row gap-4">

                            <img
                                src={animesAleatorio.capa}
                                alt={animesAleatorio.nome}
                                className="w-full 2xl:w-42 h-56 rounded-lg object-contain 2xl:object-cover "
                            />

                            <div className="flex flex-1 flex-col justify-between gap-4 min-w-0">

                                <div className="min-w-0">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500 px-2 py-1 text-xs font-bold text-black">
                                        <FaStar className="text-[10px]" />
                                        {Number(animesAleatorio.classificacao).toFixed(1)}
                                    </span>

                                    <h3 className="mt-3 text-lg font-bold text-white line-clamp-2 ">
                                        {animesAleatorio.nome}
                                    </h3>

                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {animesAleatorio.generos
                                            .filter(g => !g.startsWith("Letra"))
                                            .slice(0, 3)
                                            .map(genero => (
                                                <span
                                                    key={genero}
                                                    className="rounded-full bg-zinc-700 px-3 py-1 text-xs text-zinc-300 whitespace-nowrap"
                                                >
                                                    {genero}
                                                </span>
                                            ))}
                                    </div>
                                </div>

                                <div className="flex gap-2 ">
                                    <Link
                                        to={`/anime/${animesAleatorio.id_video}`}
                                        state={{ from: location.pathname }}
                                        className="flex-1 min-w-0"
                                    >
                                        <button className="w-full rounded-lg border border-blue-400/60 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-blue-400 hover:bg-blue-500/10 hover:text-white">
                                            Ver detalhes
                                        </button>
                                    </Link>

                                    <button
                                        onClick={sortearNumAleatorio}
                                        className="flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-300 transition hover:border-purple-500 hover:bg-purple-500/10 hover:text-purple-400 flex-shrink-0"
                                    >
                                        <FaShuffle />
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                )}

                <div className="mb-3 w-full bg-zinc-900 rounded-xl border border-zinc-800 p-3 text-white">
                    <h3 className="w-full bg-zinc-700/20 rounded-l-sm border-e border-zinc-700 p-2 flex items-center gap-2 text-lg font-bold text-white mb-4">
                        Gêneros em Alta
                    </h3>

                    <ul className="flex flex-wrap items-center justify-center gap-2">
                        {generosUnicos.slice(0, 8).map(a => (
                            <Link key={a} to={`/categories/${a}`} state={{ from: location.pathname }}>
                                <li className="px-3 py-2 rounded-full border border-zinc-700 text-sm font-medium text-zinc-300 hover:bg-zinc-700 transition-all duration-300 cursor-pointer">
                                    {a}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>

                <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-3 mb-6">
                    <h3 className="w-full mb-4 rounded-l-sm border-e border-zinc-700 bg-zinc-700/20 p-2 text-lg font-bold text-white">
                        Estatísticas
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-lg border border-zinc-800 bg-zinc-800 p-4 transition hover:border-blue-500/50 hover:bg-zinc-800/70">
                            <FaFilm className="mb-3 text-2xl text-blue-400" />
                            <h4 className="text-2xl font-bold text-white">{animes.length}</h4>
                            <span className="text-sm text-zinc-400">Animes</span>
                        </div>

                        <div className="rounded-lg border border-zinc-800 bg-zinc-800 p-4 transition hover:border-purple-500/50 hover:bg-zinc-800/70">
                            <FaMasksTheater className="mb-3 text-2xl text-purple-400" />
                            <h4 className="text-2xl font-bold text-white">{generosUnicos.length}</h4>
                            <span className="text-sm text-zinc-400">Gêneros</span>
                        </div>

                        <div className="rounded-lg border border-zinc-800 bg-zinc-800 p-4 transition hover:border-yellow-500/50 hover:bg-zinc-800/70">
                            <FaStar className="mb-3 text-2xl text-yellow-400" />
                            <h4 className="text-2xl font-bold text-white">{mediaTotal}</h4>
                            <span className="text-sm text-zinc-400">Nota Média</span>
                        </div>

                        <div className="rounded-lg border border-zinc-800 bg-zinc-800 p-4 transition hover:border-green-500/50 hover:bg-zinc-800/70">
                            <FaClapperboard className="mb-3 text-2xl text-green-400" />
                            <h4 className="text-2xl font-bold text-white">{totalEpisodios.toLocaleString()}</h4>
                            <span className="text-sm text-zinc-400">Episódios</span>
                        </div>
                    </div>
                </div>

                <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-3 text-white">

                    <h3 className="w-full mb-3 rounded-lg border border-zinc-700 bg-zinc-700/20 p-2 text-lg font-bold">
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
                                    className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 py-2 text-sm hover:border-red-500/50"
                                >
                                    Outro trailer
                                </button>

                                <a
                                    href={`https://www.youtube.com/watch?v=${trailerAleatorio.id_youtube}`}
                                    target="_blank"
                                    className="flex-1 rounded-lg bg-red-600 py-2 text-sm text-center font-medium hover:bg-red-700"
                                >
                                    YouTube
                                </a>
                            </div>
                        </div>
                    )}
                </div>

                {fraseAleatoria && (
                    <div className="mt-3 w-full bg-zinc-900 rounded-xl border border-zinc-800 p-3 text-white">
                        <h3 className="w-full bg-zinc-700/20 rounded-l-sm border-r border-zinc-700 p-2 flex items-center gap-2 text-lg font-bold text-white mb-4">
                            💬 Frase do Dia
                        </h3>

                        <div className="flex flex-col gap-4">
                            <p className="text-zinc-200 text-sm italic leading-relaxed">
                                "{fraseAleatoria.frase}"
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-zinc-400">{fraseAleatoria.anime}</span>
                                <span className="text-xs font-semibold text-purple-400">— {fraseAleatoria.autor}</span>
                            </div>

                            <button
                                onClick={sortearFraseAleatoria}
                                className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 py-2 text-sm text-zinc-300 transition hover:border-purple-500/50 hover:text-white"
                            >
                                Nova frase
                            </button>
                        </div>
                    </div>
                )}

            </aside>
        </section >
    );
}