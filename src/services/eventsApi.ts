import { api } from "./api";
import type { AttractionPhoto } from "./attractionsApi";

export type EventSummary = {
    id: string;
    name: string;
    coverUrl: string | null;
    startsAt: string;
    endsAt: string;
    dateNote: string | null;
    address: string | null;
};

export type Event = EventSummary & {
    description: string;
    latitude: number;
    longitude: number;
    tips: string | null;
    photos: AttractionPhoto[];
    createdAt: string;
    updatedAt: string;
};

export type EventInput = {
    name: string;
    description: string;
    startsAt: string;
    endsAt: string;
    dateNote?: string;
    latitude: number;
    longitude: number;
    address?: string;
    tips?: string;
};

export type EventScope = "upcoming" | "all";

const BASE = "/api/v1/events";

const MONTHS = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
];

/** "12 a 20 de julho de 2027", "12 de julho de 2027" ou "30 de junho a 2 de julho de 2027". */
export function formatPeriod(startsAt: string, endsAt: string): string {
    const s = new Date(startsAt);
    const e = new Date(endsAt);
    const sameYear = s.getFullYear() === e.getFullYear();
    const sameMonth = sameYear && s.getMonth() === e.getMonth();
    const sameDay = sameMonth && s.getDate() === e.getDate();

    const dayMonth = (d: Date) => `${d.getDate()} de ${MONTHS[d.getMonth()]}`;

    if (sameDay) return `${dayMonth(s)} de ${s.getFullYear()}`;
    if (sameMonth) return `${s.getDate()} a ${e.getDate()} de ${MONTHS[e.getMonth()]} de ${e.getFullYear()}`;
    if (sameYear) return `${dayMonth(s)} a ${dayMonth(e)} de ${e.getFullYear()}`;
    return `${dayMonth(s)} de ${s.getFullYear()} a ${dayMonth(e)} de ${e.getFullYear()}`;
}

export function isPast(endsAt: string): boolean {
    return new Date(endsAt).getTime() < Date.now();
}

export function listEvents(scope: EventScope = "upcoming") {
    return api<EventSummary[]>(`${BASE}?scope=${scope}`);
}

export function getEvent(id: string) {
    return api<Event>(`${BASE}/${id}`);
}

export function createEvent(input: EventInput) {
    return api<Event>(BASE, { method: "POST", body: input });
}

export function updateEvent(id: string, input: EventInput) {
    return api<Event>(`${BASE}/${id}`, { method: "PUT", body: input });
}

export function deleteEvent(id: string) {
    return api<void>(`${BASE}/${id}`, { method: "DELETE" });
}

export function uploadEventPhoto(id: string, fileUri: string, mimeType: string, fileName: string) {
    const form = new FormData();
    form.append("file", { uri: fileUri, type: mimeType, name: fileName } as unknown as Blob);
    return api<AttractionPhoto>(`${BASE}/${id}/photos`, { method: "POST", body: form });
}

export function deleteEventPhoto(id: string, photoId: string) {
    return api<void>(`${BASE}/${id}/photos/${photoId}`, { method: "DELETE" });
}

export function setEventCover(id: string, photoId: string) {
    return api<Event>(`${BASE}/${id}/cover`, { method: "PUT", body: { photoId } });
}
