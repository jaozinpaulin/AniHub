import { useRef } from "react";
import { Link } from "react-router-dom";


import {
    FaChevronLeft, FaChevronRight, FaFire, FaStar,
    FaPlay, FaTrophy, FaChartLine
} from "react-icons/fa";

import dadosAnimes from '../../../api/detalhes_animes.json'
import Trailers from "./trailers/trailers";


const animes = dadosAnimes
const animesFiltradoTop = dadosAnimes.filter(ani => ani.classificacao >= 7)
    .sort((a, b) => b.classificacao - a.classificacao)


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

    return (
        <section className="max-w-7xl mx-auto flex bg-zinc-900 px-6 py-3 text-white">

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

                    <div
                        ref={scrollAnimeRef}
                        className="flex gap-4 overflow-x-auto scrollbar-none pb-1"
                    >
                        {animes.slice(0, 10).map((a) => {
                            const idPlayer = a.id_video

                            return (
                                <Link key={idPlayer} to={`/Anime/${idPlayer}`}>
                                    < div className="group w-56 bg-zinc-800 rounded-xl overflow-hidden hover:bg-zinc-800/65 transition-colors duration-300" >

                                        < div className="aspect-[2/3] overflow-hidden bg-zinc-900 flex items-center justify-center" >
                                            <img
                                                src={a.capa}
                                                alt={`Banner do ${a.nome}`}
                                                loading="lazy"
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>

                                        <div className="h-14 flex items-center px-3">
                                            <h4 className="w-full font-bold line-clamp-2 group-hover:text-purple-400 transition-colors duration-300">
                                                {a.nome}
                                            </h4>
                                        </div>

                                        {/* <span className="text-yellow-500 text-sm font-semibold flex items-center gap-1">
                                            <FaStar className="text-yellow-500" />{Number(a.classificacao).toFixed(1).replace(',', ',')}
                                        </span> */}

                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div >

                <section className="w-full mt-6">

                    <h3 className="text-2xl font-bold text-white py-6 my-5 px-2 bg-zinc-800/70 rounded-l-lg border-r-2 border-blue-600/80">
                        Mais Bem Avaliados
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
                        {animesFiltradoTop.slice(0, 24).map((a) => (
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

                {/* trailers */}
                <Trailers />



            </div >

            <aside className="w-1/4 pl-6">

                <div className="w-full  bg-zinc-900 rounded-xl border border-zinc-800 p-3 text-white">

                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <FaTrophy className="text-yellow-500" /> Top Rankings
                    </h3>

                    {animes.slice(0, 5).map(a => (
                        <div key={a.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-zinc-800 cursor-pointer transition">

                            <span className="text-3xl font-black text-yellow-500 min-w-10">
                                #{a.id}
                            </span>

                            <img
                                src={a.imagem}
                                alt={a.nome}
                                className="w-14 h-20 rounded-md object-cover" />

                            <div>
                                <h4 className="font-semibold text-white">
                                    {a.nome}
                                </h4>

                                <span className="text-sm text-zinc-400 flex items-center gap-1">
                                    <FaStar className="text-yellow-500" /> 9.2
                                </span>
                            </div>

                        </div>
                    ))}

                </div>

                <div className="mt-6 w-full  bg-zinc-900 rounded-xl border border-zinc-800 p-3 text-white">

                    <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
                        <FaFire className="text-orange-500" /> Gêneros em Alta
                    </h3>

                    <ul className="flex flex-wrap gap-2">
                        {animes.slice(0, 8).map(a => (
                            <li key={a.id} className=" px-4 py-2 rounded-full  border border-zinc-700 text-sm font-medium text-zinc-300 hover:bg-zinc-700 transition-all duration-300 cursor-pointer">
                                {a.genero}
                            </li>
                        ))}

                    </ul>

                </div>

                <div className="mt-6 w-full  bg-zinc-900 rounded-xl border border-zinc-800 p-3">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                        < FaChartLine className="text-blue-500" /> Populares da Semana
                    </h3>

                    <ul className="flex flex-col gap-3">
                        {animes.slice(0, 5).map(a => (<li key={a.id}
                            className="group flex items-center justify-between p-3 rounded-lg bg-zinc-900  transition-all cursor-pointer hover:bg-zinc-800">
                            <div className="flex items-center gap-3">

                                <img
                                    src={a.imagem}
                                    alt={a.nome}
                                    className="w-10 h-14 object-cover rounded" />

                                <span className="text-zinc-200">
                                    {a.nome}
                                </span>

                            </div>

                            <span className="text-zinc-500 text-sm group-hover:text-blue-500 bg-clip-text">
                                Tendências
                            </span>
                        </li>))}

                    </ul>
                </div>
            </aside>

        </section >
    );
}