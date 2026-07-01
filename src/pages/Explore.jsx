import { useState, useRef, useEffect } from "react";

import { Link } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa";

/* api */
import animes from '../api/detalhes_animes.json'


export default function Explore() {

    const [loading, setLoading] = useState(true)
    const [carregados, setCarregados] = useState([])

    useEffect(() => {
        setLoading(true)

        setTimeout(() => {
            setCarregados(animes);
            setLoading(false)
        }, 1000)
    }, [])



    const removerAcentos = (texto) => {
        return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }


    // useEffect(() => {

    //     setLoading(true);

    //     setTimeout(() => {
    //         setAnimes(dadosAnimes); // seu array já pronto
    //         setLoading(false);
    //     }, 1000);

    // }, []);
    // const [visible, setIsVisible] = useState(false);
    // const ref = useRef(null);


    // useEffect(() => {
    //     const observer = new IntersectionObserver(
    //         ([entry]) => {
    //             if (entry.isIntersecting) {
    //                 setIsVisible(true)
    //                 observer.unobserve(entry.target)
    //             }

    //         },
    //         {
    //             threshold: 0.2
    //         }
    //     )
    //     if (ref.current) {
    //         observer.observe(ref.current)
    //     }
    //     return () => {
    //         observer.disconnect();
    //     }

    // }, [])




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

    return (
        <section className="max-w-7xl mx-auto min-h-dvh pt-20 bg-zinc-950/90 px-10">

            <div className="pt-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    Explorar
                </h2>

                <p className="text-zinc-400 text-lg max-w-2xl">
                    Descubra novos animes para assistir
                </p>
            </div>

            <div className="relative mt-8">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />

                <input
                    type="text"
                    value={busca}
                    onChange={(e) => buscaSet(e.target.value)}

                    placeholder="Buscar animes, personagens ou gêneros..."
                    className="w-full h-14 bg-zinc-900 border border-zinc-800 rounded-xl pl-12 pr-4 text-white placeholder:text-zinc-500 outline-none
                    focus:border-blue-500 transition"

                />
            </div>

            <div className="w-full flex flex-wrap gap-4 pt-6 pb-10">
                {loading ? (

                    Array.from({ length: 14 }).map((_, i) => (
                        <div key={i} className="animate-pulse px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 w-24 h-10" />))
                ) :
                    (

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
                        ))
                    )}
            </div>

            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 pb-10">

                {loading ? (

                    Array.from({ length: 14 }).map((_, i) => (
                        <div key={i} className="animate-pulse bg-zinc-800 h-72 rounded-xl" />
                    ))

                )
                    :
                    animesFiltrado.sort((a, b) => b.classificacao - a.classificacao).map(a => (
                        <Link key={a.id_video} to={`/anime/${a.id_video}`}>

                            <div className='group  bg-zinc-800 rounded-xl overflow-hidden cursor-pointer hover:bg-zinc-800/65 text-white'>
                                <div className="overflow-hidden">
                                    <img src={a.capa}
                                        alt={'banner do ' + a.nome}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-64 object-cover transition-transform  group-hover:scale-110  duration-300" />
                                </div>
                                <div className="p-2">
                                    <h4 className="font-bold text-lg truncate">
                                        {a.nome}
                                    </h4>

                                </div>
                            </div>
                        </Link>
                    ))}


            </div>


            <div className={`w-full mx-auto ${animesFiltrado.length === 0 ? 'flex' : 'hidden'} flex-col items-center justify-center text-center`}>

                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-6 shadow-lg">
                    <FaSearch className="text-xl text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">
                    Nenhum anime encontrado
                </h2>

                <p className="text-zinc-400 max-w-md">
                    Não encontramos animes com os filtros selecionados.
                    Tente alterar sua pesquisa ou escolher outro gênero.
                </p>
            </div>

        </section >
    )
}
