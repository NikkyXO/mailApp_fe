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
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useUser();

  const handleApiError = useCallback((error: unknown) => {
    const errorMessage = error instanceof Error ? error.message : String(error);
    setError(`Error occurred: ${errorMessage}`);
  }, []);

  const fetchMessages = useCallback(async () => {
    try {
      if (!user?.id) return;
      setIsLoading(true);
      const response = await fetchUserMessages(user.id);
      setUserMessages(response);
      setError(null);
    } catch (error) {
      handleApiError(error);
      setUserMessages(null);
    } finally {
      setIsLoading(false);
    }
  }, [handleApiError, user?.id]);

  const getMsgStats = useCallback(async () => {
    try {
      if (!user?.id) return;

      setIsLoading(true);
      const response = await getUserMessageStats(user.id);
      if (response) {
        const hasStatsChanged =
          !userMessageStats ||
          response.total !== userMessageStats.total ||
          response.unread !== userMessageStats.unread ||
          response.readCount !== userMessageStats.readCount;
        if (hasStatsChanged) {
          setUserMessagesStats(response);
          setError(null);
        }
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  }, [handleApiError, user?.id, userMessageStats]);

  const getMessageById = useCallback(
    async (id: string) => {
      try {
        setIsLoading(true);
        const response = await getMessageDetail(id);
        if (response) {
          setSingleMessage(response);
          setError(null);
        }
      } catch (error) {
        handleApiError(error);
        setSingleMessage(null);
      } finally {
        setIsLoading(false);
      }
    },
    [handleApiError]
  );

  const markMessageRead = useCallback(
    async (id: string) => {
      try {
        if (!id) return;
        setIsLoading(true);
        await markMessageAsRead(id);
        if (singleMessage?.id === id) {
          setSingleMessage({ ...singleMessage, read: true });
        }
        setError(null);
      } catch (error) {
        handleApiError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [handleApiError, singleMessage]
  );

  const memoizedValues = useMemo(
    () => ({
      messages,
      userMessageStats,
      error,
      isLoading,
      singleMessage,
    }),
    [messages, userMessageStats, error, isLoading, singleMessage]
  );

  return {
    ...memoizedValues,
    fetchMessages,
    getMsgStats,
    getMessageById,
    markMessageRead,
  };
};
