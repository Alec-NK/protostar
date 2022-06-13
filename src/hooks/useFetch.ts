import { useState, useEffect } from "react";
import axios from "axios";

export function useFetch<T = unknown>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [isFetching, setIsFetching] = useState(true); // Saber se está acontecendo a requisição

    useEffect(() => {
        axios
            .get(url)
            .then((response) => {
                setData(response.data);
            })
            .finally(() => {
                // Acontece independente se o response for true ou false
                setIsFetching(false);
            });
    }, []);

    return { data, isFetching };
}
