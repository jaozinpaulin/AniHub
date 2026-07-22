import { useToast } from "../hooks/useToast";
import { IoClose } from "react-icons/io5";
import { IoWarning, IoCheckmarkCircle, IoCloseCircle, IoInformationCircle } from "react-icons/io5";

function ToastIcon({ type }) {

    if (type === "success") {
        return <IoCheckmarkCircle size={22} />;
    }

    if (type === "warning") {
        return <IoWarning size={22} />;
    }

    if (type === "error") {
        return <IoCloseCircle size={22} />;
    }

    return <IoInformationCircle size={22} />;
}

function getToastStyle(type) {
    const styles = {
        success: "bg-emerald-600",
        warning: "bg-amber-500",
        error: "bg-rose-600",
        info: "bg-sky-600"
    };



    return styles[type] || styles.info;
}
export default function Toast() {

    const { toast, hideToast } = useToast();

    if (!toast) return null;


    return (
        <div className={` fixed bottom-5 right-5 z-50 flex items-center gap-4 rounded-xl px-5 py-4 text-white shadow-xl ${getToastStyle(toast.type)}`}>

            <p className="font-medium">
                {toast.message}
            </p>

            <button onClick={hideToast} className="transition cursor-pointer hover:scale-110">
                <IoClose size={20} />
            </button>

        </div>
    )
}