import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { FaXmark } from "react-icons/fa6";
import { useToast } from "../../hooks/useToast";


export default function RegisterForm({ setIsLogin, setOpen }) {
    const { handleRegister } = useAuth();
    const { showToast } = useToast();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const submitRegister = async () => {

        setError("");

        if (!email.trim()) {
            setError("Digite seu e-mail.");
            return;
        }

        if (!password.trim()) {
            setError("Digite sua senha.");
            return;
        }

        if (password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        try {
            await handleRegister(email, password);
            setOpen(false);
            showToast(
                "Conta criada com sucesso!",
                "success"
            );
        } catch (error) {

            switch (error.code) {
                case "auth/email-already-in-use":
                    setError("Este e-mail já está cadastrado.");
                    break;
                case "auth/invalid-email":
                    setError("Digite um e-mail válido.");
                    break;
                case "auth/weak-password":
                    setError("A senha deve ter pelo menos 6 caracteres.");
                    break;
                default:
                    setError("Ocorreu um erro ao criar a conta.");
                    break;
            }
        }
    };

    return (
        <div className="relative mx-auto w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 backdrop-blur-sm">

            <h1 className="mb-6 text-center text-3xl font-extrabold tracking-tight text-white">
                Criar conta
            </h1>

            <button onClick={() => setOpen(false)}
                className="absolute cursor-pointer right-4 top-4 rounded-lg p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white transition">
                <FaXmark className="size-5.5" />
            </button>

            {error && (
                <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {error}
                </div>
            )}

            <div className="space-y-4">

                <input type="email" value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                    }}
                    placeholder="Digite seu e-mail"
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition hover:border-zinc-700 focus:border-purple-500/60  focus:ring-purple-500/20" />

                <input type="password" value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                    }}
                    placeholder="Crie sua senha"
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition hover:border-zinc-700 focus:border-purple-500/60 focus:ring-purple-500/20" />

                <button
                    onClick={submitRegister}
                    className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-600/20 transition hover:brightness-110 cursor-pointer active:scale-[0.98]">
                    Cadastrar
                </button>

            </div>

            <div className="mt-8 text-center text-sm">

                <span className="text-zinc-400">
                    Já tem uma conta?
                </span>

                <button type="button"
                    onClick={() => setIsLogin(true)}
                    className="ml-1 font-semibold text-purple-400 transition hover:text-purple-400/70 cursor-pointer hover:underline">
                    Entrar
                </button>

            </div>

        </div >
    );
}