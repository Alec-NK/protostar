import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../services/api";

export function useFetch<T = unknown>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [isFetching, setIsFetching] = useState(true); // Saber se está acontecendo a requisição

    useEffect(() => {
        api.get(url)
            .then((response) => {
                setData(response.data);
            })
            .catch(() => {
                toast.error("Houve um erro");
            })
            .finally(() => {
                // Acontece independente se o response for true ou false
                setIsFetching(false);
            });
    }, [url]);

    return { data, isFetching };
}
