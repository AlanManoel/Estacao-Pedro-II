import * as SecureStore from "expo-secure-store";

const KEYS = {
    access: "accessToken",
    refresh: "refreshToken",
    guest: "guest",
} as const;

export type Tokens = { accessToken: string; refreshToken: string };

export const session = {
    getAccessToken: () => SecureStore.getItemAsync(KEYS.access),

    getRefreshToken: () => SecureStore.getItemAsync(KEYS.refresh),

    async saveTokens({ accessToken, refreshToken }: Tokens) {
        await SecureStore.setItemAsync(KEYS.access, accessToken);
        await SecureStore.setItemAsync(KEYS.refresh, refreshToken);
        await SecureStore.deleteItemAsync(KEYS.guest);
    },

    async isGuest() {
        return (await SecureStore.getItemAsync(KEYS.guest)) === "true";
    },

    setGuest: () => SecureStore.setItemAsync(KEYS.guest, "true"),

    async clear() {
        await SecureStore.deleteItemAsync(KEYS.access);
        await SecureStore.deleteItemAsync(KEYS.refresh);
        await SecureStore.deleteItemAsync(KEYS.guest);
    },
};
