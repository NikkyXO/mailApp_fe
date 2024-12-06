import { useEffect, useRef, memo } from "react";
import { useMessage } from "../hooks/useMessages";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "./LoadingSpinner";
import { useLoading } from "../hooks/useLoading";
import { Mail, MailOpen, Clock, AlertCircle, EyeOff } from "lucide-react";
import { Message } from "../types";

export interface InboxPageProps {
  messages: Message[];
}
const InboxPage = () => {
  const { messages, fetchMessages, markMessageUnRead } = useMessage();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const initialFetchRef = useRef(false);

  useEffect(() => {
    const loadMessages = async () => {
      if (!initialFetchRef.current && (!messages || messages.length === 0)) {
        try {
          startLoading();
          await fetchMessages();
          initialFetchRef.current = true;
        } catch (error) {
          console.error("Failed to fetch messages", error);
        } finally {
          stopLoading();
        }
      }
    };
    loadMessages();
  }, []);

  const handleMarkAsUnread = async (e: React.MouseEvent, messageId: string) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await markMessageUnRead(messageId);
      window.location.reload();
    } catch (error) {
      console.error("Failed to mark message as unread", error);
    }
  };

  if (isLoading) {
    return <LoadingSpinner className="mt-20" message="Loading messages..." />;
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center text-center p-6">
        <AlertCircle className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-600 mb-2">
          Your inbox is empty
        </h2>
        <p className="text-gray-500 mb-6">
          You have no messages at the moment.
        </p>
        <Link
          to="/compose"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition flex items-center space-x-2"
        >
          <Mail className="w-5 h-5" />
          <span>Compose New Message</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
        <div className="flex items-center space-x-4">
          <Mail className="w-10 h-10 text-white bg-white/20 rounded-full p-2" />
          <h2 className="text-3xl font-bold text-white">Inbox</h2>
        </div>
      </div>
  
      <div className="divide-y divide-gray-100">
        {messages.map((message) => (
          <Link
            to={`/message/${message.id}`}
            key={message.id}
            className={`
              block p-6 hover:bg-gray-50 transition duration-300
              ${!message.read ? "bg-blue-50/50" : ""}
              group relative
            `}
          >
            <div className="flex items-start space-x-4">
              {message.read ? (
                <MailOpen className="w-6 h-6 text-gray-400" />
              ) : (
                <Mail className="w-6 h-6 text-blue-500" />
              )}
  
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
                    {message.subject}
                  </h3>
                  {/* Mark as Unread Button for Read Messages */}
                  {message.read ? (
                    <button
                      onClick={(e) => handleMarkAsUnread(e, message.id)}
                      className="
                        mr-5 mt-5
                        hover:text-blue-500
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-300
                        bg-green-500 text-white px-2 py-1 rounded-full
                        flex items-center justify-center
                      "
                      title="Mark as Unread"
                    >
                      <EyeOff className="w-4 h-4" />
                    </button>
                  ) : (
                    <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                      Unread
                    </span>
                  )}

                </div>
  
                <p className="text-gray-600 line-clamp-2">
                  {message.content.slice(0, 200)}
                </p>
  
                <div className="flex items-center text-sm text-gray-500 mt-2 space-x-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatDate(message?.createdAt ?? "")}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
  
      {messages.length > 10 && (
        <div className="bg-gray-50 p-4 text-center">
          <Link
            to="/inbox/all"
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            View All Messages
          </Link>
        </div>
      )}
    </div>
  );

};

export default memo(InboxPage);

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
