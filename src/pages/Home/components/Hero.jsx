import { FaFire } from "react-icons/fa";
import { Link } from "react-router-dom";


export default function Hero() {
    return (

        <section className="relative flex items-center justify-center min-h-[50dvh] md:min-h-[75dvh] pt-24 pb-5 md:pt-10 overflow-hidden bg-zinc-950">

            <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-blue-600/20 blur-[120px]" />
            <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-purple-600/20 blur-[120px]" />

            <div className="relative z-10 max-w-4xl text-center px-4 sm:px-6 w-full">

                <span className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-xs sm:text-sm font-medium text-zinc-300 whitespace-nowrap mb-2">
                    <FaFire className="text-orange-500 text-sm shrink-0" />
                    Plataforma em desenvolvimento
                </span>

                <h1 className="mt-4 sm:mt-8 text-4xl sm:text-6xl md:text-7xl font-black text-white/90 leading-tight tracking-tight">
                    Descubra seu próximo
                    <span className="block sm:inline md:block bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        {" "}anime favorito
                    </span>
                </h1>

                <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed px-1 sm:px-0">
                    Explore temporadas, episódios, personagens e informações
                    completas sobre centenas de animes em uma interface moderna,
                    rápida e feita para fãs.
                </p>

                <div className="mt-8 sm:mt-12 flex flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto">

                    <Link to={'/explore'} className="flex-1">
                        <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3.5 sm:px-7 sm:py-4 text-base font-bold text-white hover:bg-blue-700 active:scale-98 transition-all cursor-pointer whitespace-nowrap shadow-lg shadow-blue-600/10">
                            Explorar
                        </button>
                    </Link>

                    <Link to={'/categories'} className="flex-1">
                        <button className="w-full flex items-center justify-center rounded-xl border border-zinc-700 text-white px-4 py-3.5 sm:px-7 sm:py-4 text-base font-bold hover:bg-zinc-900 active:scale-98 transition-all cursor-pointer whitespace-nowrap">
                            Categorias
                        </button>
                    </Link>

                </div>
            </div>

        </section>

    )
} 