import { useEffect } from "react";
import { useMessage } from "../hooks/useMessages";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "./LoadingSpinner";
import { useLoading } from "../hooks/useLoading";
const InboxPage = () => {
  const { messages, fetchMessages } = useMessage();
  const { isLoading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    if (!messages || messages.length === 0) {
      try {
        startLoading();
        fetchMessages();
      } catch (error) {
        console.error("Failed to fetch message stats", error);
      } finally {
        stopLoading();
      }
    }
  }, []);

  if (isLoading) {
    return (
      <div className="absolute top-0 left-0 w-full">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold p-4 border-b">Inbox</h2>
      {messages &&
        messages.map((message) => (
          <Link
            to={`/message/${message.id}`}
            key={message.id}
            className={`block p-4 border-b hover:bg-gray-100 ${
              !message.read ? "bg-blue-50" : ""
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold">{message.subject}</h3>
                <p className="text-gray-600">
                  {message.read
                    ? message.content.slice(0, 200)
                    : message.content.slice(0, 10) + "..."}
                </p>
              </div>
              {!message.read && (
                <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                  Unread
                </span>
              )}
            </div>
          </Link>
        ))}
    </div>
  );
};

export default InboxPage;
