import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo, useRef } from 'react';

import { FaStar } from "react-icons/fa";
import {
    HiOutlineChevronLeft,
    HiOutlineChevronRight,
    HiOutlineSquares2X2,
    HiOutlineArrowPath,
    HiOutlineExclamationTriangle
} from "react-icons/hi2";
import { PiArrowsOutLineHorizontalBold } from "react-icons/pi";

import { useProgress } from '../hooks/useProgress';
import { useAnimes } from '../hooks/useAnimes';
import { getAnimeById } from '../services/animes';

import ErrorMessage from '../components/Feedback/ErrorMessage';
import EmptyState from '../components/Feedback/EmptyState';

export default function Video() {
    const { id, tem, ep } = useParams();
    const navigate = useNavigate();

    const { animes, loading: loadingGlobal, error: errorGlobal, loadAnimes } = useAnimes();
    const { atualizarProgresso } = useProgress();

    const animeFromList = useMemo(() => {
        return animes?.find((a) => String(a.id_video) === String(id) || String(a.id) === String(id));
    }, [animes, id]);

    const [animeShow, setAnimeShow] = useState(animeFromList || null);
    const [loadingLocal, setLoadingLocal] = useState(!animeFromList);
    const [errorLocal, setErrorLocal] = useState(null);

    const [tempo, setTempo] = useState(0);
    const [isPlaying, setIsplaying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Estados para tratamento de erro/timeout do player
    const [playerError, setPlayerError] = useState(false);
    const [reloadKey, setReloadKey] = useState(0);
    const playerTimeoutRef = useRef(null);

    const [isTheaterMode, setIsTheaterMode] = useState(false);

    const temporadaAtual = Number(tem);
    const episodioAtual = Number(ep);

    useEffect(() => {
        let isMounted = true;

        if (animeFromList) {
            setAnimeShow(animeFromList);
            setLoadingLocal(false);
            return;
        }

        async function fetchAnime() {
            setLoadingLocal(true);
            setErrorLocal(null);
            try {
                const data = await getAnimeById(id);
                if (isMounted) setAnimeShow(data);
            } catch (err) {
                if (isMounted) {
                    console.error("Erro ao carregar o anime do vídeo:", err);
                    setErrorLocal("Não foi possível carregar as informações do vídeo.");
                }
            } finally {
                if (isMounted) setLoadingLocal(false);
            }
        }

        if (id) fetchAnime();

        return () => { isMounted = false; };
    }, [id, animeFromList]);

    // Reseta o player e gerencia o timeout de segurança
    useEffect(() => {
        setIsLoaded(false);
        setIsplaying(false);
        setPlayerError(false);
        setTempo(0);

        if (playerTimeoutRef.current) {
            clearTimeout(playerTimeoutRef.current);
        }

        playerTimeoutRef.current = setTimeout(() => {
            setIsLoaded((currentLoaded) => {
                if (!currentLoaded) {
                    setPlayerError(true);
                }
                return currentLoaded;
            });
        }, 15000);

        return () => {
            if (playerTimeoutRef.current) {
                clearTimeout(playerTimeoutRef.current);
            }
        };
    }, [id, tem, ep, reloadKey]);

    const temporadaAtiva = useMemo(() => {
        if (!animeShow?.temporadas) return null;
        return animeShow.temporadas.find(t => Number(t.id) === temporadaAtual) || animeShow.temporadas[0];
    }, [animeShow, temporadaAtual]);

    const totalEp = temporadaAtiva?.total_episodios_temporada || temporadaAtiva?.episodios?.length || 0;

    const realAnimeId = animeShow?.id_video || id;

    function getProgressPercentage(segundos) {
        const duracaoEp = 24 * 60;
        return Math.round(Math.min((segundos / duracaoEp) * 100, 100));
    }

    useEffect(() => {
        if (!isPlaying) return;

        const time = setInterval(() => {
            setTempo((prev) => {
                const novoTempo = prev + 1;
                if (novoTempo % 5 === 0) {
                    const progress = getProgressPercentage(novoTempo);
                    atualizarProgresso({
                        animeId: realAnimeId,
                        temporada: temporadaAtual,
                        episodio: episodioAtual,
                        progress
                    });
                }
                return novoTempo;
            });
        }, 1000);

        return () => clearInterval(time);
    }, [isPlaying, realAnimeId, temporadaAtual, episodioAtual]);

    const handleTrocarEpisodio = (novoEp) => {
        navigate(`/video/${id}/${temporadaAtual}/${novoEp}`);
    };

    const handleRetryPlayer = () => {
        setIsLoaded(false);
        setPlayerError(false);
        setReloadKey((prev) => prev + 1);
    };

    const urlDoIframe = `https://serv01.meusdoramas.club/#/video/${realAnimeId}/${temporadaAtual}/${episodioAtual}/`;
    const htmlConteudo = `<script>window.location.replace("${urlDoIframe}");<\/script>`;
    const base64Html = btoa(unescape(encodeURIComponent(htmlConteudo)));



    if (loadingLocal || (loadingGlobal && !animeShow)) {
        return (
            <section className="w-full mx-auto min-h-screen pt-20 sm:pt-24 bg-zinc-950 flex justify-center px-3 sm:px-0">
                <div className="w-full max-w-6xl mx-auto space-y-6 animate-pulse sm:p-6">
                    <div className="aspect-video w-full bg-zinc-900 rounded-xl border border-zinc-800" />
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="h-7 bg-zinc-900 rounded-lg w-1/3" />
                        <div className="h-10 bg-zinc-900 rounded-lg w-1/2" />
                        <div className="h-10 bg-zinc-900 rounded-lg w-1/2" />
                    </div>
                </div>
            </section>
        );
    }

    if (errorLocal || errorGlobal) {
        return (
            <div className="py-32 px-10 text-center min-h-screen bg-zinc-950 flex items-center justify-center">
                <ErrorMessage message={errorLocal || errorGlobal} retry={loadAnimes} />
            </div>
        );
    }

    if (!animeShow) {
        return (
            <div className="py-32 px-10 min-h-screen bg-zinc-950 flex items-center justify-center">
                <EmptyState message="Anime não encontrado." retry={() => navigate('/')} />
            </div>
        );
    }

    return (
        <section className={`relative w-full mx-auto min-h-screen bg-zinc-950 selection:bg-blue-500/30 transition-all duration-300 ${isTheaterMode ? "pt-16 md:pt-20 pb-12" : "pt-20 sm:pt-24 mb-16 px-2 sm:px-4"
            }`}>

            {!isTheaterMode && (
                <>
                    <div className="hidden sm:block absolute top-20 left-20 h-72 w-72 rounded-full bg-blue-600/20 blur-[120px]" />
                    <div className="hidden sm:block absolute bottom-20 right-20 h-72 w-72 rounded-full bg-purple-600/20 blur-[120px]" />
                </>
            )}

            <div className={`w-full mx-auto space-y-2 z-10 transition-all duration-300 ${isTheaterMode
                ? "max-w-full"
                : "max-w-6xl mt-2 sm:mt-4 lg:border-2 lg:rounded lg:border-zinc-900 sm:p-6 lg:p-8"
                }`}>

                {/* Player Container */}
                <div className={`w-full bg-black flex items-center justify-center transition-all duration-300 ${isTheaterMode
                    ? "h-[75vh] md:h-[80vh] max-h-[calc(100vh-100px)] border-y border-zinc-800/80 shadow-2xl"
                    : "aspect-video rounded-xl border border-zinc-800 overflow-hidden shadow-2xl"
                    }`}>
                    <div className="relative w-full h-full flex items-center justify-center aspect-video max-w-full">
                        {!playerError && (
                            <iframe
                                key={`${urlDoIframe}-${reloadKey}`}
                                src={`data:text/html;base64,${base64Html}`}
                                className="w-full h-full border-0"
                                title="Player de Video"
                                scrolling="no"
                                allowFullScreen
                                referrerPolicy="no-referrer"
                                onLoad={() => {
                                    if (playerTimeoutRef.current) {
                                        clearTimeout(playerTimeoutRef.current);
                                    }
                                    setIsLoaded(true);
                                    setIsplaying(true);
                                    setPlayerError(false);
                                }}
                                onError={() => {
                                    if (playerTimeoutRef.current) {
                                        clearTimeout(playerTimeoutRef.current);
                                    }
                                    setPlayerError(true);
                                }}
                            />
                        )}

                        {/* Spinner de Carregamento */}
                        {!isLoaded && !playerError && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 gap-3 z-10">
                                <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                                <span className="text-zinc-400 text-sm font-medium">Carregando player...</span>
                            </div>
                        )}

                        {playerError && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/95 gap-3 z-20 text-center p-4 border border-zinc-800 rounded-xl">
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 mb-1">
                                    <HiOutlineExclamationTriangle className="text-2xl" />
                                </div>
                                <span className="text-zinc-200 text-sm font-semibold">
                                    Não foi possível carregar o vídeo
                                </span>
                                <span className="text-xs text-zinc-500 max-w-xs">
                                    O servidor demorou para responder ou o vídeo está indisponível no momento.
                                </span>
                                <button
                                    type="button"
                                    onClick={handleRetryPlayer}
                                    className="mt-2 flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs font-medium rounded-lg hover:border-blue-500 hover:text-white transition-all duration-200 cursor-pointer">

                                    <HiOutlineArrowPath className="text-sm" />
                                    Tentar novamente
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Infos + Botoes de Acao */}
                <div className={`px-3 sm:px-4 pt-2 ${isTheaterMode ? "max-w-full mx-auto w-full" : ""}`}>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-zinc-950/80 border border-zinc-800/60 p-3 sm:p-4 rounded-xl">

                        {/* Esquerda Titulo e Badges */}
                        <div className="flex flex-col text-center md:text-left space-y-1.5 w-full md:w-auto">
                            <h1 className="text-base sm:text-xl md:text-2xl font-bold text-white leading-tight line-clamp-1">
                                {animeShow.nome}
                            </h1>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2">
                                <span className="rounded-md bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-[10px] sm:text-xs text-zinc-300">
                                    {animeShow.generos?.includes("Dublado") ? "Dublado" : "Legendado"}
                                </span>

                                <span className="rounded-md bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-[10px] sm:text-xs text-zinc-300">
                                    Temp. {temporadaAtual}
                                </span>

                                <span className="rounded-md bg-blue-500/15 border border-blue-500/20 px-2 py-0.5 text-[10px] sm:text-xs text-blue-400 font-semibold">
                                    Ep. {episodioAtual}
                                </span>
                            </div>
                        </div>

                        {/* Direita: Botoes de Acao */}
                        <div className="flex items-center gap-1.5 sm:gap-4 w-full md:w-auto justify-center md:justify-end shrink-0">

                            <button type="button" onClick={() => handleTrocarEpisodio(Math.max(1, episodioAtual - 1))} disabled={episodioAtual <= 1}
                                className={`flex-1 md:flex-initial flex items-center justify-center gap-1 px-3 py-2 sm:px-4 sm:py-2.5 border rounded-lg transition-all duration-300 group ${episodioAtual <= 1
                                    ? "border-zinc-800/80 bg-zinc-900/30 text-zinc-600 cursor-not-allowed"
                                    : "border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:border-zinc-600 hover:text-white hover:bg-zinc-850 cursor-pointer"
                                    }`}>
                                <HiOutlineChevronLeft className={`text-sm sm:text-base transition-transform duration-300 ${episodioAtual <= 1 ? "" : "group-hover:-translate-x-1"}`} />
                                <span className="text-xs sm:text-sm font-medium truncate">Anterior</span>
                            </button>

                            <Link to={`/anime/${id}`} className="flex-1 md:flex-initial">
                                <button
                                    type="button"
                                    className="w-full flex items-center justify-center gap-1 px-3 py-2 sm:px-4 sm:py-2.5 border border-zinc-700 bg-zinc-900 text-zinc-200 rounded-lg hover:border-blue-500 hover:text-white hover:bg-zinc-850 transition-all duration-300 cursor-pointer group">
                                    <HiOutlineSquares2X2 className="text-sm sm:text-base group-hover:rotate-90 transition-transform duration-300 shrink-0" />
                                    <span className="text-xs sm:text-sm font-medium truncate">Episódios</span>
                                </button>
                            </Link>

                            <button
                                type="button"
                                onClick={() => handleTrocarEpisodio(Math.min(totalEp, episodioAtual + 1))}
                                disabled={episodioAtual >= totalEp}
                                className={`flex-1 md:flex-initial flex items-center justify-center gap-1 px-3 py-2 sm:px-4 sm:py-2.5 border rounded-lg transition-all duration-300 group ${episodioAtual >= totalEp
                                    ? "border-zinc-800/80 bg-zinc-900/30 text-zinc-600 cursor-not-allowed"
                                    : "border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:border-zinc-600 hover:text-white hover:bg-zinc-850 cursor-pointer"
                                    }`}>
                                <span className="text-xs sm:text-sm font-medium truncate">Próximo</span>
                                <HiOutlineChevronRight className={`text-sm sm:text-base transition-transform duration-300 ${episodioAtual >= totalEp ? "" : "group-hover:translate-x-1"}`} />
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsTheaterMode(!isTheaterMode)}
                                className={`hidden xl:flex items-center justify-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 border rounded-lg font-medium transition-all duration-300 cursor-pointer shadow-md ${isTheaterMode
                                    ? "bg-blue-600/20 border-blue-500 text-blue-400 hover:bg-blue-600/30"
                                    : "border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:border-zinc-600 hover:text-white hover:bg-zinc-850"
                                    }`}
                                title={isTheaterMode ? "Modo Normal" : "Modo Teatro"}>

                                <PiArrowsOutLineHorizontalBold className={`text-base transition-transform duration-300 ${isTheaterMode ? "scale-110" : ""}`} />
                                <span className="text-xs sm:text-sm hidden lg:inline">
                                    {isTheaterMode ? "Normal" : "Teatro"}
                                </span>
                            </button>

                        </div>

                    </div>

                    {/* Card Inferior do Anime */}
                    <div className="mt-4 bg-zinc-950 border border-zinc-700/40 rounded-xl p-4 flex flex-col md:flex-row gap-5 md:gap-8 items-center md:items-start text-white">

                        <div className="shrink-0">
                            <img
                                src={animeShow.capa}
                                alt={animeShow.nome}
                                className="w-28 sm:w-36 md:w-40 rounded-xl object-cover shadow-2xl border border-zinc-800 aspect-[2/3]"
                            />
                        </div>

                        <div className="w-full flex flex-col items-center md:items-start gap-4">

                            <div className="text-center md:text-left">
                                <span className="text-zinc-500 text-xs uppercase tracking-wider font-semibold block mb-1">
                                    Você está assistindo
                                </span>
                                <h2 className="text-lg sm:text-2xl font-bold text-zinc-100 line-clamp-1">
                                    {animeShow.nome}
                                </h2>
                            </div>

                            <div className="flex flex-wrap justify-center md:justify-start gap-1.5 sm:gap-2 text-[11px] sm:text-sm w-full">
                                <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center gap-1">
                                    <FaStar className="text-yellow-400 text-[10px] sm:text-xs" />
                                    <span className="font-medium">{animeShow.classificacao}</span>
                                </span>

                                <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                                    {animeShow.total_episodios_geral || 0} Eps
                                </span>

                                <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                                    {animeShow.total_temporadas || animeShow.temporadas?.length || 1} Temp.
                                </span>

                                <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                                    {animeShow.generos?.includes("Dublado") ? "Dublado" : "Legendado"}
                                </span>

                                <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400">
                                    {animeShow.data_lancamento?.split(',')[1] || animeShow.data_lancamento || 'N/A'}
                                </span>
                            </div>

                            <div className="hidden md:block w-full h-[1px] bg-zinc-800/60 my-1" />

                            <div className="flex flex-wrap justify-center md:justify-start gap-1.5 sm:gap-2 w-full">
                                {animeShow.generos
                                    ?.filter(g =>
                                        g !== "Dublado" &&
                                        g !== "Legendado" &&
                                        !g.startsWith("Letra")
                                    )
                                    .map(genero => (
                                        <span
                                            key={genero}
                                            className="px-2.5 py-1 bg-zinc-900/50 border border-zinc-800 rounded-md text-zinc-400 text-xs sm:text-sm hover:text-zinc-200 hover:border-zinc-700 transition-colors duration-200">
                                            {genero}
                                        </span>
                                    ))
                                }
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}