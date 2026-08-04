import { useState } from "react";

import { useAuth } from "../../hooks/useAuth";

import ProfileModal from "../ProfileModal/ProfileModal";
import Auth from "../../pages/Auth/Auth.jsx";
import { useToast } from "../../hooks/useToast.js";

interface MobileAccountProps {
    setIsOpen: (value: boolean) => void
}


export default function MobileAccount({ setIsOpen }: MobileAccountProps) {
    const { showToast } = useToast();

    const { user, handleLogout } = useAuth();
    const [openProfile, setOpenProfile] = useState(false);

    const [openAuth, setOpenAuth] = useState(false);
    const [isLogin, setIsLogin] = useState(true);


    async function handleLogoutClick() {
        try {
            await handleLogout();
            showToast(
                "Você saiu da conta.",
                "info"
            );
            setIsOpen(false);

        } catch (error) {

            showToast(
                "Erro ao sair da conta.",
                "error"
            );
        }
    }


    return (
        <>
            {user ? (
                <div className="space-y-4">

                    <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/70 font-bold text-white">
                            {user.email.charAt(0).toUpperCase()}
                        </div>

                        <div className="min-w-0">

                            <h3 className="text-sm font-semibold text-white">
                                Minha conta
                            </h3>
                            <p className="truncate text-xs text-zinc-400">
                                {user.email}
                            </p>

                        </div>
                    </div>

                    <div className="space-y-1">
                        <button
                            onClick={() => setOpenProfile(true)}
                            className="w-full rounded-xl px-3 py-3 text-left text-sm text-zinc-300 transition hover:bg-zinc-800 cursor-pointer">
                            Perfil
                        </button>

                        <button
                            disabled
                            className="w-full cursor-not-allowed rounded-xl px-3 py-3 text-left text-sm text-zinc-500 opacity-60">
                            Configurações (em breve)
                        </button>

                        <button
                            onClick={handleLogoutClick}
                            className="w-full rounded-xl px-3 py-3 text-left text-sm text-red-400 transition hover:bg-zinc-800 cursor-pointer">
                            Sair
                        </button>
                    </div>

                </div>
            ) : (
                <div className="space-y-4">
                    <div>
                        <h3 className="text-base font-semibold text-white">
                            Entre na sua conta
                        </h3>

                        <p className="mt-1 text-sm text-zinc-400">
                            Salve seus favoritos e acompanhe seu progresso.
                        </p>
                    </div>

                    <button
                        onClick={() => { setIsLogin(true); setOpenAuth(true); setIsOpen(false) }}
                        className="w-full rounded-xl border border-zinc-700 px-4 py-3 text-sm text-white transition hover:bg-zinc-900 cursor-pointer">
                        Entrar
                    </button>

                    <button
                        onClick={() => { setIsLogin(false); setOpenAuth(true); setIsOpen(false) }}
                        className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 px-4 py-3 text-sm text-white transition hover:opacity-90 cursor-pointer">
                        Criar conta
                    </button>

                </div>
            )}

            <ProfileModal open={openProfile} setOpen={setOpenProfile} user={user} />
            <Auth open={openAuth} setOpen={setOpenAuth} isLogin={isLogin} setIsLogin={setIsLogin} />
        </>
    );
}