import { api } from "./api";

export type GuideSummary = {
    id: string;
    name: string;
    description: string | null;
    whatsapp: string;
    instagram: string | null;
    photoUrl: string | null;
};

export type Guide = GuideSummary & { attractionIds: string[] };

export type GuideInput = {
    name: string;
    description?: string;
    whatsapp: string;
    instagram?: string;
    attractionIds: string[];
};

const BASE = "/api/v1/guides";

export function whatsappUrl(whatsapp: string, attractionName: string): string {
    const text = `Olá! Vi seu contato no app Estação Pedro II e quero informações sobre ${attractionName}`;
    return `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
}

export function instagramUrl(handle: string): string {
    return `https://instagram.com/${handle}`;
}

/** "5586999990000" → "+55 (86) 99999-0000". Devolve o valor original se não tiver o tamanho esperado. */
export function formatWhatsapp(digits: string): string {
    if (digits.length !== 12 && digits.length !== 13) return digits;
    const ddi = digits.slice(0, 2);
    const ddd = digits.slice(2, 4);
    const number = digits.slice(4);
    const split = number.length - 4;
    return `+${ddi} (${ddd}) ${number.slice(0, split)}-${number.slice(split)}`;
}

export function listGuides() {
    return api<Guide[]>(BASE);
}

export function getGuide(id: string) {
    return api<Guide>(`${BASE}/${id}`);
}

export function createGuide(input: GuideInput) {
    return api<Guide>(BASE, { method: "POST", body: input });
}

export function updateGuide(id: string, input: GuideInput) {
    return api<Guide>(`${BASE}/${id}`, { method: "PUT", body: input });
}

export function deleteGuide(id: string) {
    return api<void>(`${BASE}/${id}`, { method: "DELETE" });
}

export function uploadGuidePhoto(id: string, fileUri: string, mimeType: string, fileName: string) {
    const form = new FormData();
    form.append("file", { uri: fileUri, type: mimeType, name: fileName } as unknown as Blob);
    return api<Guide>(`${BASE}/${id}/photo`, { method: "POST", body: form });
}
