import { useState, useCallback, useMemo } from "react";
import {
  fetchUserMessages,
  getUserMessageStats,
  getMessageDetail,
  markMessageAsRead,
} from "../services/api";
import { useUser } from "./useUser";
import { Message, MessageStats } from "../types";
export const useMessage = () => {
  const [messages, setUserMessages] = useState<Message[] | null>(null);
  const [userMessageStats, setUserMessagesStats] =
    useState<MessageStats | null>(null);
  const [singleMessage, setSingleMessage] = useState<Message | null>(null);
  const [messageId, setMessageId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useUser();

  const fetchMessages = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetchUserMessages(user?.id || "");
      setUserMessages(response);
      setError(null);
    } catch (error) {
      setError(`Error in fetching messages: ${error}`);
      setUserMessages(null);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  const getMsgStats = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getUserMessageStats(user?.id || "");
      if (!response) {
        return;
      }
      setUserMessagesStats(response);
      setError(null);
    } catch (error) {
      setError(
        `Error in fetching messages: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
      setUserMessages(null);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  const getMessageById = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      const response = await getMessageDetail(id);
      setMessageId(response?.id);
      setSingleMessage(response);
      setError(null);
    } catch (error) {
      setError(
        `Error in fetching messages: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
      setUserMessages(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const markMessageRead = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      await markMessageAsRead(id);
      if (singleMessage?.id === id) {
        setSingleMessage({ ...singleMessage, read: true });
      }
      setError(null);
    } catch (error) {
      setError(
        `Error in fetching messages: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
      setUserMessages(null);
    } finally {
      setIsLoading(false);
    }
  }, [singleMessage]);

  const memoizedValues = useMemo(() => ({
    messages,
    userMessageStats,
    error,
    isLoading,
    singleMessage,
    messageId,
  }), [messages, userMessageStats, error, isLoading, singleMessage, messageId]);

  return {
    ...memoizedValues,
    fetchMessages,
    getMsgStats,
    getMessageById,
    markMessageRead,
  };
};
