import { api } from "../../../api"
import { FaStar, FaHeart } from "react-icons/fa";

const anime = api.animes

/* por hora vou colocar o index da api anime fixo []*/

export default function Hero() {
    return (

        <section className="relative h-[80vh] flex items-end px-6 pb-12 text-white">

            < img
                src="https://images.unsplash.com/photo-1618336753974-aae8e04506aa"
                alt="anime hero"
                className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="relative z-10 max-w-3xl space-y-4">

                <h1 className="text-5xl md:text-6xl font-bold">
                    {anime[4].nome}
                </h1>

                <p className="text-zinc-400 text-lg">
                    進撃の巨人 (Shingeki no Kyojin)
                </p>

                {/* Genres */}
                <div className="flex gap-2 flex-wrap">
                    <span className="px-3 py-1 text-sm bg-zinc-800 rounded-full">Action</span>
                    <span className="px-3 py-1 text-sm bg-zinc-800 rounded-full">Drama</span>
                    <span className="px-3 py-1 text-sm bg-zinc-800 rounded-full">Fantasy</span>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-300">

                    <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-500" />{anime[4].nota} / 10
                    </div>

                    <div>
                        87 episódios
                    </div>

                    <div>
                        MAPPA
                    </div>

                </div>

                <p className="text-zinc-300 leading-relaxed max-w-2xl">
                    A humanidade vive dentro de muralhas para se proteger de criaturas gigantes conhecidas como Titãs.
                    Quando a paz é quebrada, Eren Yeager decide lutar contra eles e descobrir a verdade por trás do mundo.
                </p>

                {/* Buttons */}
                <div className="flex gap-4 pt-2">

                    <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-2xl font-semibold cursor-pointer">
                        Assistir
                    </button>

                    <button className="px-6 py-3 border border-zinc-600 hover:bg-zinc-800/50 hover:border-red-500 rounded-2xl flex items-center gap-2 transition cursor-pointer">
                        <FaHeart className="text-red-500" />
                        Favoritar
                    </button>

                    <button className="px-6 py-3 border border-zinc-600 hover:bg-zinc-800/50 rounded-2xl cursor-pointer">
                        Mais informações
                    </button>

                </div>

            </div>
        </section >
    )
}