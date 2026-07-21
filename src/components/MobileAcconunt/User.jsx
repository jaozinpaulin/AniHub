import { useEffect, useRef, useState } from "react";

import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";

import { useAuth } from "../../hooks/useAuth"
import ProfileModal from "../ProfileModal/ProfileModal";
import Auth from "../../pages/Auth/index.jsx";

export default function User() {

    const { user, handleLogout } = useAuth()
    const [openUser, setOpenUser] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);

    const cardOpen = useRef(null);

    const [openAuth, setOpenAuth] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const styleArrow = `text-zinc-400 transition-transform ${openUser ? "rotate-180" : ""}`

    const toggleUserMenu = () => {
        setOpenUser(prev => !prev)
    }
    useEffect(() => {

        function handleClick(evt) {

            if (!cardOpen.current) return;

            if (!cardOpen.current.contains(evt.target)) {
                setOpenUser(false)
            }
        }

        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };

    }, []);

    return (
        <>
            {user ? (

                <div
                    ref={cardOpen}
                    onClick={toggleUserMenu}
                    className="relative flex items-center gap-3 select-none">
                    <div className=" flex cursor-pointer items-center gap-2 rounded-ful l p-1 transition hover:bg-zinc-800">

                        <div className=" flex size-10 items-center justify-center rounded-full bg-purple-500/70 font-bold text-white">
                            {user.email.charAt(0).toUpperCase()}
                        </div>

                        <span className=" hidden max-w-32 truncate text-sm font-medium text-white xl:block">
                            {user.email}
                        </span>

                        <FiChevronDown className={`hidden text-zinc-400 transition xl:block ${styleArrow}`} />
                    </div>


                    {openUser && (
                        <div
                            className=" absolute right-0 top-14 w-56 rounded-2xl border border-zinc-800 bg-zinc-900 p-3 shadow-xl">
                            <button
                                onClick={() => setOpenProfile(true)}
                                className=" w-full rounded-xl px-3 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-800">
                                Perfil
                            </button>

                            <button
                                disabled
                                className=" w-full cursor-not-allowed rounded-xl px-3 py-2 text-left text-sm text-zinc-500 opacity-60">
                                Configurações (em breve)
                            </button>

                            <button
                                onClick={handleLogout}
                                className=" mt-2 w-full rounded-xl px-3 py-2 text-left text-sm text-red-400 hover:bg-zinc-800">
                                Sair
                            </button>

                        </div>
                    )}

                </div>

            ) : (

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => {
                            setIsLogin(true);
                            setOpenAuth(true);
                        }}
                        className="  rounded-xl border border-transparent px-3 py-2  text-white  transition  hover:bg-zinc-900 hover:border-zinc-600 cursor-pointer">
                        Entrar
                    </button>


                    <button
                        onClick={() => {
                            setIsLogin(false);
                            setOpenAuth(true);
                        }}
                        className=" rounded-xl bg-linear-to-r from-purple-600 to-blue-500 opacity-90  hover:opacity-100 px-4 py-2 text-white transition hover:bg-purple-700 cursor-pointer">
                        Criar conta
                    </button>
                </div>
            )}

            <ProfileModal open={openProfile} setOpen={setOpenProfile} user={user} />
            <Auth open={openAuth} setOpen={setOpenAuth} isLogin={isLogin} setIsLogin={setIsLogin} />

        </>
    )
}