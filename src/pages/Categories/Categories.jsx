import { FaBorderAll } from "react-icons/fa";
import { FaGrip } from "react-icons/fa6";
import { animes } from "../../api/animes";

import { Link } from "react-router-dom";


const generosUnicos = [...new Set(animes.map(g => g.genero))]


/* temporario */
const coresGenero = {
    "Sobrenatural": {
        bg: "bg-cyan-500/20",
        border: "border-cyan-500/30",
        hover: "hover:bg-cyan-500/30"
    },

    "Ação": {
        bg: "bg-red-500/20",
        border: "border-red-500/30",
        hover: "hover:bg-red-500/30"
    },

    "Aventura": {
        bg: "bg-green-500/20",
        border: "border-green-500/30",
        hover: "hover:bg-green-500/30"
    },

    "Shounen": {
        bg: "bg-orange-500/20",
        border: "border-orange-500/30",
        hover: "hover:bg-orange-500/30"
    },

    "Drama": {
        bg: "bg-yellow-500/20",
        border: "border-yellow-500/30",
        hover: "hover:bg-yellow-500/30"
    },

    "Fantasia": {
        bg: "bg-purple-500/20",
        border: "border-purple-500/30",
        hover: "hover:bg-purple-500/30"
    },

    "Terror": {
        bg: "bg-rose-600/20",
        border: "border-rose-600/30",
        hover: "hover:bg-rose-600/30"
    }
};

export default function Categories() {
    return (<section className="w-full min-h-dvh pt-20 bg-zinc-950">

        <div className="max-w-7xl mx-auto px-6">
            <div className="pt-10">

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    Categorias
                </h2>

                <p className="text-zinc-400 text-lg max-w-2xl">
                    Navegue pelos gêneros e encontre seu próximo anime favorito
                </p>

            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 py-10">
                {generosUnicos.map((gen, i) => {

                    const animeLength = animes.filter(gene =>
                        gene.genero.includes(gen)
                    ).length;

                    return (

                        <Link key={i} to={`/categories/${gen}`}>

                            <div className={`border rounded-xl p-4 bg-zinc-900 hover:-translate-y-1 transition-all duration-300 cursor-pointer
                                ${coresGenero[gen].bg}
                                ${coresGenero[gen].hover}
                                ${coresGenero[gen].border}`}>

                                <FaGrip className="text-lg text-zinc-400 mb-2" />

                                <h3 className="text-lg font-semibold text-white mb-1">
                                    {gen}
                                </h3>

                                <span className="text-sm text-zinc-400/90">
                                    {animeLength} anime(s)
                                </span>

                            </div>

                        </Link>

                    )
                })}

            </div>

        </div>

    </section>
    )
}