import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";


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

            <div className="w-3/4">
                <div className="w-full">

                    <div className="flex items-center justify-between mb-6 bg-zinc-800/70 rounded-l-lg border-r-2 border-orange-600/80">

                        <h3 className="w-full text-2xl font-bold text-white py-6 px-2">
                            Em Alta
                        </h3>

                        <div className="flex items-center px-8 gap-4">
                            <button className="w-10 h-10 flex items-center justify-center rounded bg-zinc-700 hover:bg-zinc-700/70 transition cursor-pointer" onClick={scrollLeft}>
                                <FaChevronLeft />
                            </button>

                            <button className="w-10 h-10 flex items-center justify-center rounded bg-zinc-700 hover:bg-zinc-700/70 transition cursor-pointer" onClick={scrollRight}>
                                <FaChevronRight />
                            </button>
                        </div>
                    </div>

                    <div className="relative">

                        <div className="pointer-events-none absolute right-0 top-0 h-full w-12 z-10 bg-gradient-to-l from-zinc-900 to-transparent" />
                        <div className="pointer-events-none absolute left-0 top-0 h-full w-12 z-10 bg-gradient-to-r from-zinc-900 to-transparent" />

                        <div
                            ref={scrollAnimeRef}
                            className="flex gap-4 overflow-x-auto scrollbar-none scroll-smooth">

                            {animes.slice(0, 30).map((a) => {
                                const idPlayer = a.id_video;

                                return (
                                    <Link key={idPlayer} to={`/Anime/${idPlayer}`}>
                                        <div className="group w-48 bg-zinc-800 rounded-xl overflow-hidden hover:bg-zinc-800/65 transition-colors duration-300">

                                            <div className="relative aspect-[2/3] overflow-hidden bg-zinc-900 flex items-center justify-center">

                                                <img
                                                    src={a.capa}
                                                    alt={`Banner do ${a.nome}`}
                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                />

                                                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                                                    <FaStar className="text-yellow-400 text-xs" />
                                                    <span className="text-white text-xs font-semibold">
                                                        {Number(a.classificacao).toFixed(1)}
                                                    </span>
                                                </div>

                                            </div>

                                            <div className="h-14 flex items-center px-3">
                                                <h4 className="w-full font-bold line-clamp-2 group-hover:text-purple-400 transition-colors duration-300">
                                                    {a.nome}
                                                </h4>
                                            </div>

                                        </div>
                                    </Link>
                                );
                            })}

                        </div>

                    </div>
                </div >

                <section className="w-full mt-6">

                    <h3 className="text-2xl font-bold text-white py-6 my-5 px-2 bg-zinc-800/70 rounded-l-lg border-r-2 border-blue-600/80">
                        Mais Bem Avaliados
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
                        {animesFiltradoTop.slice(0, 18).map((a) => (
                            <Link key={a.id_video} to={`/anime/${a.id_video}`} className="group">

                                <div className="bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700/50 hover:border-zinc-600 hover:bg-zinc-800/70 hover:-translate-y-1 transition-all duration-300">

                                    <div className="relative aspect-[2/3] overflow-hidden bg-zinc-900">

                                        <img
                                            src={a.capa}
                                            alt={a.nome}
                                            className="w-full h-full object-cover"
                                        />

                                        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                                            <FaStar className="text-yellow-400 text-xs" />
                                            <span className="text-white text-xs font-semibold">
                                                {Number(a.classificacao).toFixed(1)}
                                            </span>
                                        </div>

                                    </div>

                                    <div className="p-2">

                                        <h3 className="text-white font-medium text-sm leading-5 h-10 line-clamp-2 group-hover:text-blue-400 transition-colors">
                                            {a.nome}
                                        </h3>

                                    </div>

                                </div>
                            </Link>
                        ))}
                    </div>

                </section >

            </div >

            <aside className="w-1/4 pl-6">
                {/* anime aleatorio */}
                {animesAleatorio &&
                    <div className="bg-zinc-900 rounded-xl border mb-6 border-zinc-800 p-3">

                        <h3 className="w-full bg-zinc-700/20 rounded-l-sm border-e border-zinc-700 p-2 flex items-center gap-2 text-lg font-bold text-white mb-4">
                            Anime aleatório
                        </h3>

                        <div className="flex gap-4" >
                            <img
                                src={animesAleatorio.capa}
                                alt={animesAleatorio.nome}
                                className="w-40 h-56 rounded-lg object-cover transition duration-300 group-hover:scale-105" />

                            <div className="flex h-56 flex-1 flex-col justify-between">
                                <div>
                                    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500 px-2 py-1 text-xs font-bold text-black">
                                        <FaStar className="text-[10px]" />
                                        {Number(animesAleatorio.classificacao).toFixed(1)}
                                    </span>

                                    <h3 className="mt-3 min-h-14 text-lg font-bold text-white line-clamp-2 transition group-hover:text-purple-400">
                                        {animesAleatorio.nome}
                                    </h3>

                                    <div className="mt-3 min-h-14 flex flex-wrap content-start gap-2">
                                        {animesAleatorio.generos.filter(genero => !genero.startsWith("Letra")).slice(0, 3).map(genero => (
                                            <span
                                                key={genero}
                                                className="rounded-full bg-zinc-700 px-3 py-1 text-xs text-zinc-300">
                                                {genero}
                                            </span>

                                        ))}
                                    </div>

                                </div>

                                {/* Botoes */}
                                <div className="flex gap-2">

                                    <Link to={`/anime/${animesAleatorio.id_video}`} className="flex-1">
                                        <button
                                            className="w-full rounded-lg border border-blue-400/60 py-2.5 font-medium text-zinc-300 transition-all duration-300 hover:border-blue-400 hover:bg-blue-500/10 hover:text-white cursor-pointer">
                                            Ver detalhes
                                        </button>
                                    </Link>

                                    <button
                                        onClick={sortearNumAleatorio}
                                        className=" flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-300 transition-all duration-300 hover:border-purple-500 hover:bg-purple-500/10 hover:text-purple-400 cursor-pointer">
                                        <FaShuffle />
                                    </button>

                                </div>

                            </div>
                        </div>

                    </div>
                }

                <div className="mb-6 w-full  bg-zinc-900 rounded-xl border border-zinc-800 p-3 text-white">

                    <h3 className="w-full bg-zinc-700/20 rounded-l-sm border-e border-zinc-700 p-2 flex items-center gap-2 text-lg font-bold text-white mb-4">
                        Gêneros em Alta
                    </h3>

                    <ul className="flex flex-wrap items-centerm justify-center gap-2">

                        {generosUnicos.slice(0, 8).map(a => (
                            <Link key={a} to={`/categories/${a}`}>
                                <li key={a} className=" px-3 py-2 rounded-full  border border-zinc-700 text-sm font-medium text-zinc-300 hover:bg-zinc-700 transition-all duration-300 cursor-pointer">
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

                        {/* Total anime */}
                        <div className="rounded-lg border border-zinc-800 bg-zinc-800 p-4 transition hover:border-blue-500/50 hover:bg-zinc-800/70">
                            <FaFilm className="mb-3 text-2xl text-blue-400" />

                            <h4 className="text-2xl font-bold text-white">
                                {animes.length}
                            </h4>

                            <span className="text-sm text-zinc-400">
                                Animes
                            </span>
                        </div>

                        <div className="rounded-lg border border-zinc-800 bg-zinc-800 p-4 transition hover:border-purple-500/50 hover:bg-zinc-800/70">
                            <FaMasksTheater className="mb-3 text-2xl text-purple-400" />

                            <h4 className="text-2xl font-bold text-white">
                                {generosUnicos.length}
                            </h4>

                            <span className="text-sm text-zinc-400">
                                Gêneros
                            </span>
                        </div>

                        <div className="rounded-lg border border-zinc-800 bg-zinc-800 p-4 transition hover:border-yellow-500/50 hover:bg-zinc-800/70">
                            <FaStar className="mb-3 text-2xl text-yellow-400" />

                            <h4 className="text-2xl font-bold text-white">
                                {mediaTotal}
                            </h4>

                            <span className="text-sm text-zinc-400">
                                Nota Média
                            </span>
                        </div>

                        <div className="rounded-lg border border-zinc-800 bg-zinc-800 p-4 transition hover:border-green-500/50 hover:bg-zinc-800/70">
                            <FaClapperboard className="mb-3 text-2xl text-green-400" />

                            <h4 className="text-2xl font-bold text-white">
                                {totalEpisodios.toLocaleString()}
                            </h4>

                            <span className="text-sm text-zinc-400">
                                Episódios
                            </span>
                        </div>

                    </div>

                </div>

                {/* Trailer */}


                <div className="mt-6 w-full bg-zinc-900 rounded-xl border border-zinc-800 p-3 text-white">
                    <h3 className="w-full bg-zinc-700/20 rounded-l-sm border-r border-zinc-700 p-2 flex items-center gap-2 text-lg font-bold text-white mb-4">
                        Trailer em Destaque
                    </h3>
                    {trailerAleatorio && (
                        <div className="flex flex-col gap-4">

                            <div className="overflow-hidden rounded-xl border border-zinc-700">
                                <iframe src={`https://www.youtube.com/embed/${trailerAleatorio.id_youtube}`} title="Darling in the Franxx"
                                    className="w-full aspect-video" allowFullScreen loading="lazy" />
                            </div>

                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h4 className="text-lg font-bold text-white">
                                        {trailerAleatorio.nome}
                                    </h4>

                                    <p className="text-sm text-zinc-400">
                                        {trailerAleatorio.canal}
                                    </p>
                                </div>

                                <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
                                    {trailerAleatorio.duracao}
                                </span>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={sortearTrailerAleatorio}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 py-2 text-sm text-zinc-300 transition hover:border-red-500/50 hover:text-white">
                                    Outro trailer
                                </button>
                                <a
                                    href={`https://www.youtube.com/watch?v=${trailerAleatorio.id_youtube}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-1 items-center justify-center rounded-lg bg-red-600 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                                >
                                    Assistir no YouTube
                                </a>
                            </div>

                        </div>
                    )}


                </div>
                {/* frases */}

                {fraseAleatoria && (
                    <div className="mt-6 w-ful bg-zinc-900 rounded-xl border border-zinc-800 p-3 text-white">
                        <h3 className="w-full bg-zinc-700/20 rounded-l-sm border-r border-zinc-700 p-2 flex items-center gap-2 text-lg font-bold text-white mb-4">
                            💬 Frase do Dia
                        </h3>

                        <div className="flex flex-col gap-4">
                            <p className="text-zinc-200 text-sm italic leading-relaxed">
                                "{fraseAleatoria.frase}"
                            </p>
                            <div className="flex items-center justify-between">

                                <span className="text-xs text-zinc-400">
                                    {fraseAleatoria.anime}
                                </span>

                                <span className="text-xs font-semibold text-purple-400">
                                    — {fraseAleatoria.autor}
                                </span>
                            </div>

                            <button
                                onClick={sortearFraseAleatoria}
                                className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 py-2 text-sm text-zinc-300 transition hover:border-purple-500/50 hover:text-white">
                                Nova frase
                            </button>

                        </div>
                    </div>
                )}

            </aside>

        </section >
    );
}