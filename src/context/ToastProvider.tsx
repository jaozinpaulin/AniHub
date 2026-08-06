import { createContext, useState, type ReactNode } from "react";
import type { ToastType } from "../components/Toast";


interface ToastData {
    message: string;
    type: ToastType;
}

interface ToastContextType {
    toast: ToastData | null;
    showToast: (message: string, type?: ToastType) => void;
    hideToast: () => void;
}
interface ToastProviderProps {
    children: ReactNode;
}

export const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: ToastProviderProps) {

    const [toast, setToast] = useState<ToastData | null>(null);

    function showToast(
        message: string,
        type: ToastType = "info"
    ) {
        setToast({
            message,
            type,
        });

        setTimeout(() => {
            setToast(null);
        }, 3000);
    }

    function hideToast() {
        setToast(null);
    }

    return (
        <ToastContext.Provider value={{ toast, showToast, hideToast }}>
            {children}
        </ToastContext.Provider>
    )
}