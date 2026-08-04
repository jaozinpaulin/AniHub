export default function SkeletonAside() {
    return (

        <>

            {
                Array.from({ length: 4 })
                    .map((_, index) => (
                        < div key={index} className="animate-pulse">

                            <div className=" h-52 w-full rounded-xl bg-zinc-800"></div>

                            <div className="mt-4h-6w-3/4roundedbg-zinc-800"></div>
                            <div className=" mt-3 h-4 w-full rounded bg-zinc-800"></div>
                            <div className=" mt-2 h-4 w-5/6 rounded bg-zinc-800"></div>

                        </div >
                    ))

            }
        </>
    );
}