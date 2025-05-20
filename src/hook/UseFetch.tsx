import React, { useState, useEffect } from 'react';
import {baseUrl} from "../utilis/webinfo";

interface Response {
    status: boolean;
    data: {
        items: any[]
    }
}

const useFetch =(url: string) => {

    const [data, setData] = useState<Response>({status: false, data: {items: []}});
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseUrl.url}${url}`, {headers: {Authorization: `bearer ${baseUrl.token}`}});
                const data = await response.json();
                setData(data);
            } catch (error) {
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return {data, isLoading, hasError};
};

export default useFetch;