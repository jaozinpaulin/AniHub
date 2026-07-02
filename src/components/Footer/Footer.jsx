import { FaGithub } from "react-icons/fa"

export default function Footer() {
    return (
        <footer className="border-t border-zinc-800 bg-zinc-950 text-zinc-400">

            <div className="w-full flex items-center justify-center px-6 py-10">

                <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 text-center md:text-left w-full max-w-5xl">

                    {/* Disclaimer */}
                    <div className="text-xs text-zinc-500 max-w-xl">
                        Este site não hospeda nenhum vídeo em seu servidor. Todo conteúdo é provido de terceiros não afiliados.
                    </div>

                    {/* Sistema */}
                    <div className="text-sm flex flex-col items-center md:items-end">
                        <p className="text-white font-medium">Sistema</p>

                        <p className="mt-2 text-zinc-400">AniHub v0.1</p>

                        <p className="text-zinc-500 text-xs mt-1">
                            Status: Online
                        </p>
                    </div>

                </div>

            </div>

            <div className="border-t border-zinc-800 py-4 text-center text-xs text-zinc-500">
                © 2026 AniHub • Todos os direitos reservados
            </div>

        </footer>
    )
}