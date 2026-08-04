import imgErro from "../../assets/feedback/error.svg"

interface ErrorMessageProps {
    message: string;
    retry: () => void
}

export default function ErrorMessage({ message, retry }: ErrorMessageProps) {

    return (
        <div className="min-h-[300px] flex flex-col md:flex-row items-center justify-center gap-8 p-6 border border-zinc-800/80 rounded-2xl my-5">
            <img src={imgErro} alt="Erro ao carregar" className="w-64 md:w-80" />

            <div className=" flex flex-col items-center md:items-start text-center md:text-left gap-4">

                <h2 className=" text-xl font-bold text-white">
                    Ops! Algo deu errado.
                </h2>


                <p className="text-zinc-400 max-w-md">
                    {message}
                </p>

                <button onClick={retry} className=" px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 cursor-pointer  transition">
                    Tentar novamente
                </button>

            </div>
        </div>
    )
}