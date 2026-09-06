import { session, type Tokens } from "./session";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export type Role = "ADMIN" | "TOURIST";

export type User = { id: string; name: string; email: string; role: Role };

export type AuthResponse = Tokens & { user: User };

export class ApiError extends Error {
    constructor(
        public readonly status: number,
        public readonly code: string,
        message: string,
    ) {
        super(message);
        this.name = "ApiError";
    }
}

type Options = {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: unknown;
    auth?: boolean;
};

async function rawRequest<T>(path: string, options: Options, token: string | null): Promise<T> {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${BASE_URL}${path}`, {
        method: options.method ?? "GET",
        headers,
        body: options.body === undefined ? undefined : JSON.stringify(options.body),
    });

    if (res.status === 204) return undefined as T;

    const data = await res.json();
    if (!res.ok) {
        throw new ApiError(
            res.status,
            data?.error?.code ?? "UNKNOWN",
            data?.error?.message ?? "Erro inesperado",
        );
    }
    return data as T;
}

export async function refreshSession(): Promise<AuthResponse | null> {
    const refreshToken = await session.getRefreshToken();
    if (!refreshToken) return null;
    try {
        const result = await rawRequest<AuthResponse>(
            "/api/v1/auth/refresh",
            { method: "POST", body: { refreshToken }, auth: false },
            null,
        );
        await session.saveTokens(result);
        return result;
    } catch {
        await session.clear();
        return null;
    }
}

export async function api<T>(path: string, options: Options = {}): Promise<T> {
    const useAuth = options.auth !== false;
    const token = useAuth ? await session.getAccessToken() : null;

    try {
        return await rawRequest<T>(path, options, token);
    } catch (err) {
        const expired = err instanceof ApiError && err.status === 401 && useAuth;
        if (!expired) throw err;

        const refreshed = await refreshSession();
        if (!refreshed) throw err;
        return rawRequest<T>(path, options, refreshed.accessToken);
    }
}
