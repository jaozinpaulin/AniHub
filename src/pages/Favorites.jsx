import { Link, useNavigate } from "react-router-dom";
import { HiOutlineHeart } from "react-icons/hi2";
import { FaChevronLeft } from "react-icons/fa";

export default function Favorites() {
    const navigate = useNavigate();

    const favoritos = [
        {
            id: 1,
            id_video: "naruto-1",
            nome: "Naruto Shippuden",
            capa: "https://cdn.myanimelist.net/images/anime/5/17407.jpg"
        },
        {
            id: 2,
            id_video: "one-piece-1",
            nome: "One Piece",
            capa: "https://cdn.myanimelist.net/images/anime/6/73245.jpg"
        },
        {
            id: 3,
            id_video: "attack-on-titan",
            nome: "Attack on Titan",
            capa: "https://cdn.myanimelist.net/images/anime/10/47347.jpg"
        },
        {
            id: 4,
            id_video: "demon-slayer",
            nome: "Demon Slayer",
            capa: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg"
        },
        {
            id: 5,
            id_video: "jujutsu-kaisen",
            nome: "Jujutsu Kaisen",
            capa: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg"
        }
    ];

    return (
        <section className="w-full min-h-dvh bg-zinc-950 pt-16 sm:pt-20 px-1 lg:px-6">

            <div className="py-4 sm:py-10">

                <div className="flex items-center justify-between gap-2 mb-4 sm:mb-6 px-2">
                    <button
                        onClick={() => navigate(-1)}
                        className="group flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white transition text-xs sm:text-sm cursor-pointer"
                    >
                        <FaChevronLeft className="text-[10px] sm:text-xs group-hover:-translate-x-0.5 transition-transform" />
                        Voltar
                    </button>

                    <span className="px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-300 text-xs sm:text-sm shrink-0">
                        {favoritos.length} favorito(s)
                    </span>
                </div>

                <div className="mb-6 sm:mb-10 bg-zinc-900 rounded-xl p-4 md:p-6 border border-zinc-800 mx-2">
                    <h1 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold text-white tracking-tight">
                        Meus Favoritos
                        <HiOutlineHeart className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-red-500 shrink-0" />
                    </h1>
                    <p className="text-zinc-400 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base leading-relaxed">
                        Aqui estão os animes que você salvou para assistir depois.
                    </p>
                </div>

                <div className="w-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-2.5 sm:gap-5 px-1 sm:px-2 lg:px-6 pb-10">
                    {favoritos.map(anime => (
                        // <Link key={anime.id} to={`/anime/${anime.id_video}`}>

                        <div className="relative rounded-xl bg-zinc-800/80 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 sm:hover:-translate-y-2 hover:bg-zinc-900 hover:shadow-xl hover:shadow-black/40 group h-full flex flex-col justify-between">

                            <div className="absolute top-1.5 left-1.5 z-10 w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm">
                                <HiOutlineHeart className="text-red-500 w-3.5 h-3.5 sm:w-6 sm:h-6" />
                            </div>

                            <div className="aspect-[2/3] overflow-hidden">
                                <img
                                    src={anime.capa}
                                    alt={anime.nome}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            <div className="p-2 sm:p-4">
                                <h3 className="text-white font-bold text-[11px] sm:text-base truncate transition-colors duration-300 group-hover:text-purple-300">
                                    {anime.nome}
                                </h3>
                            </div>

                        </div>

                        // </Link>
                    ))}
                </div>

            </div>

        </section>
    );
}