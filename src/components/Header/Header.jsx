import { NavLink, Link } from "react-router-dom";
import { FiSearch, FiMenu } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";

import animes from '../../services/detalhes_animes.json'
import { useRef, useState, useEffect } from "react";

export default function Header() {
    const [pesquisa, setPesquisa] = useState('')
    const [mostrarResultado, setMostrarResultado] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const cardAnime = useRef(null);

    useEffect(() => {
        function handleClick(evt) {
            if (!cardAnime.current) return;

            if (cardAnime.current && !cardAnime.current.contains(evt.target)) {
                selecionarAnime()
            }
        }

        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);


    const selecionarAnime = () => {
        setPesquisa('');
        setMostrarResultado(false)
    }

    const animesFiltrado = animes.filter(
        ani => ani.nome
            .toLocaleLowerCase()
            .includes(pesquisa.toLocaleLowerCase()))

    /* mobile */
    const navLinkMobile = ({ isActive }) =>
        `block px-5 py-3 transition-all duration-300 rounded-lg  ${isActive
            ? "bg-zinc-700 text-white font-medium"
            : "text-zinc-400 hover:bg-zinc-800/60 hover:text-white"
        }`;
    /* desktop */
    const navLinkStyle = ({ isActive }) =>
        `px-4 py-2 rounded-lg text-sm font-medium transition-all border border-transparent duration-300 ${isActive
            ? "bg-blue-700/60 text-white border border-blue-700"
            : "text-zinc-400 hover:text-white hover:bg-zinc-900 hover:border-zinc-700 "
        }`;




    return (
        <header className="fixed top-0 left-0 w-full z-50 border-b border-zinc-900 bg-zinc-950/70 backdrop-blur-md">

            <div className="w-full lg:max-w-7xl lg:mx-auto h-16 sm:h-20 flex items-center justify-between  px-12">

                <NavLink to="/" className="flex items-center hover:opacity-90 transition">
                    <img src="/logoAH.png" alt="AniHub" className="w-10 h-8 sm:w-14 sm:h-10" />

                    <h1 className="text-2xl lg:text-3xl font-medium">
                        <span className="text-zinc-300">ni</span>
                        <span className="text-white">
                            Hub
                        </span>
                    </h1>
                </NavLink>


                <div className="relative sm:hidden">

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:bg-zinc-800 active:scale-95 text-white shadow-lg transition-all duration-200"
                        aria-label="Menu">
                        {isOpen ? (
                            <IoIosClose className="text-4xl" />
                        ) : (
                            <FiMenu className="text-3xl" />
                        )}
                    </button>

                    <ul
                        className={`absolute top-[70px] space-y-2 right-0 w-64 p-2 rounded-2xl border border-zinc-800 bg-zinc-950/95 backdrop-blur-md shadow-2xl overflow-hidden transition-all duration-300 origin-top-right ${isOpen
                            ? "opacity-100 scale-100 visible"
                            : "opacity-0 scale-95 invisible"
                            }`}>
                        <li>
                            <NavLink to="/" onClick={() => setIsOpen(false)} className={navLinkMobile}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/explore" onClick={() => setIsOpen(false)} className={navLinkMobile}>Explorar</NavLink>
                        </li>
                        <li>
                            <NavLink to="/categories" onClick={() => setIsOpen(false)} className={navLinkMobile}>Categorias</NavLink>
                        </li>
                        <li>
                            <NavLink to="/favorites" onClick={() => setIsOpen(false)} className={navLinkMobile}>Favoritos</NavLink>
                        </li>
                    </ul>

                </div>


                <nav className="hidden sm:block">
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

                <div ref={cardAnime}
                    className="relative hidden lg:block w-72">

                    <input
                        type="text"
                        placeholder="Busque por animes..."
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

                    {mostrarResultado && animesFiltrado.length > 0 && (
                        < div className="absolute top-full left-0 mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden z-50">
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
                                            className="w-12 h-16 rounded-md object-cover shrink-0" />

                                        <div className="flex flex-col text-left overflow-hidden">

                                            <span className="w-full px-0.5 truncate text-sm font-medium shrink-0 text-white">
                                                {ani.nome}
                                            </span>

                                            <div className="flex items-center gap-2 text-xs text-zinc-400 shrink-0">
                                                <span className={`px-1 py-0.5 rounded text-zinc-300 "
                                                        ${ani.generos.includes("Dublado")
                                                        ? "bg-blue-600/80 group-hover:bg-blue-600"
                                                        : "bg-purple-600/80 group-hover:bg-purple-600"
                                                    }`}>
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
                    {animesFiltrado == 0 && (
                        <div className="bg-red-500 ">oi</div>

                    )}


                </div>

            </div>
        </header >
    );
}



/* arruamr o card que nao fecha no click fora, tem que usar useRef */