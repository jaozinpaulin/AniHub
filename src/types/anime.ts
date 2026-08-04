export interface EpisodioType {
    numero_episodio: string;
    capa_episodio: string;
    link: string;
}

export interface TemporadaType {
    id: number;
    nome: string;
    total_episodios_temporada: number;
    episodios: EpisodioType[];
}

export interface AnimeType {
    id: string;

    nome: string;
    id_video: string;
    data_lancamento: string;

    capa: string;
    classificacao: string;

    generos: string[];

    lore: string;

    link_anime: string;

    total_temporadas: number;
    temporadas: TemporadaType[];

    total_episodios_geral: number;
}