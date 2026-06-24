import { api } from "../../../../api"

const trailers = api.trailers

export default function Trailers() {

    return (
        <section className="w-full  mt-12">

            <h2 className="text-2xl font-bold text-white mb-6">
                🎬 Trailers em Destaque
            </h2>

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trailers.map(t => (
                    <li key={t.id} className="bg w-full  bg-zinc-700/80 rounded-2xl">
                        <iframe
                            src={`https://www.youtube.com/embed/${t.videoId}`}
                            title={t.nome}
                            className="w-full aspect-video"
                            allowFullScreen
                            loading="lazy"
                        />
                        <p className="text-white p-2 font-medium">
                            {t.nome}
                        </p>

                    </li>
                ))}
            </ul>

        </section>
    )
}