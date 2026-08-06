import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import { getAnimes } from "../services/animes"; // Ajuste o caminho conforme seu projeto

import SkeletonLoading from "../components/Skeleton/SkeletonLoading";
import ErrorMessage from "../components/Feedback/ErrorMessage";
import EmptyState from "../components/Feedback/EmptyState";


import type { AnimeType } from "../types/anime";
import type { QueryDocumentSnapshot } from "firebase/firestore";


export default function Explore() {
    const location = useLocation();

    const [animesList, setAnimesList] = useState<AnimeType[]>([]);
    const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [busca, buscaSet] = useState('');
    const [gene, geneSet] = useState('Todos');

    const observerTarget = useRef<HTMLDivElement | null>(null);

    const fetchInitialAnimes = useCallback(async () => {
        setLoadingInitial(true);
        setError(null);
        try {
            const data = await getAnimes(16);
            setAnimesList(data.animes);
            setLastDoc(data.lastVisible);
            setHasMore(data.hasMore);
        } catch (err) {
            setError("Erro ao carregar animes inicial.");
        } finally {
            setLoadingInitial(false);
        }
    }, []);

    useEffect(() => {
        fetchInitialAnimes();
    }, [fetchInitialAnimes]);

    const fetchMoreAnimes = useCallback(async () => {
        if (loadingMore || !hasMore || !lastDoc) return;

        setLoadingMore(true);
        try {
            const data = await getAnimes(16, lastDoc);
            setAnimesList((prev) => [...prev, ...data.animes]);
            setLastDoc(data.lastVisible);
            setHasMore(data.hasMore);
        } catch (err) {
            console.error("Erro ao carregar mais animes", err);
        } finally {
            setLoadingMore(false);
        }
    }, [loadingMore, hasMore, lastDoc]);

    useEffect(() => {
        const target = observerTarget.current;
        if (!target) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting && hasMore && !loadingMore && !loadingInitial) {
                    fetchMoreAnimes();
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(target);

        return () => {
            if (target) observer.unobserve(target);
        };
    }, [fetchMoreAnimes, hasMore, loadingMore, loadingInitial]);

    const removerAcentos = (texto = "") => {
        return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const generosUnicos = useMemo(() => {
        if (!animesList.length) return ['Todos'];

        const generos = animesList
            .flatMap(anime => anime.generos || [])
            .filter(ge => ge && !ge.startsWith('Letra'));

        return ['Todos', ...new Set(generos)];
    }, [animesList]);

    const animesFiltrado = useMemo(() => {
        return animesList.filter(ani => {
            const buscaTratada = removerAcentos(busca);
            const nomeTratado = removerAcentos(ani.nome || "");

            const inputFilter = busca === '' || nomeTratado.includes(buscaTratada);
            const generoFilter = gene === 'Todos' || (ani.generos && ani.generos.some(g => g.toLowerCase().includes(gene.toLowerCase())));

            return inputFilter && generoFilter;
        });
    }, [animesList, busca, gene]);

    if (loadingInitial) {
        return (
            <div className="flex flex-col pt-32 px-5 gap-5">
                <div className="space-y-3 animate-pulse">
                    <div className="h-8 w-52 rounded-lg bg-zinc-800" />
                    <div className="h-4 w-80 max-w-full rounded-lg bg-zinc-800" />
                </div>

                <div className="w-full h-12 rounded-xl bg-zinc-800 animate-pulse" />
                <div className="w-full h-20 rounded-xl bg-zinc-800 animate-pulse" />

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <SkeletonLoading />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="pt-32 p-10">
                <ErrorMessage message={error} retry={fetchInitialAnimes} />
            </div>
        );
    }

    if (animesList.length === 0) {
        return (
            <div className="space-y-3 p-10 pt-32">
                <EmptyState message="Nenhum anime encontrado." retry={fetchInitialAnimes} />
            </div>
        );
    }

    return (
        <section className="w-full min-h-dvh pt-16 sm:pt-20 bg-zinc-950/90 xl:px-5 pb-16">

            <div className="sm:pt-10 sm:mx-3">
                <h2 className="hidden sm:block text-3xl md:text-4xl font-bold text-white">
                    Explorar
                </h2>
            </div>

            <div className="relative mx-3 mt-3 sm:my-8 mb-3">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                    type="text"
                    value={busca}
                    onChange={(e) => buscaSet(e.target.value)}
                    placeholder="Busque por animes"
                    className="w-full h-10 sm:h-14 bg-zinc-900 border border-zinc-800 rounded-xl pl-12 pr-4 text-white placeholder:text-zinc-500 outline-none focus:border-blue-600/70 transition" />
            </div>

            <p className={`sm:hidden p-3 font-bold text-white ${animesFiltrado.length > 0 ? "block" : "hidden"}`}>
                Explore
            </p>

            <div className="w-full px-3 mb-6">
                <div className="flex gap-3 overflow-x-auto scrollbar-none pb-2 2xl:flex-wrap">
                    {generosUnicos.map((g) => (
                        <button
                            key={g}
                            type="button"
                            onClick={() => geneSet(g)}
                            className={`shrink-0 border rounded-xl px-4 py-2 transition-all duration-300 cursor-pointer font-medium text-sm whitespace-nowrap ${gene === g
                                ? 'bg-blue-500/10 border-blue-500/70 text-blue-400'
                                : 'bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800 hover:border-blue-500'
                                }`}>
                            {g}
                        </button>
                    ))}
                </div>
            </div>

            {animesFiltrado.length > 0 && (
                <div className="w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-8 gap-4 px-2 xl:px-6">
                    {animesFiltrado.map((a) => {
                        const isDublado = a.generos?.includes("Dublado");
                        const idPlayer = a.id_video || a.id;

                        return (
                            <Link key={idPlayer} state={{ from: location.pathname }} to={`/anime/${idPlayer}`}>
                                <div className="bg-zinc-800 rounded-xl overflow-hidden cursor-pointer text-white transition-all duration-300 hover:-translate-y-2 hover:bg-zinc-800/60 hover:shadow-xl hover:shadow-black/40">
                                    <div className="relative aspect-[2/3] overflow-hidden">
                                        <img
                                            src={a.capa}
                                            alt={`banner do ${a.nome}`}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-full object-cover" />
                                        <span
                                            className={`absolute top-2 left-2 px-2 py-1 rounded-md text-[10px] sm:text-xs font-medium text-white ${isDublado ? "bg-blue-800" : "bg-purple-800"
                                                }`}>
                                            {isDublado ? "Dublado" : "Legendado"}
                                        </span>
                                    </div>

                                    <div className="p-2">
                                        <h4 className="font-bold text-sm truncate">
                                            {a.nome}
                                        </h4>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}

            {hasMore && (
                <div
                    ref={observerTarget}
                    className="w-full min-h-[80px] flex items-center justify-center my-6">
                    {loadingMore ? (
                        <div className="flex items-center gap-3 bg-zinc-900/80 px-4 py-2 rounded-full border border-zinc-800 backdrop-blur-sm">
                            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin shrink-0" />
                            <span className="text-xs font-medium text-zinc-400">Carregando mais animes...</span>
                        </div>
                    ) : (
                        <div className="h-4 w-full pointer-events-none opacity-0" />
                    )}
                </div>
            )}

            {!hasMore && animesList.length > 0 && (
                <p className="text-center text-xs text-zinc-600 my-8">
                    Você chegou ao fim do catálogo.
                </p>
            )}
            {animesFiltrado.length === 0 && (
                <div className="w-full mx-auto px-3 py-10 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-6 shadow-lg">
                        <FaSearch className="text-lg sm:text-xl text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                        Nenhum anime encontrado
                    </h2>
                    <p className="text-zinc-400/70 text-sm sm:text-lg max-w-md">
                        Não encontramos animes com os filtros selecionados. Tente alterar sua pesquisa.
                    </p>
                </div>
            )}

        </section>
    );
}