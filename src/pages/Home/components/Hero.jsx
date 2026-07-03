import { FaFire } from "react-icons/fa";
import { Link } from "react-router-dom";


export default function Hero() {
    return (

        <section className="relative flex items-center justify-center min-h-[75vh] overflow-hidden bg-zinc-950">

            {/* Glows */}
            <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-blue-600/20 blur-[120px]" />
            <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-purple-600/20 blur-[120px]" />

            <div className="relative z-10 max-w-4xl text-center px-6">

                <span className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-sm text-zinc-300">
                    <FaFire className="text-orange-500" />

                    Plataforma em desenvolvimento
                </span>

                <h1 className="mt-8 text-5xl md:text-7xl font-black text-white/90 leading-tight">
                    Descubra seu próximo

                    <span className="block bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        anime favorito
                    </span>
                </h1>

                <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto">
                    Explore temporadas, episódios, personagens e informações
                    completas sobre centenas de animes em uma interface moderna,
                    rápida e feita para fãs.
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-4">

                    <Link to={'/explore'}>
                        <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-4 font-semibold hover:bg-blue-700 transition cursor-pointer">
                            Explorar
                        </button>
                    </Link>

                    <Link to={'/categories'}>
                        <button className="rounded-xl border border-zinc-700 text-white px-7 py-4 hover:bg-zinc-900 transition cursor-pointer">
                            Ver Categorias
                        </button>
                    </Link>
                </div>
            </div>

        </section>

    )
}