
import React, { useEffect, useState } from "react";
import { getUser } from "../services/api";
import { User } from "../types";

export const useUser = () => {
    const [ user, setUser ] = useState<User | null>(null);
    const [ error, setError ] = useState<string | null>(null);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    
    const fetchUser = React.useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await getUser();
            setUser(response);
            setError(null);
        } catch (error) {
            setError(`Error in fetching user: ${error instanceof Error ? error.message : String(error)}`);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return {
        user,
        getUser: fetchUser,
        error,
        isLoading
    } 
}