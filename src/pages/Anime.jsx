import { useNavigate, Link, useParams } from "react-router-dom";

import { FaStar, FaHeart, FaChevronDown, FaChevronLeft } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";

import dados from '../api/detalhes_animes.json'


export default function Anime() {

    const navigate = useNavigate();
    const { id } = useParams();

    const animeShow = dados.find((anime) => {
        return anime.id_video === id
    })


    // console.log(animeShow.temporadas['Temporada 1'].episodios[0].capa_episodio)
    // console.log(animeShow)

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

                            {/* <span className="px-4 py-3 bg-zinc-900/70 rounded-xl text-zinc-400 text-sm flex gap-2">
                                <LuCalendarDays className="text-lg text-violet-500" />
                                Sexta-feira
                            </span>

                            <button className="px-6 py-3 bg-zinc-900/70 hover:bg-zinc-800 rounded-xl font-medium transition-all duration-300 cursor-pointer">
                                Assistir Trailer
                            </button> */}

                            <button className="px-5 py-3 bg-zinc-900/70 hover:bg-zinc-800 rounded-xl flex items-center gap-2 transition-all duration-300 cursor-pointer">
                                <FaHeart className="text-red-500" />
                                <span>Favoritar</span>
                            </button>

                        </div>

                    </div>

                    <h2 className="text-3xl font-bold">
                        {animeShow.nome}
                    </h2>
                    {/* 
                    <p className="text-zinc-400 italic">
                        呪術廻戦 (Jujutsu Kaisen)
                    </p> */}

                    <div className="flex items-center gap-3">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-zinc-400">{animeShow.classificacao} / 10</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div className="border border-zinc-800 p-3">
                            <p className="text-zinc-500 text-sm">Episódios</p>
                            <p className="text-white">24</p>
                        </div>

                        {/* <div className="border border-zinc-800  p-3">
                            <p className="text-zinc-500 text-sm">Estúdio</p>
                            <p className="text-white">MAPPA</p>
                        </div> */}

                        <div className="border border-zinc-800 p-3">
                            <p className="text-zinc-500 text-sm">{animeShow.data_lancamento}</p>
                            <p className="text-white">{animeShow.data_lancamento.split(',')[1]}</p>
                        </div>
                        {/* 
                        <div className="border border-zinc-800 p-3">
                            <p className="text-zinc-500 text-sm">Status</p>
                            <p className="text-white">Em exibição</p>
                        </div> */}

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

                        <button className="w-full md:w-72 flex items-center justify-between bg-zinc-950/25 border border-zinc-800 rounded-xl p-3 cursor-pointer">
                            <span className="text-lg font-semibold text-white">
                                Temporada 1
                            </span>

                            <FaChevronDown className="text-zinc-400 text-sm transition duration-300" />

                        </button>

                    </div>

                    <div className="flex flex-col gap-5 mb-3">

                        {animeShow.temporadas['Temporada 1'].episodios.map((ani, i) => (

                            <div key={i} className="flex items-center gap-5 bg-zinc-950/25 border border-zinc-800  p-3 ">

                                <img
                                    src={ani.capa_episodio}
                                    alt=""
                                    className="w-44 h-24 rounded-lg object-cover" />

                                <div className="w-full flex items-center justify-between">
                                    <div >
                                        {/*     console.log()
 */}
                                        <span className="text-blue-500 font-semibold text-sm">
                                            Episódio {ani.numero_episodio}
                                        </span>

                                        {/* <h3 className="text-white text-xl font-bold mt-2">
                                            A Jornada Começa
                                        </h3> */}

                                        <p className="text-zinc-400 mt-3">
                                            {animeShow.data_lancamento}
                                        </p>

                                    </div>
                                    <Link to={`/video/${animeShow.id_video}/${ani.numero_episodio}`}>
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

        </section>
    );
}


/* arrumar o link pra ele nao manar caracteres estranhos */