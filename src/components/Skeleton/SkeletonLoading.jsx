import SkeletonCard from "./SkeletonCard"
import SkeletonAside from "./SkeletonAside";


import { useWindowSize } from "../../hooks/useWindowSize"


export default function SkeletonLoading() {

    const width = useWindowSize();

    let quantity = 12;

    if (width < 640) {
        quantity = 4;
    }

    if (width >= 640 && width < 1024) {
        quantity = 8;
    }


    return (

        // <div className="grid grid-cols-2 md:grid-colos-4 lg:grid-cols-6 gap-4">

        <>
            {
                Array.from({ length: quantity })
                    .map((_, index) => (
                        <SkeletonCard key={index} />
                    ))
            }
        </>
        // </div>
    )

}