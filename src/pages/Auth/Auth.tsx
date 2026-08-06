import { createPortal } from "react-dom";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useEffect } from "react";

import type { AuthProps } from "../../components/Header/User";

export default function Auth({ open, setOpen, isLogin, setIsLogin }: AuthProps) {

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [open]);

    if (!open) return null;

    return createPortal(
        <div
            onClick={() => setOpen(false)}
            className=" fixed inset-0 z-[9999] flex justify-center items-start overflow-y-auto bg-black/60 px-4 
            pt-10 backdrop-blur-xs sm:pt-16 md:items-center md:pt-0">

            <div onClick={(e) => e.stopPropagation()} className=" w-full max-w-md py-6">
                {isLogin ? (
                    <LoginForm
                        setOpen={setOpen}
                        setIsLogin={setIsLogin}
                    />
                ) : (
                    <RegisterForm
                        setOpen={setOpen}
                        setIsLogin={setIsLogin}
                    />
                )}
            </div>
        </div>,
        document.body
    );
}