import { useCallback, useEffect, useState } from "react";

export const useMutation = () => {
    const [data, setData] = useState({
        data: null,
        isLoading: true,
        isError: false,
    });

    const mutate = useCallback(
        async ({ url = "", method = "POST", payload = {}, headers = {} } = {}) => {
            try {
                const response = await fetch(url, {
                    method,
                    headers: { "Content-Type": "application/json", ...headers },
                    ...method !== "GET" && { body: JSON.stringify(payload) },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                setData({
                    data: result,
                    isLoading: false,
                    isError: false,
                });
                return { ...result };
            } catch (error) {
                setData({
                    isError: true,
                    isLoading: false,
                });
                return error;
            }
        }, []);

    return { ...data, mutate };
};
