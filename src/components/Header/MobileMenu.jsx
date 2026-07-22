import { useState } from "react";
import { NavLink } from "react-router-dom";

import { FiMenu } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";

import MobileAccount from "./MobileAccount";

export default function MobileMenu() {

    const [isOpen, setIsOpen] = useState(false);

    const navLinkMobile = ({ isActive }) =>
        `flex rounded-xl px-4 py-3 text-sm font-medium transition ${isActive
            ? "bg-zinc-600 text-white"
            : "text-zinc-300 hover:bg-zinc-900"
        }`;

    return (
        <div className="relative md:hidden">

            <button
                onClick={() => setIsOpen(prev => !prev)}
                className={`flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/80 text-white shadow-lg transition-all duration-200 hover:bg-zinc-800 active:scale-95 ${!isOpen ? 'block' : 'opacity-0 pointer-events-none '}`}>
                <FiMenu className="text-3xl" />
            </button>

            <div className={`absolute right-0 top-[60px] sm:top-[70px] w-72 origin-top-right overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/95 backdrop-blur-xl shadow-2xl transition-all duration-300 ${isOpen
                ? "visible scale-100 opacity-100"
                : "invisible scale-95 opacity-0"
                }`}>

                <div className="border-b border-zinc-800 px-5 py-4">
                    <h2 className="text-lg font-bold text-white">
                        Menu
                    </h2>

                    <p className="mt-1 text-sm text-zinc-400">
                        Navegue pelo AniHub.
                    </p>

                    <button onClick={() => setIsOpen(prev => !prev)}>
                        <IoIosClose className="absolute top-3 right-3 size-10 text-white  active:scale-85" />
                    </button>
                </div>

                <ul className="space-y-1 p-3">

                    <li>
                        <NavLink to="/" onClick={() => setIsOpen(false)} className={navLinkMobile}>
                            Home
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/explore" onClick={() => setIsOpen(false)} className={navLinkMobile}>
                            Explorar
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/categories" onClick={() => setIsOpen(false)} className={navLinkMobile}>
                            Categorias
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/favorites" onClick={() => setIsOpen(false)} className={navLinkMobile}>
                            Favoritos
                        </NavLink>
                    </li>

                </ul>

                <div className="mx-4 border-t border-zinc-800" />

                <div className="p-4">
                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        Conta
                    </h3>

                    <MobileAccount setIsOpen={setIsOpen} />
                </div>
            </div>

        </div >
    );
}