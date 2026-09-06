import { API_URL, api } from "./api";

export type AttractionType = "CACHOEIRA" | "PONTO_TURISTICO";
export type TrailLevel = "FACIL" | "MEDIA" | "DIFICIL";

export const TRAIL_LEVEL_LABEL: Record<TrailLevel, string> = {
    FACIL: "Fácil",
    MEDIA: "Média",
    DIFICIL: "Difícil",
};

export const ATTRACTION_TYPE_LABEL: Record<AttractionType, string> = {
    CACHOEIRA: "Cachoeira",
    PONTO_TURISTICO: "Ponto turístico",
};

export type AttractionSummary = {
    id: string;
    type: AttractionType;
    name: string;
    coverUrl: string | null;
    trailDistance: string | null;
    trailTime: string | null;
    trailLevel: TrailLevel | null;
};

export type AttractionPhoto = { id: string; url: string; position: number };

export type Attraction = AttractionSummary & {
    description: string;
    latitude: number;
    longitude: number;
    tips: string | null;
    howToGet: string | null;
    openingHours: string | null;
    price: string | null;
    photos: AttractionPhoto[];
    createdAt: string;
    updatedAt: string;
};

/** Campos enviados na criação e na edição. Os específicos de cada tipo são opcionais aqui e validados pela API. */
export type AttractionInput = {
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    tips?: string;
    howToGet?: string;
    trailDistance?: string;
    trailTime?: string;
    trailLevel?: TrailLevel;
    openingHours?: string;
    price?: string;
};

const BASE = "/api/v1/attractions";

export function imageUrl(relative: string): string {
    return `${API_URL}${relative}`;
}

export function listAttractions(type?: AttractionType) {
    const query = type ? `?type=${type}` : "";
    return api<AttractionSummary[]>(`${BASE}${query}`);
}

export function getAttraction(id: string) {
    return api<Attraction>(`${BASE}/${id}`);
}

export function createAttraction(type: AttractionType, input: AttractionInput) {
    return api<Attraction>(BASE, { method: "POST", body: { type, ...input } });
}

export function updateAttraction(id: string, input: AttractionInput) {
    return api<Attraction>(`${BASE}/${id}`, { method: "PUT", body: input });
}

export function deleteAttraction(id: string) {
    return api<void>(`${BASE}/${id}`, { method: "DELETE" });
}

export function uploadPhoto(id: string, fileUri: string, mimeType: string, fileName: string) {
    const form = new FormData();
    // No React Native, FormData aceita { uri, type, name } como arquivo.
    form.append("file", { uri: fileUri, type: mimeType, name: fileName } as unknown as Blob);
    return api<AttractionPhoto>(`${BASE}/${id}/photos`, { method: "POST", body: form });
}

export function deletePhoto(id: string, photoId: string) {
    return api<void>(`${BASE}/${id}/photos/${photoId}`, { method: "DELETE" });
}

export function setCover(id: string, photoId: string) {
    return api<Attraction>(`${BASE}/${id}/cover`, { method: "PUT", body: { photoId } });
}
