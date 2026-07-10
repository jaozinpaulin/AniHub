import { Link, useNavigate } from "react-router-dom";
import { HiOutlineHeart, HiHeart } from "react-icons/hi2";
import { FaChevronLeft } from "react-icons/fa";

import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesProvider";

export default function Favorites() {
    const { favoritos } = useContext(FavoritesContext);
    const navigate = useNavigate();


    const hasFavorites = favoritos && favoritos.length > 0;

    return (
        <section className="w-full min-h-dvh bg-zinc-950 pt-16 sm:pt-20 px-4 lg:px-8 text-zinc-100 selection:bg-purple-500/30">
            <div className="py-4 sm:py-10">

                <div className="flex items-end gap-2 mb-4 sm:mb-6">


                    <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs sm:text-sm font-medium">
                        {favoritos.length} {favoritos.length === 1 ? "favorito" : "favoritos"}
                    </span>
                </div>

                <div className="mb-6 sm:mb-10 bg-zinc-900/50 rounded-xl p-5 md:p-6 border  border-zinc-900 backdrop-blur-sm">
                    <h1 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
                        Meus Favoritos
                        <HiHeart className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 animate-pulse shrink-0" />
                    </h1>
                    <p className="text-zinc-400 mt-1 text-xs sm:text-sm md:text-base leading-relaxed">
                        Aqui estão os animes que você salvou para assistir depois.
                    </p>
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
                            className="px-4 py-2 bg-red-600 hover:bg-red-600/80 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-purple-600/10"
                        >
                            Explorar Catálogo
                        </Link>
                    </div>
                ) : (
                    <div className="w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-9 gap-2.5 sm:gap-4 pb-10">
                        {favoritos.map((anime) => (
                            <Link
                                key={anime.id}
                                to={`/anime/${anime.id_video}`}
                                state={{ from: location.pathname }}
                                className="group relative flex flex-col bg-zinc-900 border border-zinc-800/60 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:shadow-lg hover:shadow-red-950/10">

                                <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-950">
                                    <div className="absolute top-1.5 right-1.5 z-10 w-7 h-7 rounded-full bg-zinc-950/70 border border-zinc-800 flex items-center justify-center backdrop-blur-md opacity-90 group-hover:opacity-100 transition-opacity">
                                        <HiHeart className="text-red-500 size-4.5" />
                                    </div>

                                    <img
                                        src={anime.capa}
                                        alt={anime.nome}
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-102 group-hover:brightness-[0.4] group-hover:blur-[1px]"
                                    />
                                </div>

                                <div className="p-2 sm:p-3 flex-1 flex flex-col justify-center">
                                    <h3 className="text-zinc-200 text-[11px] sm:text-xs font-medium line-clamp-2 leading-snug transition-colors duration-300 group-hover:text-red-400">
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