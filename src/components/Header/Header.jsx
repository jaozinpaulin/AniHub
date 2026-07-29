import { NavLink, Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import User from "./User";
import MobileMenu from "./MobileMenu";
import { useRef, useState, useEffect } from "react";
import { searchAnimesByName } from "../../services/animes";

export default function Header() {
    const [pesquisa, setPesquisa] = useState('');
    const [resultados, setResultados] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mostrarResultado, setMostrarResultado] = useState(false);

    const cardAnime = useRef(null);

    // Click Outside para fechar o dropdown
    useEffect(() => {
        function handleClick(evt) {
            if (cardAnime.current && !cardAnime.current.contains(evt.target)) {
                selecionarAnime();
            }
        }
        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    useEffect(() => {
        const texto = pesquisa.trim();

        const termo = texto
            ? texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase()
            : "";

        if (termo.length < 1) {
            setResultados([]);
            setMostrarResultado(false);
            return;
        }

        setLoading(true);

        const timer = setTimeout(async () => {
            const data = await searchAnimesByName(termo, 4);

            setResultados(data);
            setMostrarResultado(true);
            setLoading(false);
        }, 400);

        return () => clearTimeout(timer);
    }, [pesquisa]);

    const selecionarAnime = () => {
        setPesquisa('');
        setResultados([]);
        setMostrarResultado(false);
    };


    const navLinkStyle = ({ isActive }) =>
        `px-4 py-2 rounded-lg text-sm font-medium transition-all border border-transparent duration-300 ${isActive
            ? "bg-blue-700/60 text-white border border-blue-700"
            : "text-zinc-400 hover:text-white hover:bg-zinc-900 hover:border-zinc-700"
        }`;

    return (
        <header className="fixed top-0 left-0 w-full z-50 border-b border-zinc-900 bg-zinc-950/70 backdrop-blur-md">
            <div className="w-full  h-16 sm:h-20 flex items-center justify-between lg:justify-around px-4 lg:px-8">
                <NavLink to="/" className="flex items-center hover:opacity-90 transition">
                    <img src="/logoAH.png" alt="AniHub" className="w-10 h-8 sm:w-14 sm:h-10" />

                    <h1 className="text-2xl lg:text-3xl font-medium">
                        <span className="text-zinc-300">ni</span>
                        <span className="text-white">Hub</span>
                    </h1>
                </NavLink>

                <MobileMenu />

                <nav className="hidden md:block">
                    <ul className="flex items-center gap-2 text-sm">
                        <li><NavLink to="/" className={navLinkStyle}>Home</NavLink></li>
                        <li><NavLink to="/explore" className={navLinkStyle}>Explorar</NavLink></li>
                        <li><NavLink to="/categories" className={navLinkStyle}>Categorias</NavLink></li>
                        <li><NavLink to="/favorites" className={navLinkStyle}>Favoritos</NavLink></li>
                    </ul>
                </nav>

                {/* Input Pesquisa */}
                <div ref={cardAnime} className="relative hidden xl:block w-72">
                    <input
                        type="text"
                        placeholder="Busque por animes..."
                        value={pesquisa}
                        onChange={(evt) => setPesquisa(evt.target.value)}
                        className="w-full h-10 rounded-xl border border-zinc-700 bg-zinc-900 pl-4 pr-11 text-sm text-white outline-none transition-all duration-200 placeholder:text-zinc-500 focus:border-blue-500/70"
                    />

                    <button className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center text-zinc-400">
                        <FiSearch className="text-lg" />
                    </button>

                    {/* Dropdown de resultados */}
                    {mostrarResultado && (
                        <div className="absolute top-full left-0 mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden z-50">
                            {pesquisa.trim().length < 2 ? (
                                <div className="p-4 text-center text-sm text-zinc-400">
                                    Digite pelo menos <span className="font-semibold text-white">2 caracteres</span>.
                                </div>
                            ) : loading ? (
                                <div className="p-4 text-center text-sm text-zinc-500">
                                    Buscando...
                                </div>
                            ) : resultados.length > 0 ? (
                                resultados.map((ani) => {
                                    const isDublado = ani.generos?.includes("Dublado");
                                    const animeId = ani.id_video || ani.id;

                                    return (
                                        <Link
                                            key={animeId}
                                            to={`/anime/${animeId}`}
                                            onClick={selecionarAnime}
                                            className="flex w-full items-center gap-3 px-3 py-3 hover:bg-zinc-800 transition-colors group"
                                        >
                                            <img
                                                src={ani.capa}
                                                alt={ani.nome}
                                                className="w-12 h-16 rounded-md object-cover shrink-0"
                                            />

                                            <div className="flex flex-col text-left overflow-hidden">
                                                <span className="w-full px-0.5 truncate text-sm font-medium text-white">
                                                    {ani.nome}
                                                </span>

                                                <div className="flex items-center gap-2 mt-1 text-xs text-zinc-400">
                                                    <span
                                                        className={`px-1 py-0.5 rounded text-[10px] font-bold text-zinc-100 ${isDublado
                                                            ? "bg-blue-600/80 group-hover:bg-blue-600"
                                                            : "bg-purple-600/80 group-hover:bg-purple-600"
                                                            }`}
                                                    >
                                                        {isDublado ? "Dublado" : "Legendado"}
                                                    </span>

                                                    <span>•</span>

                                                    <span>
                                                        {ani.total_episodios_geral || 0} episódios
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })
                            ) : (
                                <div className="p-4 text-center text-sm text-zinc-400">
                                    Nenhum anime encontrado.
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="hidden md:flex">
                    <User />
                </div>
            </div>
        </header>
    );
}