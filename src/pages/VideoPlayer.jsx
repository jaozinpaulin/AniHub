import { useState, useEffect } from "react";

export function VideoPlayer({ realAnimeId, temporadaAtual, episodioAtual, isTheaterMode }) {
    const [playerHtml, setPlayerHtml] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        // Reset do estado a cada mudança de ep/temporada
        setIsLoaded(false);
        setError(false);
        setPlayerHtml("");

        const fetchPlayerContent = async () => {
            if (!realAnimeId || !temporadaAtual || !episodioAtual) return;

            try {
                // Requisição para a Serverless Function na Vercel
                const response = await fetch(
                    `/api/playerProxy?animeId=${realAnimeId}&temp=${temporadaAtual}&ep=${episodioAtual}`
                );

                if (!response.ok) {
                    throw new Error("Erro na resposta do proxy");
                }

                // Recebe o HTML puro retornado pelo servidor
                const htmlContent = await response.text();
                setPlayerHtml(htmlContent);
            } catch (err) {
                console.error("Erro ao carregar o player via proxy:", err);
                setError(true);
            }
        };

        fetchPlayerContent();
    }, [realAnimeId, temporadaAtual, episodioAtual]);

    return (
        <div
            className={`w-full bg-black flex items-center justify-center transition-all duration-300 ${isTheaterMode
                ? "h-[75vh] md:h-[80vh] max-h-[calc(100vh-100px)] border-y border-zinc-800/80 shadow-2xl"
                : "aspect-video rounded-xl border border-zinc-800 overflow-hidden shadow-2xl"
                }`}
        >
            <div className="relative w-full h-full flex items-center justify-center aspect-video max-w-full">
                {playerHtml && (
                    <iframe
                        srcDoc={playerHtml} // Injecta o HTML diretamente no iframe
                        className="w-full h-full border-0"
                        title="Player de Video"
                        scrolling="no"
                        allowFullScreen
                        onLoad={() => setIsLoaded(true)}
                    />
                )}

                {/* Feedback de Carregamento */}
                {!isLoaded && !error && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 gap-3 z-10">
                        <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                        <span className="text-zinc-400 text-sm font-medium">Carregando player...</span>
                    </div>
                )}

                {/* Trata eventuais erros de requisição */}
                {error && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 gap-2 z-10 text-red-400">
                        <span className="text-sm font-medium">Não foi possível carregar o vídeo.</span>
                        <span className="text-xs text-zinc-500">Tente recarregar a página.</span>
                    </div>
                )}
            </div>
        </div>
    );
}