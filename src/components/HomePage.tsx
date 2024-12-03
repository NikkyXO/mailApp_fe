import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useMessage } from "../hooks/useMessages";
import { useEffect } from "react";

const HomePage = () => {
  const { user, getUser } = useUser();
  const { userMessageStats, getMsgStats, fetchMessages, isLoading } =
    useMessage();

  useEffect(() => {
    getUser();
    fetchMessages();
    getMsgStats();
  }, [fetchMessages, getMsgStats, getUser]);


  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.username}</h1>
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div>
            {userMessageStats && userMessageStats?.total > 0 && (
              <p>
                You have{" "}
                <span className="font-bold text-blue-600">
                  {userMessageStats?.total}
                </span>{" "}
                total messages.
              </p>
            )}
            {userMessageStats && userMessageStats?.unread >= 1 && (
              <p>
                <span className="font-bold text-red-600">
                  {userMessageStats?.unread}
                </span>{" "}
                messages are currently unread.
              </p>
            )}
          </div>
        )}

        <Link
          to="/inbox"
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          View Inbox
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
