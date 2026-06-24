import { FaGithub } from "react-icons/fa"

export default function Footer() {
    return (
        <footer className="border-t border-zinc-800 bg-zinc-950 text-zinc-400">

            <div className="w-full flex items-center justify-center px-6 py-10">

                <div className="flex flex-col  md:flex-row items-center md:items-start justify-between gap-10 text-center md:text-left">

                    <div className="max-w-sm">
                        <h3 className="text-white text-lg font-semibold">
                            AniHub
                        </h3>

                        <p className="text-sm mt-2 text-zinc-400">
                            Plataforma criada para explorar animes, trailers e recomendações.
                            Um hub simples para descobrir novos universos.
                        </p>

                        <p className="text-xs mt-3 text-zinc-500">
                            Projeto pessoal • desenvolvido por João Paulo
                        </p>

                        <a
                            href="https://github.com/jaozinpaulin"
                            target="_blank"
                            className="mt-3 inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition"
                        >
                            <FaGithub size={16} />
                            github.com/jaozinpaulin
                        </a>
                    </div>

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