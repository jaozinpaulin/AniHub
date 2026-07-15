import Hero from "./components/Hero";
import Aside from "./components/Aside";

import Trending from "./components/Trending";
import WatchingAgain from './components/WatchingAgain'


export default function Home() {
    return (
        <main>
            <div className="flex  pt-16 md:pt-20 px-4">

                <div className="w-full xl:w-3/4 flex flex-col gap-4">
                    <Hero />
                    <Trending />
                    <WatchingAgain />
                </div>

                <aside className="w-1/4 lg:pl-6 p-4 hidden xl:block">
                    <Aside />
                </aside>

            </div>

        </main>
    );
}