import { useState } from "react";
import { fetchUserMessages, getUserMessageStats, getMessageDetail, markMessageAsRead } from "../services/api";
import { useUser } from "./useUser";
import { Message, MessageStats } from "../types";
export const useMessage = () => {
    const [messages, setUserMessages ] = useState<[Message] | null>(null);
    const [ userMessageStats, setUserMessagesStats ] = useState<MessageStats | null>(null);
    const [ singleMessage, setSingleMessage ] = useState<Message | null>(null);
    const [ messageId, setMessageId ] = useState<string | null>(null);
    const [ error, setError ] = useState<string | null>(null);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const { user } = useUser();

    const fetchMessages = async () => {
        try {
            setIsLoading(true);
            const response = await fetchUserMessages(user?.id || '');
            setUserMessages(response);
            setError(null);
        } catch (error) {
            setError(`Error in fetching messages: ${error}`);
            setUserMessages(null);
        } finally {
            setIsLoading(false);
        }
    };

    const getMsgStats = async () => {
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
    };

    const getMessageById = async (id: string) => {
        try {
            setIsLoading(true);
            const response = await getMessageDetail(id);
            setMessageId(response?.id);
            setSingleMessage(response);
            setError(null);
        } catch (error) {
            setError(`Error in fetching messages: ${error instanceof Error ? error.message : String(error)}`);
            setUserMessages(null);
        } finally {
            setIsLoading(false);
        }
    };

    const markMessageRead = async (id: string) => {
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
    };

   
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