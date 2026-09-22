import { api, type AuthResponse, type User } from "./api";
import { session } from "./session";

export async function signUp(name: string, email: string, password: string): Promise<User> {
    const result = await api<AuthResponse>("/api/v1/auth/register", {
        method: "POST",
        body: { name, email, password },
        auth: false,
    });
    await session.saveTokens(result);
    return result.user;
}

export async function signIn(email: string, password: string): Promise<User> {
    const result = await api<AuthResponse>("/api/v1/auth/login", {
        method: "POST",
        body: { email, password },
        auth: false,
    });
    await session.saveTokens(result);
    return result.user;
}

async function revoke(refreshToken: string): Promise<void> {
    await api<void>("/api/v1/auth/logout", { method: "POST", body: { refreshToken } });
}

export async function signOut(): Promise<void> {
    const refreshToken = await session.getRefreshToken();
    if (refreshToken) {
        try {
            await revoke(refreshToken);
        } catch {
            // Se o access token expirou, o cliente fez um refresh e rotacionou o token.
            // Revoga o token atual; se ainda falhar (sem rede), a sessão local é limpa mesmo assim.
            const current = await session.getRefreshToken();
            if (current && current !== refreshToken) {
                await revoke(current).catch(() => undefined);
            }
        }
    }
    await session.clear();
}
