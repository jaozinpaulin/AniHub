import { FaBorderAll } from "react-icons/fa";
import { FaGrip } from "react-icons/fa6";

import { Link } from "react-router-dom";

import animes from "../../api/detalhes_animes.json";
import corGenero from '../../api/generos.json'



const generosUnicos = [...new Set(animes.flatMap(ani => ani.generos).filter(a => !a.startsWith('Letra')))]


export default function Categories() {
    return (<section className="w-full min-h-dvh pt-20 px-6 bg-zinc-950">

        <div className="w-full px-6">
            <div className="pt-10">

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    Categorias
                </h2>

                <p className="text-zinc-400 text-lg max-w-2xl">
                    Navegue pelos gêneros e encontre seu próximo anime favorito
                </p>

            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 py-10">
                {generosUnicos.map(gen => {

                    const animeLength = animes.filter(
                        gene => gene.generos.includes(gen)).length;

                    const generoAtual =
                        corGenero.find(g => g.nome === gen) || {
                            bg: "bg-zinc-900",
                            border: "border-zinc-800",
                            hover: "hover:border-zinc-700"
                        };

                    return (
                        <Link key={gen} to={`/categories/${gen}`} className="group">

                            <div className={`relative overflow-hidden h-full min-h-[150px] flex flex-col justify-between p-5 rounded-2xl border transition-all duration-300 ease-out cursor-pointer backdrop-blur-md bg-zinc-900/80 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:shadow-black/40 ${generoAtual.bg} ${generoAtual.border} ${generoAtual.hover}`}>

                                <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300 bg-gradient-to-br from-white to-transparent" />

                                <div className="flex items-center justify-between z-10">
                                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                                        <FaGrip className="text-lg text-zinc-400 group-hover:text-white transition-colors" />
                                    </div>

                                    <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-zinc-800/80 text-zinc-300 border border-zinc-700/40">
                                        {animeLength}
                                    </span>
                                </div>

                                <div className="z-10 mt-4">
                                    <h3 className="text-base sm:text-lg font-bold text-zinc-100 group-hover:text-white transition-colors">
                                        {gen}
                                    </h3>

                                    <p className="text-xs text-zinc-400 mt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                                        Explorar coleção
                                    </p>
                                </div>

                            </div>

                        </Link>
                    );
                })}

            </div>

        </div>

    </section>
    )
}