import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full z-50 border-b border-zinc-900 bg-zinc-950/70 backdrop-blur-md">
            <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-6">

                <Link to="/" className="hover:opacity-90 transition">
                    <h1 className="text-3xl font-bold">
                        <span className="text-white">Ani</span>
                        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                            Hub
                        </span>
                    </h1>
                </Link>

                <nav>
                    <ul className="flex items-center gap-3 text-sm">

                        <Link
                            to="/"
                            className="px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all duration-300">
                            <li>Home</li>
                        </Link>

                        <Link
                            to="/explore"
                            className="px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all duration-300">
                            <li>Explorar</li>
                        </Link>

                        <Link
                            to="/categories"
                            className="px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all duration-300">
                            <li>Categorias</li>
                        </Link>

                        <Link
                            to="/favorites"
                            className="px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all duration-300">
                            <li>Favoritos</li>
                        </Link>

                    </ul>
                </nav>

                <button className="text-zinc-300 hover:text-white transition text-xl cursor-pointer">
                    <FiSearch />
                </button>

            </div>
        </header>
    );
}
