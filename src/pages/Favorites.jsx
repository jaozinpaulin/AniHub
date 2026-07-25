import { Link, useNavigate } from "react-router-dom";
import { HiOutlineHeart, HiHeart } from "react-icons/hi2";
import { FaChevronLeft } from "react-icons/fa";

import { useFavorites } from "../hooks/useFavorites";


import SkeletonLoading from "../components/Skeleton/SkeletonLoading";
import ErrorMessage from "../components/Feedback/ErrorMessage";
import EmptyState from "../components/Feedback/EmptyState";

export default function Favorites() {
    const { favoritos, loading, error, loadFavorites, isFavorite, toggleFavorite } = useFavorites();
    const navigate = useNavigate();

    const hasFavorites = favoritos && favoritos.length > 0;



    if (loading) {
        return (
            <div className=" flex flex-col pt-32 px-5 gap-5">

                <div className=" space-y-3 animate-pulse">
                    <div className=" h-8 w-52 rounded-lg bg-zinc-800" />

                    <div className=" h-4 w-80 max-w-full rounded-lg bg-zinc-800" />
                </div>

                <div className=" w-full h-12 rounded-xl bg-zinc-800 animate-pulse" />
                <div className=" w-full h-20 rounded-xl bg-zinc-800 animate-pulse" />

                <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <SkeletonLoading quantity={12} />
                </div>

            </div>
        )
    }
    if (error) {
        return (
            <div className="pt-32 p-10">
                <ErrorMessage message={error} retry={loadFavorites} />
            </div>
        )
    }


    if (favoritos.length === 0) {
        return (
            <div className=" flex flex-col py-10 sm:pt-24 px-5 gap-5">

                <div className=" space-y-3 animate-pulse">
                    <div className=" h-8 w-52 rounded-lg bg-zinc-800" />

                    <div className=" h-4 w-80 max-w-full rounded-lg bg-zinc-800" />
                </div>

                <div className=" w-full h-12 rounded-xl bg-zinc-800 animate-pulse" />
                <div className=" w-full h-20 rounded-xl bg-zinc-800 animate-pulse" />

                <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <SkeletonLoading quantity={12} />
                </div>

            </div>
        )
    }




    return (
        <section className="w-full min-h-dvh bg-zinc-950 pt-16 sm:pt-20 px-4 lg:px-8 text-zinc-100 selection:bg-purple-500/30">
            <div className="py-4 sm:py-10">

                <div className="mb-6 p-4 sm:p-7 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:mb-10">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <h1 className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl">
                                Meus Favoritos
                                <HiHeart className="h-5 w-5 shrink-0 animate-pulse text-rose-500 sm:h-8 sm:w-8" />
                            </h1>

                            <span className="inline-flex h-6 items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-950/80 px-2 text-xs font-medium text-zinc-400 tabular-nums sm:hidden">
                                <strong className="font-semibold text-rose-400">{favoritos.length}</strong>
                            </span>
                        </div>

                        <p className="text-xs leading-relaxed text-zinc-400 sm:text-sm md:text-base">
                            Aqui estão os animes que você salvou para assistir depois.
                        </p>
                    </div>

                    <div className="hidden shrink-0 sm:block">
                        <span className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-950/80 px-3.5 text-sm font-medium text-zinc-400 tabular-nums shadow-inner">
                            <strong className="font-semibold text-rose-400">{favoritos.length}</strong>
                            <span>{favoritos.length === 1 ? "favorito" : "favoritos"}</span>
                        </span>
                    </div>
                </div>

                {!hasFavorites ? (
                    <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-zinc-900/20 border border-dashed border-zinc-800 rounded-2xl">
                        <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800 mb-4">
                            <HiOutlineHeart className="text-zinc-500 size-8" />
                        </div>
                        <h2 className="text-white font-medium text-base sm:text-lg mb-1">Nenhum anime por aqui</h2>
                        <p className="text-zinc-500 text-xs sm:text-sm max-w-xs mb-6">
                            Sua lista está vazia. Explore o catálogo e adicione seus animes preferidos aqui!
                        </p>
                        <Link
                            to="/explore"
                            className="px-4 py-2 bg-red-600 hover:bg-red-600/80 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-purple-600/10">
                            Explorar Catálogo
                        </Link>
                    </div>
                ) : (
                    <div className="w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-9 gap-2.5 sm:gap-4 pb-10">
                        {favoritos.map((anime, index) => (
                            <Link
                                key={index}
                                to={`/anime/${anime.id_video}`}
                                state={{ from: location.pathname }}

                                className="group relative flex flex-col bg-zinc-900 border border-zinc-800/60 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700">
                                <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-950">

                                    <div className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 z-20 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-zinc-950/70 border border-zinc-800 flex items-center justify-center backdrop-blur-md opacity-90 group-hover:opacity-100 transition-opacity">
                                        <HiHeart className="text-red-500 size-3.5 sm:size-4.5" />
                                    </div>

                                    <img src={anime.capa} alt={anime.nome}
                                        loading="lazy"
                                        className="w-full h-full object-cover brightness-100 blur-0 scale-100 transition-all duration-500 ease-out group-hover:scale-102" />

                                    <span
                                        className={`absolute top-1 left-1 sm:top-2 sm:left-2 z-20 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md text-[9px] sm:text-xs font-medium text-white tracking-wide shadow-md backdrop-blur-sm whitespace-nowrap ${anime.generos.includes("Dublado")
                                            ? "bg-blue-600/90 border border-blue-500/20"
                                            : "bg-purple-600/90 border border-purple-500/20"
                                            }`}>
                                        {anime.generos.includes("Dublado") ? (
                                            <>
                                                <span className="max-[360px]:hidden">Dublado</span>
                                                <span className="hidden max-[360px]:block">Dub</span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="max-[360px]:hidden">Legendado</span>
                                                <span className="hidden max-[360px]:block">Leg</span>
                                            </>
                                        )}
                                    </span>

                                </div>
                                <div className="p-2 sm:p-3 flex-1 flex flex-col justify-center">
                                    <h3 className="text-zinc-200 text-[11px] sm:text-xs font-medium line-clamp-2 leading-snug">
                                        {anime.nome}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

            </div>
        </section>
    );
}