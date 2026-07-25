import { useRef, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

import { FaStar, FaFire } from "react-icons/fa";
import ButtonsArrow from "../components/ButtonsArrow";

import { useAnimes } from "../../../hooks/useAnimes";
import SkeletonLoading from "../../../components/Skeleton/SkeletonLoading";
import ErrorMessage from "../../../components/Feedback/ErrorMessage";
import EmptyState from "../../../components/Feedback/EmptyState";


export default function Trending() {
    const { animes, loading, error, loadAnimes } = useAnimes();

    const location = useLocation();

    const scrollAnimeRef = useRef(null);
    const scrollTopRef = useRef(null);

    const recentAnimes = useMemo(() => {
        if (!animes) return [];
        return [...animes].reverse().slice(0, 30);
    }, [animes]);

    const topRatedAnimes = useMemo(() => {
        if (!animes) return [];
        return [...animes]
            .filter((ani) => ani.classificacao >= 7)
            .sort((a, b) => b.classificacao - a.classificacao)
            .slice(0, 30);
    }, [animes]);

    if (loading) {
        return (
            <div className="grid grid-cols-2 md:grid-colos-4 lg:grid-cols-6 gap-4 "><SkeletonLoading /></div>
        )
    }

    if (error) {
        return (
            <ErrorMessage message={error} retry={loadAnimes} />
        )
    }


    if (animes.length === 0) {
        return (
            <EmptyState message={error} retry={loadAnimes} />
        )
    }


    return (
        <section className="w-full text-white space-y-4 md:space-y-6 pb-20">

            <div className="w-full">

                <div className="w-full flex items-center justify-between  px-4 md:px-0">

                    <div className="flex flex-col lg:flex-row lg:items-baseline py-3 gap-1 lg:gap-4 lg:py-6">

                        <h3 className="text-xl font-bold text-white md:text-2xl flex items-center gap-2 whitespace-nowrap">
                            <FaFire className="text-red-500 shrink-0" />
                            Adicionados Recentemente
                        </h3>

                        <p className="text-xs text-zinc-500 lg:text-sm font-medium leading-tight">
                            Fique por dentro das últimas novidades em anime.
                        </p>

                    </div>

                    <div className="shrink-0">
                        <ButtonsArrow scrollRef={scrollAnimeRef} />
                    </div>

                </div>

                <div className="relative">
                    <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-zinc-950 to-transparent md:w-12" />
                    <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-zinc-950 to-transparent md:w-12" />

                    <div
                        ref={scrollAnimeRef}
                        className="flex gap-3 overflow-x-auto scroll-smooth scrollbar-none md:gap-4 p-2">
                        {recentAnimes.map((a) => {
                            const idPlayer = a.id_video;

                            return (
                                <Link
                                    key={idPlayer}
                                    to={`/Anime/${idPlayer}`}
                                    state={{ from: location.pathname }}
                                    className="shrink-0 group">

                                    <div className="w-36 sm:w-40 md:w-44 lg:w-48 overflow-hidden rounded-xl bg-zinc-800/70 transition-all duration-300 ease-in-out group-hover:bg-zinc-800 border border-transparent group-hover:border-zinc-600 hover:-translate-y-1">
                                        <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 flex items-center justify-center">
                                            <img
                                                src={a.capa}
                                                alt={`Banner do ${a.nome}`}
                                                className="w-full h-full object-cover" />

                                            <div className="absolute top-2 right-2 flex items-center gap-1 rounded-lg bg-black/70 px-2 py-1 backdrop-blur-sm md:top-3 md:right-3 transition-opacity duration-300">
                                                <FaStar className="text-xs text-yellow-400" />
                                                <span className="text-xs font-semibold text-white">
                                                    {Number(a.classificacao).toFixed(1)}
                                                </span>
                                            </div>

                                            <span
                                                className={`absolute top-2 left-2 px-2 py-1 rounded-md text-[10px] sm:text-xs font-medium text-white transition-colors duration-300 ${a.generos.includes("Dublado")
                                                    ? "bg-blue-600/80 group-hover:bg-blue-600"
                                                    : "bg-purple-600/80 group-hover:bg-purple-600"
                                                    }`}
                                            >
                                                {a.generos.includes("Dublado") ? "Dublado" : "Legendado"}
                                            </span>
                                        </div>

                                        <div className="flex h-12 items-center px-3 md:h-14">
                                            <h4 className="w-full line-clamp-2 text-sm font-bold md:text-base text-zinc-100 transition-colors duration-300 group-hover:text-white">
                                                {a.nome}
                                            </h4>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="w-full">
                <div className="w-full flex items-center justify-between px-4 md:px-0">

                    <div className="flex flex-col lg:flex-row lg:items-baseline py-3 gap-1 lg:gap-4 lg:py-6">

                        <h3 className="text-xl font-bold text-white md:text-2xl flex items-center gap-2 whitespace-nowrap">
                            <FaStar className="text-yellow-500 shrink-0" />
                            Mais Bem Avaliados
                        </h3>

                        <p className="text-xs text-zinc-500 lg:text-sm font-medium leading-tight">
                            Descubra os animes com as melhores avaliações da comunidade.
                        </p>

                    </div>

                    <div className="shrink-0">
                        <ButtonsArrow scrollRef={scrollTopRef} />
                    </div>

                </div>

                <div className="relative">
                    <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-zinc-950 to-transparent md:w-12" />
                    <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-zinc-950 to-transparent md:w-12" />


                    <div
                        ref={scrollTopRef}
                        className="flex gap-3 overflow-x-auto scroll-smooth scrollbar-none md:gap-4 p-2">
                        {topRatedAnimes.map((a) => {
                            const idPlayer = a.id_video;

                            return (
                                <Link
                                    key={idPlayer}
                                    to={`/Anime/${idPlayer}`}
                                    state={{ from: location.pathname }}
                                    className="shrink-0 group">
                                    <div className="w-36 sm:w-40 md:w-44 lg:w-48 overflow-hidden rounded-xl bg-zinc-800/70 transition-all duration-300 ease-in-out group-hover:bg-zinc-800 border border-transparent group-hover:border-zinc-600 hover:-translate-y-1">
                                        <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 flex items-center justify-center">
                                            <img
                                                src={a.capa}
                                                alt={`Banner do ${a.nome}`}
                                                className="w-full h-full object-cover"
                                            />

                                            <div className="absolute top-2 right-2 flex items-center gap-1 rounded-lg bg-black/70 px-2 py-1 backdrop-blur-sm md:top-3 md:right-3 transition-opacity duration-300">
                                                <FaStar className="text-xs text-yellow-400" />
                                                <span className="text-xs font-semibold text-white">
                                                    {Number(a.classificacao).toFixed(1)}
                                                </span>
                                            </div>

                                            <span
                                                className={`absolute top-2 left-2 px-2 py-1 rounded-md text-[10px] sm:text-xs font-medium text-white transition-colors duration-300 ${a.generos.includes("Dublado")
                                                    ? "bg-blue-600/80 group-hover:bg-blue-600"
                                                    : "bg-purple-600/80 group-hover:bg-purple-600"
                                                    }`}
                                            >
                                                {a.generos.includes("Dublado") ? "Dublado" : "Legendado"}
                                            </span>
                                        </div>

                                        <div className="flex h-12 items-center px-3 md:h-14">
                                            <h4 className="w-full line-clamp-2 text-sm font-bold md:text-base text-zinc-100 transition-colors duration-300 group-hover:text-white">
                                                {a.nome}
                                            </h4>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>

        </section>
    );
}