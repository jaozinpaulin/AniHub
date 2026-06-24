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
                    <ul className="flex gap-6 text-sm text-zinc-300">
                        <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                        <li><Link to="/explore" className="hover:text-white transition">Explorar</Link></li>
                        <li><Link to="/categories" className="hover:text-white transition">Categorias</Link></li>
                        <li><Link to="/popular" className="hover:text-white transition">Populares</Link></li>
                        <li><Link to="/favorites" className="hover:text-white transition">Favoritos</Link></li>
                    </ul>
                </nav>

                <button className="text-zinc-300 hover:text-white transition text-xl cursor-pointer">
                    <FiSearch />
                </button>

            </div>
        </header>
    );
}
