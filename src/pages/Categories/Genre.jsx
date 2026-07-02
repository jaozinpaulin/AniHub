import { Link, useParams, useNavigate } from "react-router-dom";

import animes from '../../api/detalhes_animes.json'
import { FaChevronLeft, FaFilter } from "react-icons/fa";

console.log(animes)

export default function Genre() {
    const { genero } = useParams();
    const navigate = useNavigate();


    const removerAcentos = (texto) => {
        return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    const animesFiltrado = animes.filter(ani =>
        (ani.generos ?? []).some(g => removerAcentos(g).includes(removerAcentos(genero ?? ''))))




    console.log(animesFiltrado)
    return (
        <section className="w-full min-h-screen bg-zinc-950 pt-20 px-10">

            <div className="py-10 ">
                <div className="flex items-center justify-between mb-6">

                    <button onClick={() => navigate(-1)} className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors px-3 py-1 rounded-lg bg-zinc-800 cursor-pointer">
                        <FaChevronLeft className="group-hover:-translate-x-1 transforma duration-300" />
                        Voltar
                    </button>

                    <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-lg bg-zinc-800 text-zinc-300 text-sm">
                            {animesFiltrado.length} anime(s)
                        </span>

                        <button className="flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors">
                            <FaFilter className="text-sm" />
                            Filtros
                        </button>
                    </div>
                </div>

                <div className="mb-10 bg-zinc-900 rounded p-3">

                    <h1 className="text-4xl font-bold text-white tracking-tight">
                        {genero}
                    </h1>

                    <p className="text-zinc-400 mt-2 max-w-xl leading-relaxed">
                        Explore todos os animes do gênero <span className="text-white font-medium">{genero}</span> e descubra novas histórias.
                    </p>

                </div>

                <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-5 px-6 pb-10">
                    {animesFiltrado.map(a => (
                        <Link to={`/anime/${a.id_video}`}>
                            <div
                                key={a.id}
                                className=" relative overflow-hidden rounded-xl bg-zinc-800/80 backdrop-blur-sm cursor-pointer text-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/40 hover:bg-zinc-800/60">

                                <div className="overflow-hidden aspect-[2/3]">
                                    <img src={a.capa} alt={`banner do ${a.nome}`} className="w-full h-full object-cover" />
                                </div>

                                <div className="p-4">

                                    <h4 className=" font-bold text-base truncate transition-colors duration-300 hover:text-purple-300">
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