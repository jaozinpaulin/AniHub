import { NavLink } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

export default function Header() {

    const navLinkStyle = ({ isActive }) =>
        `px-4 py-2 rounded-lg text-sm font-medium transition-all border border-transparent duration-300 ${isActive
            ? "bg-blue-700/60 text-white border border-blue-700"
            : "text-zinc-400 hover:text-white hover:bg-zinc-900 hover:border-zinc-700 "
        }`;

    return (
        <header className="fixed top-0 left-0 w-full z-50 border-b border-zinc-900 bg-zinc-950/70 backdrop-blur-md">

            <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-6">

                <NavLink to="/" className="flex items-center hover:opacity-90 transition">
                    <img src="/logoAH.png" alt="AniHub" className="w-14 h-10" />

                    <h1 className="text-[30px] font-medium">
                        <span className="text-zinc-300">ni</span>
                        <span className="text-white">
                            Hub
                        </span>
                    </h1>
                </NavLink>

                <nav>
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

                <div className="flex gap-3">
                    {/* <button
                        className=" flex items-center justify-center w-10 h-10 rounded-xl border border-transparent text-zinc-400 transition-all duration-200 hover:text-white hover:bg-zinc-900/70 hover:border-zinc-700/70 focus:outline-none cursor-pointer">
                        <FiSearch className="text-xl" />
                    </button> */}

                    <input
                        autoFocus
                        placeholder="Buscar animes..."
                        className="w-64 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-white text-sm outline-none"
                    />
                </div>
            </div>
        </header >
    );
}
