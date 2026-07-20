import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { FaXmark } from "react-icons/fa6";

export default function LoginForm({ setIsLogin, setOpen }) {
    const { handleLogin } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")


    const submitLogin = async () => {
        setError("")

        if (!email.trim()) {
            setError("Digite se u e-mail.")
            return;
        }

        if (!password.trim()) {
            setError("Digite sua senha")
            return;
        }

        if (password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres.");
            return;
        }


        try {
            const result = await handleLogin(email, password);
            setOpen(false);

        } catch (error) {

            switch (error.code) {
                case "auth/invalid-email":
                    setError("Digite um e-mail válido.");
                    break;

                case "auth/invalid-credential":
                    setError("E-mail ou senha incorretos.");
                    break;

                case "auth/network-request-failed":
                    setError("Verifique sua conexão com a internet.");
                    break;

                default:
                    setError("Ocorreu um erro ao tentar entrar em sua conta.");
                    break;
            }
        }
    };

    return (
        <div className="relative mx-auto w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 backdrop-blur-sm">


            <button onClick={() => setOpen(false)}
                className="absolute cursor-pointer right-4 top-4 rounded-lg p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white transition">
                <FaXmark className="size-5.5" />
            </button>

            <h1 className="mb-8 text-center text-3xl font-extrabold tracking-tight text-white">
                Entrar
            </h1>

            {error && (
                <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {error}
                </div>
            )}

            <div className="space-y-4">

                <div className="space-y-1">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu e-mail"
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition-all duration-200 hover:border-zinc-700 focus:border-purple-500/60 focus:ring-purple-500/20" />
                </div>

                <div className="space-y-1">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        placeholder="Digite sua senha"
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition-all duration-200 hover:border-zinc-700 focus:border-purple-500/60 focus:ring-purple-500/20" />
                </div>

                <button onClick={submitLogin}
                    className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-600/20 transition-all duration-200 hover:brightness-110 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500/50 cursor-pointer">
                    Entrar
                </button>

            </div>

            <div className="mt-8 text-center text-sm">
                <span className="text-zinc-400">
                    Não tem uma conta?
                </span>
                <button
                    onClick={() => setIsLogin(false)}
                    className="ml-1 font-semibold text-purple-400 transition-colors duration-200 hover:text-purple-400/70 cursor-pointer hover:underline">
                    Criar conta
                </button>
            </div>

        </div>
    );
}