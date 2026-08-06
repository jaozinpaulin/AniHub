import { Link, useParams, useLocation } from "react-router-dom";

import { FaChevronLeft, FaFilter } from "react-icons/fa";
import { useState } from "react";

import { useAnimes } from "../../hooks/useAnimes";

import SkeletonLoading from "../../components/Skeleton/SkeletonLoading";
import ErrorMessage from "../../components/Feedback/ErrorMessage";
import EmptyState from "../../components/Feedback/EmptyState";


import type { AnimeType } from "../../types/anime";

type FilterOptionType =
    | "Todos"
    | "A-Z"
    | "Z-A"
    | "Melhor avaliados";

export default function Genre() {
    const { animes, loading, error, loadAnimes } = useAnimes();

    const [filter, setFilter] = useState<FilterOptionType>("Todos");

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const location = useLocation();
    const { genero } = useParams();
    const [busca, setBusca] = useState('');

    const removerAcentos = (texto: string) => {
        return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    const animesFiltrado = animes.filter(ani =>
        (ani.generos ?? []).some(g => removerAcentos(g).includes(removerAcentos(genero ?? ''))))


    const animesAll = animesFiltrado.filter(ani => {

        const inputFilter = busca === "" || ani.nome.toLowerCase().includes(busca.toLowerCase())
        return inputFilter
    })


    const filterOptions: FilterOptionType[] = [
        "Todos",
        "A-Z",
        "Z-A",
        "Melhor avaliados"
    ];


    let filteredAnimes = [...animesAll];

    switch (filter) {

        case "Todos":
            break;

        case "A-Z":
            filteredAnimes.sort((a, b) =>
                a.nome.localeCompare(b.nome)
            );
            break;

        case "Z-A":
            filteredAnimes.sort((a, b) =>
                b.nome.localeCompare(a.nome)
            );
            break;

        case "Melhor avaliados":
            filteredAnimes.sort((a, b) =>
                b.classificacao - a.classificacao
            );
            break;

        default:
            break;
    }

    if (loading) {
        return (
            <div className=" flex flex-col pt-10 sm:pt-24 px-5 gap-5">

                <div className=" space-y-3 animate-pulse">
                    <div className=" h-8 w-52 rounded-lg bg-zinc-800" />

                    <div className=" h-4 w-80 max-w-full rounded-lg bg-zinc-800" />
                </div>

                <div className=" w-full h-12 rounded-xl bg-zinc-800 animate-pulse" />
                <div className=" w-full h-20 rounded-xl bg-zinc-800 animate-pulse" />

                <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <SkeletonLoading />
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
            <div className="space-y-3 p-10 pt-20 sm:pt-24">
                <div className="space-y-2 animate-pulse">
                    <div className=" h-8 w-52 rounded-lg bg-zinc-800" />

                    <div className=" h-4 w-80 max-w-full rounded-lg bg-zinc-800" />
                </div>

                <div className="w-full flex items-center justify-center h-12 rounded-xl bg-zinc-800 animate-pulse">
                    <span className=" text-zinc-500 text-sm text-center">
                        Não foi possível carregar
                    </span>
                </div>

                <EmptyState message={error ?? "Erro ao carregar os animes"} retry={loadAnimes} />
            </div>
        )
    }

    return (
        <section className="w-full min-h-screen bg-zinc-950 pt-12 md:pt-20 px-1 lg:px-6">

            <div className="py-4 sm:py-8">

                <div className="relative  bg-zinc-950/90 py-2 md:py-4">

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-2 ">

                        <Link to="/categories"
                            className="group self-start items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all text-xs sm:text-sm hidden sm:inline-flex font-medium shrink-0">
                            <FaChevronLeft className="group-hover:-translate-x-1 transition-transform text-[10px]" />
                            Voltar para Categorias
                        </Link>

                        <div className="relative flex items-center gap-2 w-full sm:w-auto">

                            <div className="relative flex-1 sm:w-64">

                                <input type="search" inputMode="text" value={busca} onChange={(ani) => setBusca(ani.target.value)}
                                    placeholder="Buscar nesta categoria..."
                                    className="w-full shrink-0 bg-zinc-900/90 border border-zinc-800 focus:border-purple-500 rounded-xl px-3.5 py-2 text-base sm:text-sm text-zinc-100 focus:outline-none transition-all duration-200  [&::-webkit-search-cancel-button]:cursor-pointer"
                                />
                            </div>

                            <span className="inline-flex items-center justify-center gap-1 w-12 sm:w-16 h-10 px-2 rounded-xl bg-zinc-900 text-zinc-400 text-xs sm:text-sm whitespace-nowrap shrink-0">
                                <strong className="text-purple-400 font-semibold">{animesAll.length}</strong>
                                <span className="hidden xs:inline">animes</span>
                            </span>

                            <div className="relative">
                                <button type="button" onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className=" inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 active:scale-95 transition-all text-xs sm:text-sm font-medium cursor-pointer shrink-0">

                                    <FaFilter className="text-xs text-purple-400" />

                                    <span className="hidden md:inline">
                                        {filter}
                                    </span>
                                </button>
                                {isFilterOpen && (
                                    <>
                                        <div onClick={() => setIsFilterOpen(false)} className="fixed inset-0 z-20" />

                                        <div className="absolute top-12 right-0 z-30 w-48 sm:w-52 rounded-xl border border-zinc-800 bg-zinc-900 shadow-xl overflow-hidden">
                                            {filterOptions.map((option) => (
                                                <button
                                                    key={option}
                                                    onClick={() => {
                                                        setFilter(option);
                                                        setIsFilterOpen(false);
                                                    }}
                                                    className={`w-full px-4 py-2.5 text-left text-xs sm:text-sm transition-colors cursor-pointer ${filter === option
                                                        ? "bg-zinc-600 text-white font-medium"
                                                        : "text-zinc-300 hover:bg-zinc-800"
                                                        }`}>
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                        </div>
                    </div>
                </div>

                <div className="mb-6 md:mb-10 px-2 md:p-4 rounded-2xl md:bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-zinc-950 md:border border-zinc-800/80 ">
                    <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-zinc-100 tracking-tight">
                        {genero}
                    </h1>

                    <p className="text-zinc-300 sm:mt-2 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed">
                        Explore todos os animes de{" "}
                        <strong className="text-zinc-200 font-semibold">{genero}</strong> disponíveis no catálogo e encontre novas histórias.
                    </p>
                </div>

                <div className="w-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-2.5 sm:gap-5 px-1 sm:px-2 lg:px-6 pb-10">
                    {filteredAnimes.map((a, index) => (
                        <Link key={index} to={`/anime/${a.id_video}`} state={{ from: location.pathname }} >
                            <div
                                className="relative overflow-hidden rounded-xl bg-zinc-800/80 backdrop-blur-sm cursor-pointer text-white transition-all duration-300 hover:-translate-y-1.5 sm:hover:-translate-y-2 hover:shadow-xl hover:shadow-black/40 hover:bg-zinc-800/60 h-full flex flex-col border-transparent border hover:border-zinc-500 justify-between">

                                <div className="relative overflow-hidden aspect-[2/3]">
                                    <img src={a.capa} alt={`banner do ${a.nome}`} className="w-full h-full object-cover" />

                                    <span
                                        className={`absolute top-2 left-2 px-2 py-1 rounded-md text-[10px] sm:text-xs font-medium text-white ${a.generos.includes("Dublado")
                                            ? "bg-blue-800"
                                            : "bg-purple-800"
                                            }`}>
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