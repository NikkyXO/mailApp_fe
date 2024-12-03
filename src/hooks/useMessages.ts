import { useState } from "react";
import { fetchUserMessages, getUserMessageStats, getMessageDetail, markMessageAsRead } from "../services/api";
import { useUser } from "./useUser";
import { Message, MessageStats } from "../types";
import React from "react";
export const useMessage = () => {
    const [messages, setUserMessages ] = useState<Message[] | null>(null);
    const [ userMessageStats, setUserMessagesStats ] = useState<MessageStats | null>(null);
    const [ singleMessage, setSingleMessage ] = useState<Message | null>(null);
    const [ messageId, setMessageId ] = useState<string | null>(null);
    const [ error, setError ] = useState<string | null>(null);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const { user } = useUser();

    const fetchMessages = React.useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await fetchUserMessages(user?.id || '');
            console.log({ responseMsgs: response });
            setUserMessages(response);
            setError(null);
        } catch (error) {
            setError(`Error in fetching messages: ${error}`);
            setUserMessages(null);
        } finally {
            setIsLoading(false);
        }
    }, [user?.id]);

    const getMsgStats = React.useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await getUserMessageStats(user?.id || '');
            console.log({ stats: response });
            setUserMessagesStats(response);
            setError(null);
        } catch (error) {
            setError(`Error in fetching messages: ${error instanceof Error ? error.message : String(error)}`);
            setUserMessages(null);
        } finally {
            setIsLoading(false);
        }
    }, [user?.id]);

    const getMessageById = React.useCallback(async (id: string) => {
        try {
            setIsLoading(true);
            const response = await getMessageDetail(id);
            console.log({ SingleMsgs: response });
            setMessageId(response?.id);
            setSingleMessage(response);
            setError(null);
        } catch (error) {
            setError(`Error in fetching messages: ${error instanceof Error ? error.message : String(error)}`);
            setUserMessages(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const markMessageRead = React.useCallback(async (id: string) => {
        try {
            setIsLoading(true);
            const response = await markMessageAsRead(id);
            console.log({ response });
            setError(null);
        } catch (error) {
            setError(`Error in fetching messages: ${error instanceof Error ? error.message : String(error)}`);
            setUserMessages(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

   
    return {
        messages,
        userMessageStats,
        error,
        isLoading,
        singleMessage,
        messageId,
        fetchMessages,
        getMsgStats,
        getMessageById,
        markMessageRead
    }

}