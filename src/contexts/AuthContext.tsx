import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

import { refreshSession, type User } from "@/services/api";
import * as authApi from "@/services/authApi";
import { session } from "@/services/session";

type AuthContextValue = {
    user: User | null;
    isGuest: boolean;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (name: string, email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    continueAsGuest: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isGuest, setIsGuest] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const refreshed = await refreshSession();
                if (refreshed) {
                    setUser(refreshed.user);
                } else if (await session.isGuest()) {
                    setIsGuest(true);
                }
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const signIn = useCallback(async (email: string, password: string) => {
        setUser(await authApi.signIn(email, password));
        setIsGuest(false);
    }, []);

    const signUp = useCallback(async (name: string, email: string, password: string) => {
        setUser(await authApi.signUp(name, email, password));
        setIsGuest(false);
    }, []);

    const signOut = useCallback(async () => {
        await authApi.signOut();
        setUser(null);
        setIsGuest(false);
    }, []);

    const continueAsGuest = useCallback(async () => {
        await session.setGuest();
        setIsGuest(true);
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, isGuest, isLoading, signIn, signUp, signOut, continueAsGuest }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth precisa estar dentro de AuthProvider");
    return ctx;
}
