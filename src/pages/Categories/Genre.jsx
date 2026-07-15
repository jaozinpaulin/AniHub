import { Link, useParams, useLocation } from "react-router-dom";

import animes from '../../services/detalhes_animes.json'
import { FaChevronLeft, FaFilter } from "react-icons/fa";

export default function Genre() {
    const location = useLocation();
    const { genero } = useParams();


    const removerAcentos = (texto) => {
        return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    const animesFiltrado = animes.filter(ani =>
        (ani.generos ?? []).some(g => removerAcentos(g).includes(removerAcentos(genero ?? ''))))

    return (<section className="w-full min-h-screen bg-zinc-950 pt-12 sm:pt-20 px-1 lg:px-6">

        <div className="py-8 sm:py-10">

            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 sm:mb-6 px-2">

                <Link to={'/categories'} className="group flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors px-2.5 py-1 rounded-lg bg-zinc-800 cursor-pointer text-xs sm:text-sm">
                    <FaChevronLeft className="group-hover:-translate-x-1 transition-transform duration-300 text-[10px] sm:text-xs" />
                    Voltar
                </Link>

                <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-300 text-xs sm:text-sm shrink-0">
                        {animesFiltrado.length} anime(s)
                    </span>

                    <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors text-xs sm:text-sm">
                        <FaFilter className="text-[10px] sm:text-xs" />
                        Filtros
                    </button>
                </div>
            </div>

            <div className="mb-6 sm:mb-10 bg-zinc-900 rounded-xl border border-zinc-800 p-4 mx-2 md:p-6">

                <h1 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold text-white tracking-tight">
                    {genero}
                </h1>

                <p className="text-zinc-400 mt-1 sm:mt-2 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed">
                    Explore todos os animes do gênero{" "}
                    <span className="text-white font-medium">{genero}</span> e descubra novas histórias.
                </p>

            </div>

            <div className="w-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-2.5 sm:gap-5 px-1 sm:px-2 lg:px-6 pb-10">
                {animesFiltrado.map(a => (
                    <Link key={a.id} to={`/anime/${a.id_video}`} state={{ from: location.pathname }} >
                        <div
                            className="relative overflow-hidden rounded-xl bg-zinc-800/80 backdrop-blur-sm cursor-pointer text-white transition-all duration-300 hover:-translate-y-1.5 sm:hover:-translate-y-2 hover:shadow-xl hover:shadow-black/40 hover:bg-zinc-800/60 h-full flex flex-col justify-between">

                            <div className="relative overflow-hidden aspect-[2/3]">
                                <img src={a.capa} alt={`banner do ${a.nome}`} className="w-full h-full object-cover" />

                                <span
                                    className={`absolute top-2 left-2 px-2 py-1 rounded-md text-[10px] sm:text-xs font-medium text-white ${a.generos.includes("Dublado")
                                        ? "bg-blue-800"
                                        : "bg-purple-800"
                                        }`}
                                >
                                    {a.generos.includes("Dublado") ? "Dublado" : "Legendado"}
                                </span>
                            </div>

                            <div className="p-2 sm:p-4">
                                <h4 className="font-bold text-[11px] sm:text-base truncate transition-colors duration-300 hover:text-purple-300">
                                    {a.nome}
                                </h4>
                            </div>

                        </div>
                    </Link>
                ))}
            </div>

        </div>

    </section>
    )
}