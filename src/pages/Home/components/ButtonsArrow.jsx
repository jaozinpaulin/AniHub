import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ButtonsArrow({ scrollRef, onNext }) {

    const scrollRight = () => {
        if (onNext) {
            onNext();
            return;
        }

        if (!scrollRef?.current) return;

        scrollRef.current.scrollBy({
            left: scrollRef.current.clientWidth,
            behavior: "smooth",
        });
    };

    const scrollLeft = () => {
        if (!scrollRef?.current) return;

        scrollRef.current.scrollBy({
            left: -scrollRef.current.clientWidth,
            behavior: "smooth",
        });
    };

    return (
        <div className="hidden sm:flex items-center gap-3 xs:flex-nowrap md:px-8">

            <button
                type="button"
                className="rounded-lg border border-zinc-800 bg-zinc-900/70 px-3 py-2 text-xs font-medium text-zinc-400 transition hover:border-zinc-700/70 hover:text-white active:scale-95 md:px-4 md:text-sm whitespace-nowrap shrink-0"
            >
                Ver todos
            </button>

            <div className="gap-2 sm:flex shrink-0">
                <button
                    type="button"
                    onClick={scrollLeft}
                    className="flex h-9 w-9 md:h-10 md:w-10 cursor-pointer items-center justify-center rounded-xl border border-zinc-700/60 bg-zinc-800/40 text-zinc-300 backdrop-blur-sm transition-all duration-300 hover:bg-zinc-700/60 hover:text-white active:scale-95"
                >
                    <FaChevronLeft className="text-xs md:text-sm" />
                </button>

                <button
                    type="button"
                    onClick={scrollRight}
                    className="flex h-9 w-9 md:h-10 md:w-10 cursor-pointer items-center justify-center rounded-xl border border-zinc-700/60 bg-zinc-800/40 text-zinc-300 backdrop-blur-sm transition-all duration-300 hover:bg-zinc-700/60 hover:text-white active:scale-95"
                >
                    <FaChevronRight className="text-xs md:text-sm" />
                </button>
            </div>

        </div>
    );
}