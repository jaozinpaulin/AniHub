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
        <div onClick={() => setOpen(false)}
            className="fixed inset-0 z-[9999] grid place-items-center bg-black/60 px-4 backdrop-blur-sm">

            <div onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-5 md:p-6 shadow-2xl">

                <button onClick={() => setOpen(false)}
                    className="absolute right-4 top-4 rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white cursor-pointer">
                    <FaXmark className="size-5" />
                </button>

                <div className="flex flex-col items-center">
                    <div className="flex size-14 md:size-16 items-center justify-center rounded-full border border-purple-400/30 bg-purple-600 font-bold text-xl text-white uppercase">
                        {user.email?.charAt(0)}
                    </div>
                    <h2 className="mt-4 text-xl font-bold text-white">
                        {user.displayName || "Usuário"}
                    </h2>
                    <p className="mt-1 text-sm text-zinc-400 truncate">
                        {user.email}
                    </p>
                </div>

                <div className="mt-7 space-y-4">

                    <div className="rounded-xl border border-zinc-700 bg-zinc-950/40 px-4 py-3">
                        <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                            Nome
                        </span>

                        <p className="mt-1 text-sm text-zinc-200">
                            {user.displayName || "Não informado"}
                        </p>
                    </div>

                    <div className="rounded-xl border border-zinc-700 bg-zinc-950/40 px-4 py-3">
                        <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                            Email
                        </span>

                        <p className="mt-1 truncate text-sm text-zinc-200">
                            {user.email}
                        </p>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-zinc-700 bg-zinc-950/40 px-4 py-3">
                        <div>
                            <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                                Verificado
                            </span>
                        </div>

                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${user.emailVerified
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-amber-500/10 text-amber-400"
                            }`}>
                            {user.emailVerified ? "Sim" : "Não"}
                        </span>
                    </div>

                </div>

            </div>
        </div>,
        document.body
    );
}