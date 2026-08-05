import { useContext } from "react";
import { ToastContext } from "../context/ToastProvider";


export function useToast() {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error(
            "useAuth deve ser usado dentro do ToastContext"
        );
    }

    return context;
}