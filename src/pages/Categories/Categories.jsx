import { FaBorderAll } from "react-icons/fa";
import { FaGrip } from "react-icons/fa6";

import { Link } from "react-router-dom";

import corGenero from '../../services/generos.json'

import { useAnimes } from "../../hooks/useAnimes";
import SkeletonCategories from "../../components/Skeleton/SkeletonCategories";
import ErrorMessage from "../../components/Feedback/ErrorMessage";
import EmptyState from "../../components/Feedback/EmptyState";

export default function Categories() {
    const { animes, loading, error, loadAnimes } = useAnimes();

    const generosUnicos = [...new Set(animes.flatMap(ani => ani.generos).filter(a => !a.startsWith('Letra')))]


    if (loading) {
        return (
            <div className=" flex flex-col pt-32 p-6 gap-5">

                <div className=" space-y-3 animate-pulse">
                    <div className=" h-8 w-52 rounded-lg bg-zinc-800" />

                    <div className=" h-5 w-80 max-w-full rounded-lg bg-zinc-800" />
                </div>

                <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <SkeletonCategories />
                </div>

            </div>

        )
    }
    if (error) {
        return (
            <div className="pt-32 p-10">
                <ErrorMessage message={error} retry={loadAnimes} />
            </div>
        )
    }


    if (animes.length === 0) {
        return (
            <div className="space-y-3 p-10 pt-32">
                <div className="space-y-2 animate-pulse">
                    <div className=" h-8 w-52 rounded-lg bg-zinc-800" />


                    <div className=" h-4 w-80 max-w-full rounded-lg bg-zinc-800" />
                </div>

                <div className=" w-full h-12 rounded-xl bg-zinc-800 animate-pulse" />
                <div className=" w-full h-20 rounded-xl flex items-center justify-center bg-zinc-800 animate-pulse">
                    <span className=" text-zinc-500 text-sm text-center">
                        Não foi possível carregar
                    </span>
                </div>

                <EmptyState message={error} retry={loadAnimes} />
            </div>
        )
    }




    return (

        <section className="w-full min-h-dvh pt-12 sm:pt-20 px-1 lg:px-6 bg-zinc-950">

            <div className="w-full px-4 sm:px-6">
                <div className="pt-4 sm:pt-10">

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                        Categorias
                    </h2>

                    <p className="text-zinc-400 text-sm sm:text-lg max-w-2xl">
                        Navegue pelos gêneros e encontre seu próximo anime favorito
                    </p>

                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 py-6 sm:py-10">
                    {generosUnicos.map(gen => {

                        const animeLength = animes.filter(
                            gene => gene.generos.includes(gen)).length;

                        const generoAtual =
                            corGenero.find(g => g.nome === gen) || {
                                bg: "bg-zinc-900",
                                border: "border-zinc-800",
                                hover: "hover:border-zinc-700"
                            };

                        return (
                            <Link key={gen} to={`/categories/${gen}`} className="group">

                                <div className={`relative overflow-hidden h-full min-h-[120px] sm:min-h-[150px] flex flex-col justify-between p-3 sm:p-5 rounded-xl sm:rounded-2xl border transition-all duration-300 ease-out cursor-pointer backdrop-blur-md bg-zinc-900/80 shadow-sm hover:-translate-y-1.5 sm:hover:-translate-y-2 hover:shadow-xl hover:shadow-black/40 ${generoAtual.bg} ${generoAtual.border} ${generoAtual.hover}`}>

                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300 bg-gradient-to-br from-white to-transparent" />

                                    <div className="flex items-center justify-between z-10 gap-2">
                                        <div className="p-1.5 sm:p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors shrink-0">
                                            <FaGrip className="text-base sm:text-lg text-zinc-400 group-hover:text-white transition-colors" />
                                        </div>

                                        <span className="text-[10px] sm:text-[11px] font-medium px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-zinc-800/80 text-zinc-300 border border-zinc-700/40 shrink-0">
                                            {animeLength}
                                        </span>
                                    </div>

                                    <div className="z-10 mt-3 sm:mt-4">
                                        <h3 className="text-sm sm:text-base md:text-lg font-bold text-zinc-100 group-hover:text-white transition-colors line-clamp-1">
                                            {gen}
                                        </h3>

                                        <p className="text-[10px] sm:text-xs text-zinc-400 mt-0.5 sm:mt-1 opacity-80 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            Explorar coleção
                                        </p>
                                    </div>

                                </div>

                            </Link>
                        );
                    })}

                </div>

            </div>

        </section>
    )
}