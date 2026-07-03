import { FaGithub } from "react-icons/fa"

export default function Footer() {
    return (
        <footer className="border-t border-zinc-800 bg-zinc-950 text-zinc-400">

            <div className="w-full flex items-center justify-center px-6 py-10">

                <div className="flex flex-col gap-2 text-center">

                    <div className="text-sm flex items-center gap-2 flex-col">
                        <p className="text-white font-medium">Sistema</p>

                        <p className="text-zinc-400">AniHub v0.5</p>

                        <p className="text-zinc-500 text-xs">
                            Status: Online
                        </p>
                    </div>

                    <div className="text-xs text-zinc-500 max-w-xl">
                        Este site não hospeda nenhum vídeo em seu servidor. Todo conteúdo é provido de terceiros não afiliados.
                    </div>
                </div>

            </div>

            <div className="border-t border-zinc-800 py-4 text-center text-xs text-zinc-500">
                © 2026 AniHub • Todos os direitos reservados
            </div>

        </footer>
    )
}