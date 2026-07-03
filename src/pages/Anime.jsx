import { useNavigate, Link, useParams } from "react-router-dom";

import { FaStar, FaHeart, FaChevronDown, FaChevronLeft } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";

import dados from '../api/detalhes_animes.json'
import { useState } from "react";


export default function Anime() {

    const navigate = useNavigate();
    const { id } = useParams();

    const animeShow = dados.find((anime) => {
        return anime.id_video === id
    })


    const [temporadaAtual, setTemporadaAtual] = useState(1)
    const temporada = animeShow.temporadas.find((t) => t.id === temporadaAtual);


    const [open, setOpen] = useState(false);

    console.log(animeShow.temporadas)
    console.log(animeShow)

    return (
        <section className="py-20 bg-zinc-950 text-white">

            <div className="relative w-full h-[500px] overflow-hidden">
                {/* imagem */}
                <div
                    className="absolute w-full h-full bg-center bg-cover "
                    style={{
                        backgroundImage: `url(${animeShow?.temporadas?.["Temporada 1"]?.episodios?.[0]?.capa_episodio || ""
                            })`
                    }}
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-zinc-950" />

            </div>

            <div className="max-w-7xl mx-auto flex gap-8 relative -mt-60 z-10 border-r-2 border-b-2 border-zinc-800 p-3">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute -top-20 flex items-center gap-2 px-5 py-3 bg-zinc-800/70  border-zinc-700 rounded-xl text-zinc-300 hover:text-white  hover:bg-zinc-800/90  transition-all duration-300 cursor-pointer group"
                >
                    <FaChevronLeft className="text-sm group-hover:-translate-x-1  group-hover:text-blue-500  transition-all duration-300" />

                    <span className="font-medium">
                        Voltar
                    </span>
                </button>

                <div className="w-60">
                    <img
                        src={animeShow.capa}
                        alt={animeShow.nome}
                        className="rounded-xl shadow-lg border border-zinc-800"
                    />
                </div>



                <div className="flex-1 flex flex-col gap-2">

                    <div className="w-full items-center  justify-between flex flex-wrap">

                        <div className="flex gap-3">
                            {animeShow.generos.filter(g =>
                                g !== 'Dublado' &&
                                g !== 'Legendado' &&
                                !g.startsWith('Letra')
                            ).map((gen, i) => (
                                <span key={i} className="bg-zinc-800 text-zinc-300 px-3 p-2 rounded-xl text-sm">
                                    {gen}
                                </span>
                            ))}

                        </div>

                        <div className="flex flex-wrap items-center gap-4 mt-4">

                            <button className="px-5 py-3 bg-zinc-900/70 hover:bg-zinc-800 rounded-xl flex items-center gap-2 transition-all duration-300 cursor-pointer">
                                <FaHeart className="text-red-500" />
                                <span>Favoritar</span>
                            </button>

                        </div>

                    </div>

                    <h2 className="text-3xl font-bold">
                        {animeShow.nome}
                    </h2>

                    <div className="flex items-center gap-3">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-zinc-400">{animeShow.classificacao} / 10</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div className="border border-zinc-800 p-3">
                            <p className="text-zinc-500 text-sm">Episódios</p>
                            <p className="text-white">{animeShow.total_episodios_geral}</p>
                        </div>

                        <div className="border border-zinc-800 p-3">
                            <p className="text-zinc-500 text-sm">{animeShow.data_lancamento}</p>
                            <p className="text-white">{animeShow.data_lancamento.split(',')[1]}</p>
                        </div>

                    </div>

                </div>

            </div>

            <div className="w-7xl mx-auto border-r-2 border-y-2 border-zinc-800">
                <div className="px-3 py-4 border-b-2 border-zinc-800">

                    <p className="text-zinc-400 leading-relaxed">
                        {animeShow.lore}
                    </p>
                </div>

                <div className="border-t-2 border-zinc-800 p-3 bg-zinc-900/25">

                    <div className="">

                        <h3 className="text-xl font-bold text-white">
                            Temporadas e Episódios
                        </h3>

                        <p className="text-zinc-400 mt-2">
                            Escolha uma temporada e acompanhe todos os episódios.
                        </p>

                    </div>

                    <div className="py-3">
                        <div className="w-full flex flex-col md:w-72 py-2 gap-2">

                            {/* BOTÃO */}
                            <button
                                type="button"
                                onClick={() => setOpen(!open)}
                                className="w-full md:w-72 flex items-center justify-between bg-zinc-950/25 border border-zinc-800 rounded-xl px-4 py-3 cursor-pointer"
                            >
                                <span className="text-white font-semibold">
                                    Temporada {temporadaAtual}
                                </span>

                                <FaChevronDown
                                    className={`transition duration-300 ${open ? "rotate-180" : ""}`}
                                />
                            </button>

                            {/* LISTA */}
                            {open && (
                                <div className="mt-1 w-full md:w-72 bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">

                                    {animeShow.temporadas.map((tem) => (
                                        <button key={tem.id} type="button"
                                            onClick={() => {
                                                setTemporadaAtual(tem.id);
                                                setOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-3 transition duration-200 cursor-pointer${temporadaAtual === tem.id
                                                ? "bg-blue-500/20 text-white"
                                                : "text-zinc-300 hover:bg-zinc-900"}`}>
                                            {tem.nome}
                                        </button>
                                    ))}

                                </div>
                            )}

                        </div>

                    </div>

                    <div className="flex flex-col gap-5 mb-3">

                        {temporada?.episodios?.map((ani) => (
                            <div key={ani.numero_episodio} className="flex items-center gap-5 bg-zinc-950/25 border border-zinc-800 p-3">

                                <img src={ani.capa_episodio} alt={`Episódio ${ani.numero_episodio}`} className="w-44 h-24 rounded-lg object-cover" />
                                <div className="w-full flex items-center justify-between">
                                    <div className="flex flex-col">

                                        <span className="text-blue-500 font-semibold text-sm">
                                            Episódio {ani.numero_episodio}
                                        </span>

                                        <span className="font-semibold text-sm text-zinc-600">
                                            Temporada {temporadaAtual}
                                        </span>

                                        <p className="text-zinc-400 mt-3">
                                            {animeShow.data_lancamento}
                                        </p>

                                    </div>

                                    <Link to={`/video/${animeShow.id_video}/${temporadaAtual}/${ani.numero_episodio}`}>
                                        <button className="bg-blue-700 hover:bg-blue-800 px-6 py-3 rounded-lg font-semibold transition-colors duration-300 cursor-pointer">
                                            Assistir
                                        </button>
                                    </Link>

                                </div>

                            </div>
                        ))}

                    </div>

                </div>
            </div>

        </section >
    );
}

/* ajustart as temporadas efeitos */