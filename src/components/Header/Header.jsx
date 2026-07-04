import { NavLink, Link } from "react-router-dom";
import { FiSearch, FiMenu } from "react-icons/fi";

import animes from '../../api/detalhes_animes.json'
import { useState } from "react";

export default function Header() {
    const [pesquisa, setPesquisa] = useState('')
    const [mostrarResultado, setMostrarResultado] = useState(false);

    const selecionarAnime = (anime) => {
        setPesquisa('');
        setMostrarResultado(false)
    }

    const animesFiltrado = animes.filter(
        ani => ani.nome
            .toLocaleLowerCase()
            .includes(pesquisa.toLocaleLowerCase()))


    const navLinkStyle = ({ isActive }) =>
        `px-4 py-2 rounded-lg text-sm font-medium transition-all border border-transparent duration-300 ${isActive
            ? "bg-blue-700/60 text-white border border-blue-700"
            : "text-zinc-400 hover:text-white hover:bg-zinc-900 hover:border-zinc-700 "
        }`;

    return (
        <header className="fixed top-0 left-0 w-full z-50 border-b border-zinc-900 bg-zinc-950/70 backdrop-blur-md">

            <div className=":w-full lgmax-w-7xl lg:mx-auto h-20 flex items-center justify-around  px-6">

                <NavLink to="/" className="flex items-center hover:opacity-90 transition">
                    <img src="/logoAH.png" alt="AniHub" className="w-10 h-8 sm:w-14 sm:h-10" />

                    <h1 className="text-2xl lg:text-3xl font-medium">
                        <span className="text-zinc-300">ni</span>
                        <span className="text-white">
                            Hub
                        </span>
                    </h1>
                </NavLink>

                <FiMenu className="text-2xl text-white md:hidden block " />

                <nav className="hidden md:block">
                    <ul className="flex items-center gap-2 text-sm">

                        <li>
                            <NavLink to="/" className={navLinkStyle}>
                                Home
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/explore" className={navLinkStyle}>
                                Explorar
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/categories" className={navLinkStyle}>
                                Categorias
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/favorites" className={navLinkStyle}>
                                Favoritos
                            </NavLink>
                        </li>

                    </ul>
                </nav>

                {/* input pesquisa */}

                <div className="relative hidden lg:block w-72">

                    <input
                        type="text"
                        placeholder="Buscar animes..."
                        value={pesquisa}
                        onChange={(evt) => {
                            setPesquisa(evt.target.value)
                            setMostrarResultado(evt.target.value.trim() !== '')
                        }}
                        className="w-full h-10 rounded-xl border border-zinc-700 bg-zinc-900 pl-4 pr-11 text-sm text-white outline-none transition-all duration-200 placeholder:text-zinc-500 focus:border-blue-500/70" />

                    <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center text-zinc-400">
                        <FiSearch className="text-lg" />
                    </button>

                    {/* resultado/anime */}
                    {mostrarResultado && animesFiltrado.length > 0 && (
                        <div className="absolute top-full left-0 mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden z-50">

                            {mostrarResultado &&

                                animesFiltrado.slice(0, 3).map(ani => (
                                    <Link
                                        key={ani.id_video}
                                        to={`/anime/${ani.id_video}`}
                                        onClick={selecionarAnime}
                                        className="flex w-full items-center gap-3 px-3 py-3 hover:bg-zinc-800 transition-colors">

                                        <img
                                            src={ani.capa}
                                            alt=""
                                            className="w-12 h-16 rounded-md object-cover" />

                                        <div className="flex flex-col text-left overflow-hidden">

                                            <span className="w-full truncate text-sm font-medium text-white">
                                                {ani.nome}
                                            </span>

                                            <div className="flex items-center gap-2 text-xs text-zinc-400">
                                                <span>
                                                    {ani.generos.includes("Dublado") ? "Dublado" : "Legendado"}
                                                </span>

                                                <span>•</span>

                                                <span>
                                                    {ani.total_episodios_geral} episódios
                                                </span>
                                            </div>
                                        </div>
                                    </Link>

                                ))}

                        </div>
                    )}


                </div>

            </div>
        </header >
    );
}
