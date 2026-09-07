import { api } from "./api";
import type { AttractionPhoto } from "./attractionsApi";

export type EstablishmentType = "HOSPEDAGEM" | "RESTAURANTE";
export type PriceRange = "BAIXO" | "MEDIO" | "ALTO";

export const ESTABLISHMENT_TYPE_LABEL: Record<EstablishmentType, string> = {
    HOSPEDAGEM: "Hospedagem",
    RESTAURANTE: "Restaurante",
};

export const PRICE_RANGE_LABEL: Record<PriceRange, string> = {
    BAIXO: "$",
    MEDIO: "$$",
    ALTO: "$$$",
};

export type EstablishmentSummary = {
    id: string;
    type: EstablishmentType;
    name: string;
    coverUrl: string | null;
    priceRange: PriceRange;
    address: string;
};

export type Establishment = EstablishmentSummary & {
    description: string;
    latitude: number;
    longitude: number;
    whatsapp: string;
    instagram: string | null;
    openingHours: string | null;
    highlights: string | null;
    photos: AttractionPhoto[];
    createdAt: string;
    updatedAt: string;
};

export type EstablishmentInput = {
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    address: string;
    whatsapp: string;
    instagram?: string;
    openingHours?: string;
    priceRange: PriceRange;
    highlights?: string;
};

const BASE = "/api/v1/establishments";

export function listEstablishments(type?: EstablishmentType) {
    const query = type ? `?type=${type}` : "";
    return api<EstablishmentSummary[]>(`${BASE}${query}`);
}

export function getEstablishment(id: string) {
    return api<Establishment>(`${BASE}/${id}`);
}

export function createEstablishment(type: EstablishmentType, input: EstablishmentInput) {
    return api<Establishment>(BASE, { method: "POST", body: { type, ...input } });
}

export function updateEstablishment(id: string, input: EstablishmentInput) {
    return api<Establishment>(`${BASE}/${id}`, { method: "PUT", body: input });
}

export function deleteEstablishment(id: string) {
    return api<void>(`${BASE}/${id}`, { method: "DELETE" });
}

export function uploadEstablishmentPhoto(id: string, fileUri: string, mimeType: string, fileName: string) {
    const form = new FormData();
    form.append("file", { uri: fileUri, type: mimeType, name: fileName } as unknown as Blob);
    return api<AttractionPhoto>(`${BASE}/${id}/photos`, { method: "POST", body: form });
}

export function deleteEstablishmentPhoto(id: string, photoId: string) {
    return api<void>(`${BASE}/${id}/photos/${photoId}`, { method: "DELETE" });
}

export function setEstablishmentCover(id: string, photoId: string) {
    return api<Establishment>(`${BASE}/${id}/cover`, { method: "PUT", body: { photoId } });
}
