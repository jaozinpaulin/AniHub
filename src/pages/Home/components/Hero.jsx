import { FaFire } from "react-icons/fa";
import { Link } from "react-router-dom";


export default function Hero() {
    return (

        <section className="relative justify-center overflow-hidden bg-zinc-950">

            <div className="absolute block sm:hidden inset-0 bg-zinc-950/60 z-10"></div>
            <div className="absolute inset-y-0 right-0 w-full pointer-events-none">

                <div className="absolute inset-0 bg-[url('/banner1.png')] bg-cover bg-no-repeat bg-right"></div>
                <div className="absolute inset-y-0 left-0 w-32 sm:w-48 bg-gradient-to-r from-zinc-950 to-transparent"></div>
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-zinc-950 to-transparent"></div>

            </div>

            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none"></div>
            <div className="relative z-20 max-w-3xl pt-10 md:pt-6 text-center mx-auto md:text-left md:mx-0">

                <span className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/70 px-2 py-1 md:py-2 text-xs sm:text-sm font-medium text-zinc-300 whitespace-nowrap">
                    <FaFire className="text-orange-500 text-sm" />
                    Plataforma em desenvolvimento
                </span>

                <h1 className="mt-4 sm:mt-2 text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl font-black p-2 sm:p-0 text-zinc-200 leading-tight tracking-tight">
                    Descubra seu próximo
                    <span className="block sm:inline md:block bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        anime favorito
                    </span>
                </h1>

                <p className="max-w-md mt-3 sm:mt-4 text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg 2xl:text-xl text-zinc-400 leading-relaxed mx-auto md:mx-0">
                    Descubra novos animes, explore títulos incríveis e acompanhe tudo em um só lugar.
                </p>

                <div className="mt-3 sm:mt-6 flex flex-row gap-3 sm:gap-4 w-full max-w-xs mx-auto justify-center md:max-w-min md:mx-0 md:justify-start">

                    <Link to={'/explore'} className="flex-1">
                        <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-3 sm:px-4 sm:py-2 lg:py-3 lg:px-5 text-xs sm:text-sm lg:text-base font-bold text-zinc-200 hover:text-white hover:bg-blue-700 hover:from-purple-500 hover:to-blue-500  transition-colors duration-300 active:scale-98 transition-all cursor-pointer whitespace-nowrap shadow-lg shadow-blue-600/10">
                            Explorar Animes
                        </button>
                    </Link>

                    <Link to={'/categories'} className="flex-1">
                        <button className="w-full flex items-center justify-center rounded-xl border border-zinc-700 text-white px-4 py-3 sm:px-4 sm:py-2 lg:py-3 lg:px-5 text-xs sm:text-sm lg:text-base font-bold hover:bg-zinc-900 active:scale-98 transition-all cursor-pointer whitespace-nowrap">
                            Ver Categorias
                        </button>
                    </Link>

                </div>
            </div>

        </section>

    )
} 