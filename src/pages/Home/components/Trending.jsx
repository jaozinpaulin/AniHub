import { useRef } from "react";
/* icons */
import {
    FaChevronLeft, FaChevronRight, FaFire, FaStar, FaPlay, FaTrophy, FaChartLine
} from "react-icons/fa";

import { api } from "../../../api";
const animes = api.animes

import Trailers from "./trailers/trailers";

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
        <section className="w-full flex bg-zinc-900 px-6 py-3 text-white">

            <div className="w-3/4">
                <div className="w-full">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                            <FaFire className="text-orange-500 text-3xl" /> Em Alta
                        </h3>

                        <div className="flex items-center px-8 gap-4">
                            <button className="w-10 h-10 flex items-center justify-center rounded bg-zinc-800 hover:bg-zinc-700 transition cursor-pointer" onClick={scrollLeft}>
                                <FaChevronLeft />
                            </button>

                            <button className="w-10 h-10 flex items-center justify-center rounded bg-zinc-800 hover:bg-zinc-700 transition cursor-pointer" onClick={scrollRight}>
                                <FaChevronRight />
                            </button>
                        </div>
                    </div>

                    <div ref={scrollAnimeRef} className="flex gap-3 overflow-x-auto scrollbar-none">

                        {animes.map(a => (

                            <div className="group min-w-56 bg-zinc-800 rounded-xl overflow-hidden cursor-pointer hover:bg-zinc-800/65" key={a.id}>
                                <div className="overflow-hidden">
                                    <img src={a.imagem}
                                        alt={'banner do ' + a.nome}
                                        className="w-full h-72 object-cover transition-transform  group-hover:scale-110  duration-300" />
                                </div>
                                <div className="p-4">
                                    <h4 className="font-bold text-lg">
                                        {a.nome}
                                    </h4>

                                    <p className="text-zinc-400 text-sm mt-1">
                                        {a.genero}
                                    </p>
                                </div>
                            </div>
                        ))}


                    </div>
                </div>

                <section className="w-full mt-6">

                    <h3 className="text-2xl font-bold text-white flex items-center gap-2 py-6">
                        <FaStar className="text-yellow-500" /> Mais Bem Avaliados
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">

                        {animes.slice(0, 10).map(a => (
                            <div key={a.id} className="group cursor-pointer bg-zinc-800 rounded-xl transition-transform  hover:scale-105  duration-300">

                                <div className="overflow-hidden rounded-lg">
                                    <img
                                        src={a.imagem}
                                        alt={a.nome}
                                        className=" w-full h-60 object-cover" />
                                </div>

                                <div className="p-2.5">

                                    <h3
                                        className="text-white font-medium truncate group-hover:text-blue-400 transition-colors">
                                        {a.nome}
                                    </h3>

                                    <span className="text-yellow-500 text-sm font-semibold flex items-center gap-1">
                                        <FaStar className="text-yellow-500" />{a.nota}
                                    </span>

                                </div>

                            </div>
                        ))}
                    </div>

                </section >

                {/* trailers */}
                <Trailers />



            </div>

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