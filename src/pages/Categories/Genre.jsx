import { Link, useParams, useNavigate } from "react-router-dom";

import { animes } from "../../api/animes"
import { FaChevronLeft, FaFilter } from "react-icons/fa";



export default function Genre() {
    const { genero } = useParams();
    const navigate = useNavigate();


    const removerAcentos = (texto) => {
        return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    const animesFiltrado = animes.filter(
        ani => removerAcentos(ani.genero ?? '') === removerAcentos(genero ?? ''))


    return (
        <section className=" min-h-screen bg-zinc-950 pt-20 px-6">

            <div className="max-w-7xl mx-auto py-10 ">

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

                <div className="mb-10">

                    <h1 className="text-4xl font-bold text-white">
                        {genero}
                    </h1>

                    <p className="text-zinc-400 mt-2">
                        Explore todos os animes deste gênero.
                    </p>

                </div>


                <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 pb-10">

                    {animesFiltrado.map(a => (

                        <div className="group  bg-zinc-800 rounded-xl overflow-hidden cursor-pointer hover:bg-zinc-800/65 text-white" key={a.id}>
                            <div className="overflow-hidden">
                                <img src={a.imagem}
                                    alt={'banner do ' + a.nome}
                                    className="w-full h-64 object-cover transition-transform  group-hover:scale-110  duration-300" />
                            </div>
                            <div className="p-4">
                                <h4 className="font-bold text-lg truncate">
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

        </section>
    )
}