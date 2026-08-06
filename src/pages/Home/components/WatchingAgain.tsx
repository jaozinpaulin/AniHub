import { useRef } from "react";
import ButtonsArrow from "../components/ButtonsArrow";

// Dados fictícios baseados na imagem
const continueWatchingItems = [
    {
        title: 'Nome do Anime Exemplo 1',
        episode: 'Temporada 1 • Episódio 1',
        progress: 75,
        imageUrl: 'https://picsum.photos/id/1015/640/360', // Imagem de exemplo widescreen
    },
    {
        title: 'Nome do Anime Exemplo 2',
        episode: 'Temporada 2 • Episódio 4',
        progress: 40,
        imageUrl: 'https://picsum.photos/id/1016/640/360',
    },
    {
        title: 'Nome do Anime Exemplo 3',
        episode: 'Temporada 1 • Episódio 12',
        progress: 90,
        imageUrl: 'https://picsum.photos/id/1018/640/360',
    },
    {
        title: 'Nome do Anime Exemplo 4',
        episode: 'Temporada 1 • Episódio 5',
        progress: 15,
        imageUrl: 'https://picsum.photos/id/1019/640/360',
    },
    {
        title: 'Nome do Anime Exemplo 5',
        episode: 'Temporada 3 • Episódio 8',
        progress: 60,
        imageUrl: 'https://picsum.photos/id/1020/640/360',
    },
    {
        title: 'Nome do Anime Exemplo 6',
        episode: 'Temporada 1 • Episódio 2',
        progress: 30,
        imageUrl: 'https://picsum.photos/id/1021/640/360',
    },
    {
        title: 'Nome do Anime Exemplo 7',
        episode: 'Temporada 2 • Episódio 10',
        progress: 85,
        imageUrl: 'https://picsum.photos/id/1022/640/360',
    },
    {
        title: 'Nome do Anime Exemplo 8',
        episode: 'Temporada 1 • Episódio 7',
        progress: 50,
        imageUrl: 'https://picsum.photos/id/1025/640/360',
    },
];
export default function WatchingAgain() {
    const scrollWatch = useRef(null);

    return (
        <section className=" text-white  font-sans">

            <div className="w-full flex items-center justify-between px-4 md:px-0">
                <div className="flex flex-col lg:flex-row lg:items-baseline py-3 gap-1 lg:gap-4 lg:py-6">
                    <h3 className="text-xl font-bold text-white md:text-2xl flex items-center gap-2 whitespace-nowrap">
                        Continue Assistindo
                    </h3>
                    <p className="text-xs text-zinc-500 lg:text-sm font-medium leading-tight">
                        Retome de onde parou
                    </p>
                </div>

                <div className="shrink-0">
                    <ButtonsArrow scrollRef={scrollWatch} />
                </div>
            </div>

            <div
                ref={scrollWatch}
                className="flex gap-3 overflow-x-auto scroll-smooth scrollbar-none md:gap-4 p-2">
                {continueWatchingItems.map((item, index) => (
                    <div
                        key={index}
                        className="shrink-0 w-64 sm:w-72 md:w-80 relative group rounded-xl overflow-hidden shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-zinc-900 border border-transparent hover:border-zinc-800">
                        <div className="relative aspect-video overflow-hidden">
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-full object-cover" />
                        </div>

                        <div
                            className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

                        <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col">
                            <h3 className="text-sm font-bold text-zinc-100 group-hover:text-white transition truncate md:text-base">
                                {item.title}
                            </h3>
                            <p className="text-xs text-zinc-400 font-medium">
                                {item.episode}
                            </p>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-800 z-20">
                            <div
                                className="h-full bg-violet-600 transition-all duration-300"
                                style={{ width: `${item.progress}%` }} />
                        </div>

                        <div className="absolute bottom-3 right-4 text-[10px] md:text-xs font-semibold text-zinc-400 z-10">
                            {item.progress}%
                        </div>

                    </div>
                ))}
            </div>
        </section>
    );
}


/* essa e que estou mechndo no momento */