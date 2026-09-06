import { useCallback, useEffect, useState } from "react";

import { ApiError } from "@/services/api";

type State<T> = { data: T | null; loading: boolean; error: string | null };

export function errorMessage(err: unknown): string {
    return err instanceof ApiError ? err.message : "Não foi possível conectar ao servidor";
}

/**
 * Executa `fn` ao montar e sempre que `deps` mudar. `reload` refaz a chamada.
 * Ignora respostas que chegam depois de uma nova chamada ter começado.
 */
export function useRequest<T>(fn: () => Promise<T>, deps: unknown[]) {
    const [state, setState] = useState<State<T>>({ data: null, loading: true, error: null });
    const [version, setVersion] = useState(0);

    useEffect(() => {
        let active = true;
        setState((prev) => ({ ...prev, loading: true, error: null }));

        fn().then(
            (data) => active && setState({ data, loading: false, error: null }),
            (err) => active && setState({ data: null, loading: false, error: errorMessage(err) }),
        );

        return () => {
            active = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps, version]);

    const reload = useCallback(() => setVersion((v) => v + 1), []);

    return { ...state, reload };
}
