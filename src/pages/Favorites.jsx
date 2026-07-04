import { Link } from "react-router-dom";
import { animes } from "../api/animes";
import { HiOutlineHeart } from "react-icons/hi2";

import { useState } from 'react';

export default function Favorites() {

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
        <section className="w-full min-h-screen bg-zinc-950 pt-20 px-10">

            <h1 className="text-red-500  text-6xl text-center">Pagina sendo ajustada</h1>
            <div className="py-10">

                <div className="flex items-center justify-between mb-6">
                    <button onClick={() => navigate(-1)} className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white transition">
                        Voltar
                    </button>

                    <span className="px-3 py-2 rounded-lg bg-zinc-800 text-zinc-300 text-sm">
                        {favoritos.length} favorito(s)
                    </span>
                </div>

                <div className="mb-10 bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                    <h1 className="flex items-center gap-3 text-4xl font-bold text-white">
                        Meus Favoritos
                        <HiOutlineHeart className="size-10 text-red-500" />
                    </h1>
                    <p className="text-zinc-400 mt-2">
                        Aqui estão os animes que você salvou para assistir depois.
                    </p>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-5 pb-10 px-6">
                    {favoritos.map(anime => (
                        <Link key={anime.id} to={`/anime/${anime.id_video}`}>

                            <div className="relative rounded-xl bg-zinc-800/80 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:bg-zinc-900 group">

                                <div className="absolute top-2 left-2 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm">
                                    <HiOutlineHeart className="text-red-500 size-6" />
                                </div>

                                <div className="aspect-[2/3] overflow-hidden">
                                    <img
                                        src={anime.capa}
                                        alt={anime.nome}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                <div className="p-3">
                                    <h3 className="text-white font-bold truncate transition-colors duration-300 group-hover:text-purple-300">
                                        {anime.nome}
                                    </h3>
                                </div>

                            </div>

                        </Link>
                    ))}
                </div>

            </div>

        </section>
    )
}



