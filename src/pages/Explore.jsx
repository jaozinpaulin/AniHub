import { useState } from "react";

import { Link } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa";


/* api */
import { animes } from "../api/animes";




export default function Explore() {

    const [busca, buscaSet] = useState('')
    const [gene, geneSet] = useState('Todos')

    const animesFiltrado = animes.filter(ani => {

        const inputFilter = busca === '' || ani.nome.toLowerCase().includes(busca.toLowerCase())
        const generoFilter = gene === 'Todos' || ani.genero.toLowerCase().includes(gene.toLowerCase())

        return inputFilter && generoFilter
    })

    const generosUnicos = ['Todos', ...new Set(animes.map(g => g.genero))]
    // console.log(generosUnicos)

    return (
        <section className="w-full pt-20 bg-zinc-950 px-6">


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

                {generosUnicos.map((g, i) => (
                    <button
                        key={i}
                        onClick={() => geneSet(g)}
                        className={`border rounded-xl px-4 py-2 transition-all duration-300 cursor-pointer font-medium ${gene === g
                            ? 'bg-blue-500/5 border-blue-500 text-blue-400'
                            : 'bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800 hover:border-blue-500'}`}>
                        {g}
                    </button>
                ))}


            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 pb-30">

                {animesFiltrado.map(a => (

                    <div className="group  bg-zinc-800 rounded-xl overflow-hidden cursor-pointer hover:bg-zinc-800/65 text-white" key={a.id}>
                        <div className="overflow-hidden">
                            <img src={a.imagem}
                                alt={'banner do ' + a.nome}
                                className="w-full h-64 object-cover transition-transform  group-hover:scale-110  duration-300" />
                        </div>
                        <div className="p-4">
                            <h4 className="font-bold text-lg truncate">
                                {a.nome}
                            </h4>

                            <p className="text-zinc-400 text-sm mt-1">
                                {a.genero}
                            </p>
                        </div>
                    </div>
                ))}

            </div>

        </section >
    )
}

/* colocar tratamento pra noa encontrar  o genero */
/* colocar aninacao na lupa de pesquisa */