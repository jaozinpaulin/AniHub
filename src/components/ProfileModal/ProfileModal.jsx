import { useEffect } from "react";
import { createPortal } from "react-dom";
import { FaXmark } from "react-icons/fa6";


export default function ProfileModal({ open, setOpen, user }) {

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [open]);

    if (!open || !user) return null;



    return createPortal(
        <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[9999] grid place-items-center bg-black/60 px-4 backdrop-blur-sm">
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">

                <button
                    onClick={() => setOpen(false)}
                    className="absolute cursor-pointer right-4 top-4 rounded-lg p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white transition">
                    <FaXmark className="size-5.5" />
                </button>

                <div className="flex flex-col items-center">
                    <div className="flex size-16 items-center justify-center rounded-full bg-purple-600 text-2xl font-bold text-white uppercase">
                        {user.email?.charAt(0)}
                    </div>
                    <h2 className="mt-3 text-lg font-semibold text-white">
                        {user.displayName || "Usuário"}
                    </h2>
                    <p className="text-xs text-zinc-400">{user.email}</p>
                </div>

                <div className="mt-6 space-y-3">
                    <div className="rounded-xl border border-zinc-800 bg-zinc-800/50 px-4 py-3">
                        <span className="text-[10px] uppercase font-medium text-zinc-500 tracking-wider">Nome</span>
                        <p className="mt-0.5 text-sm text-zinc-200">{user.displayName || "Não informado"}</p>
                    </div>

                    <div className="rounded-xl border border-zinc-800 bg-zinc-800/50 px-4 py-3">
                        <span className="text-[10px] uppercase font-medium text-zinc-500 tracking-wider">Email</span>
                        <p className="mt-0.5 truncate text-sm text-zinc-200">{user.email}</p>
                    </div>

                    <div className="rounded-xl border border-zinc-800 bg-zinc-800/50 px-4 py-3 flex items-center justify-between">
                        <span className="text-[10px] uppercase font-medium text-zinc-500 tracking-wider">Verificado</span>
                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${user.emailVerified ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                            }`}>
                            {user.emailVerified ? "Sim" : "Não"}
                        </span>
                    </div>
                </div>

                {/* <div className="mt-6 flex gap-2">
                    <button
                        disabled
                        className="flex-1 rounded-lg cursor-not-allowed bg-blue-800/70 py-2 text-sm font-medium text-zinc-400 hover:bg-blue-900  transition">
                        Editar
                    </button>
                    <button
                        onClick={() => setOpen(false)}
                        className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 transition cursor-pointer">
                        Fechar
                    </button>
                </div> */}
            </div>
        </div>,
        document.body
    );
}