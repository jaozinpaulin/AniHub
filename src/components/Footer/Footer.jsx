import { FaGithub } from "react-icons/fa"

export default function Footer() {
    return (
        <footer className="border-t border-zinc-800 bg-zinc-950 text-zinc-400">

            <div className="w-full flex items-center justify-center px-6 py-10">

                <div className="flex flex-col items-center gap-6 text-center">

                    <div className="space-y-1">
                        <p className="text-white text-lg font-semibold">
                            AniHub
                        </p>

                        <p className="text-sm text-zinc-400">
                            Versão <span className="text-blue-400">v0.7</span>
                        </p>

                        <p className="text-xs text-emerald-400">
                            ● Sistema Online
                        </p>
                    </div>

                    <div className="max-w-2xl text-xs leading-6 text-zinc-500">
                        Este site não hospeda nenhum vídeo em seus servidores. Todo o conteúdo é fornecido por serviços de terceiros não afiliados. O AniHub atua apenas como um catálogo e interface de navegação.
                    </div>

                    <div className="flex flex-col items-center gap-1 text-sm">
                        <span className="text-zinc-500">
                            Desenvolvido por
                        </span>

                        <p className="font-semibold text-white">
                            João Paulo
                        </p>

                        <a
                            href="https://github.com/jaozinpaulin"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            github.com/jaozinpaulin
                        </a>
                    </div>

                </div>

            </div>

            <div className="border-t border-zinc-800 py-4 text-center text-xs text-zinc-500">
                © 2026 AniHub. Desenvolvido por João Paulo. Todos os direitos reservados.
            </div>

        </footer>
    )
}