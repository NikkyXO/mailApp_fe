import { Link, useNavigate } from "react-router-dom";
import { useMessage } from "../hooks/useMessages";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useLoading } from "../hooks/useLoading";
import { LoadingSpinner } from "./LoadingSpinner";

const HomePage = () => {
  const navigate = useNavigate();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { user } = useAuth();
  const { userMessageStats, getMsgStats } = useMessage();



  useEffect(() => {
    const fetchData = async () => {
      if (user && !userMessageStats) {
        try {
          startLoading();
          await getMsgStats();
        } catch (error) {
          console.error("Failed to fetch message stats", error);
        } finally {
          stopLoading();
        }
      }
    };
    fetchData();
  }, [getMsgStats, user, userMessageStats])

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (isLoading) {
    return (
      <div className="absolute top-0 left-0 w-full">
          <LoadingSpinner />
        </div>
    )
  }


  return (
    <div className="bg-white shadow-md rounded-lg p-10">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.username}</h1>
      <div className="space-y-4">
       
          <div>
            {userMessageStats && userMessageStats.total > 0 && (
              <p>
                You have{" "}
                <span className="font-bold text-blue-600">
                  {userMessageStats?.total}
                </span>{" "}
                total messages.
              </p>
            )}
            {userMessageStats && userMessageStats.unread >= 1 && (
              <p>
                <span className="font-bold text-red-600">
                  {userMessageStats?.unread}
                </span>{" "}
                messages are currently unread.
              </p>
            )}
          </div>
        {/* )} */}

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
