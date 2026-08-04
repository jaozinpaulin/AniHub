import { useWindowSize } from "../../hooks/useWindowSize";

export default function SkeletonCategories() {

    const width = useWindowSize();

    let quantity = 12;

    if (width < 640) {
        quantity = 4;
    }

    if (width > 640 && width < 768) {
        quantity = 4;
    }
    if (width > 768 && width < 1024) {
        quantity = 6
    }

    if (width > 1024 && width < 1280) {
        quantity = 8
    }

    return (

        <>

            {
                Array.from({ length: quantity })
                    .map((_, index) => (
                        < div key={index} className="animate-pulse">

                            <div className=" h-40 w-full rounded-xl   bg-zinc-800">

                                <div className=" mt-3 h-4 w-full rounded bg-zinc-800"></div>
                                <div className=" mt-2 h-4 w-5/6 rounded bg-zinc-800"></div>

                            </div>

                        </div >
                    ))

            }
        </>
    );
}