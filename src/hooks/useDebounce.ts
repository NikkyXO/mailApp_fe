import { useState, useEffect } from "react";

export const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        console.log(debouncedValue);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return {
        debouncedValue,
        setDebouncedValue
    }
};