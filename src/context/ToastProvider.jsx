import { createContext, useState } from "react";

export const ToastContext = createContext();

export function ToastProvider({ children }) {

    const [toast, setToast] = useState(null);

    function showToast(message, type = "info") {
        setToast({
            message,
            type
        });
        setTimeout(() => {
            setToast(null)
        }, 3000)
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