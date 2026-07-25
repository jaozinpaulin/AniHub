import { useState, useRef, useEffect } from "react";

import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa";

import { useAnimes } from "../hooks/useAnimes";

import SkeletonLoading from "../components/Skeleton/SkeletonLoading";
import ErrorMessage from "../components/Feedback/ErrorMessage";
import EmptyState from "../components/Feedback/EmptyState";

export default function Explore() {
    const { animes, loading, error, loadAnimes } = useAnimes();

    const location = useLocation();
    const [isExpanded, setIsExpanded] = useState(false);


    const [load, setLoad] = useState(true)
    const [carregados, setCarregados] = useState([])

    useEffect(() => {
        setLoad(true)

        setTimeout(() => {
            setCarregados(animes);
            setLoad(false)
        }, 1000)
    }, [])

    const removerAcentos = (texto) => {
        return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    const [busca, buscaSet] = useState('')
    const [gene, geneSet] = useState('Todos')

    const generosUnicos = ['Todos',
        ...new Set(animes.flatMap(anime => anime.generos)
            .filter(ge =>
                !ge.startsWith('Letra')))]


    const animesFiltrado = animes.filter(ani => {

        const inputFilter = busca === '' || ani.nome.toLowerCase().includes(busca.toLowerCase())
        const generoFilter = gene === 'Todos' || ani.generos.some(g => g.toLowerCase().includes(gene.toLowerCase()))

        return inputFilter && generoFilter
    })

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
                <ErrorMessage message={error} retry={loadAnimes} />
            </div>
        )
    }


    if (animes.length === 0) {
        return (
            <div className="space-y-3 p-10 pt-32">
                <div className="space-y-2 animate-pulse">
                    <div className=" h-8 w-52 rounded-lg bg-zinc-800" />


                    <div className=" h-4 w-80 max-w-full rounded-lg bg-zinc-800" />
                </div>

                <div className=" w-full h-12 rounded-xl bg-zinc-800 animate-pulse" />
                <div className=" w-full h-20 rounded-xl flex items-center justify-center bg-zinc-800 animate-pulse">
                    <span className=" text-zinc-500 text-sm text-center">
                        Não foi possível carregar
                    </span>
                </div>

                <EmptyState message={error} retry={loadAnimes} />
            </div>
        )
    }



    return (
        <section className="w-full min-h-dvh pt-16 sm:pt-20 bg-zinc-950/90  xl:px-5">

            <div className="sm:pt-10 sm:mx-3">
                <h2 className="hidden sm:block text-3xl md:text-4xl font-bold text-white mb-3">
                    Explorar
                </h2>

                <p className="bg-blue-900/50 p-2 text-center sm:text-left sm:bg-transparent sm:p-0  text-white sm:text-zinc-400  sm:text-lg max-w-2xl">
                    Descubra novos animes para assistir
                </p>
            </div>

            <div className="relative mx-3 mt-3 sm:my-8">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />

                <input
                    type="text"
                    value={busca}
                    onChange={(e) => buscaSet(e.target.value)}

                    placeholder="Busque por animes"
                    className="w-full h-10 sm:h-14 bg-zinc-900 border border-zinc-800 rounded-xl pl-12 pr-4 text-white placeholder:text-zinc-500 outline-none
                    focus:border-blue-500 transition"/>
            </div>

            <p
                className={`sm:hidden p-3 font-bold text-white ${animesFiltrado.length > 0 ? "block" : "hidden"}`}>
                Explore
            </p>

            <div className="w-full  flex-wrap gap-4 hidden 2xl:flex  mx-3 pb-10">
                {
                    generosUnicos.map((g) => (
                        <button
                            key={g}
                            type="button"
                            onClick={() => geneSet(g)}
                            className={`border rounded-xl px-4 py-2 transition-all duration-300 cursor-pointer font-medium ${gene === g
                                ? 'bg-blue-500/5 border-blue-500 text-blue-400'
                                : 'bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800 hover:border-blue-500'}`}>
                            {g}
                        </button>
                    ))}
            </div>

            <div className="w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-8 gap-4 pb-10 px-2 xl:px-6">
                {[...animesFiltrado].toReversed().map(a => (
                    <Link key={a.id_video} state={{ from: location.pathname }} to={`/anime/${a.id_video}`}>
                        <div className=" bg-zinc-800 rounded-xl overflow-hidden cursor-pointer text-white transition-all duration-300 hover:-translate-y-2 hover:bg-zinc-800/60 hover:shadow-xl hover:shadow-black/40">

                            <div className="relative aspect-[2/3] overflow-hidden">
                                <img src={a.capa} alt={`banner do ${a.nome}`} loading="lazy" decoding="async" className="w-full h-full object-cover" />

                                <span
                                    className={`absolute top-2 left-2 px-2 py-1 rounded-md text-[10px] sm:text-xs font-medium text-white ${a.generos.includes("Dublado")
                                        ? "bg-blue-800"
                                        : "bg-purple-800"
                                        }`}
                                >
                                    {a.generos.includes("Dublado") ? "Dublado" : "Legendado"}
                                </span>
                            </div>

                            <div className="p-2">
                                <h4 className="font-bold text-sm truncate">
                                    {a.nome}
                                </h4>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>


            <div className={`w-full mx-auto px-3 ${animesFiltrado.length === 0 ? 'flex' : 'hidden'} flex-col items-center justify-center text-center`}>

                <div className="w-12 h-12  sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-6 shadow-lg">
                    <FaSearch className="text-lg sm:text-xl text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    Nenhum anime encontrado
                </h2>

                <p className="text-zinc-400/70 text-sm sm:text-lg max-w-md">
                    Não encontramos animes com os filtros selecionados.
                    Tente alterar sua pesquisa.
                </p>
            </div>

        </section >
    )
}



/* ajustar os generos para telas menores */