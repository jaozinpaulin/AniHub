
import imgEmpty from "../../assets/feedback/empty.svg"

interface EmptyStateProps {
    message: string;
    retry: () => void
}

export default function EmptyState({ message, retry }: EmptyStateProps) {

    return (
        <div className=" min-h-[300px] flex flex-col md:flex-row items-center justify-center gap-8 p-6 border border-zinc-800/70 rounded-2xl my-5">

            <img src={imgEmpty} alt="Nenhum resultado encontrado" className="w-64 md:w-80" />
            <div className=" flex flex-col items-center md:items-start text-center md:text-left gap-4">

                <h2 className=" text-2xl font-bold text-white">
                    Nenhum resultado encontrado
                </h2>

                <p className="max-w-mdtext-zinc-400">
                    {message || "Ainda não existem animes disponíveis."}
                </p>

                <button
                    onClick={retry}
                    className=" px-5 py-2 rounded-lg bg-olive-600 text-white hover:bg-olive-700 cursor-pointer transition">
                    Tentar novamente
                </button>

            </div>
        </div>
    )
}