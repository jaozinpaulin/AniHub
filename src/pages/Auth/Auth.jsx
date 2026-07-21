import { createPortal } from "react-dom";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useEffect } from "react";


export default function Auth({ open, setOpen, isLogin, setIsLogin }) {

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
            className="fixed inset-0 z-[9999] grid place-items-center bg-black/60 backdrop-blur-xs">
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md px-4">
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