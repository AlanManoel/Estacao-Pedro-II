/** Abre conversa no WhatsApp com mensagem pronta citando o assunto (nome da atração ou do estabelecimento). */
export function whatsappUrl(whatsapp: string, subject: string): string {
    const text = `Olá! Vi seu contato no app Estação Pedro II e quero informações sobre ${subject}`;
    return `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
}

export function instagramUrl(handle: string): string {
    return `https://instagram.com/${handle}`;
}
