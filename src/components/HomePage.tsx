import { Link } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { useMessage } from '../hooks/useMessages';
import { useEffect } from 'react';

const HomePage = () => {
    const { user, getUser } = useUser();
    const { userMessageStats, getMsgStats, fetchMessages, messages  } = useMessage();
    

    useEffect(() => {
      const fetchData = async () => {
        if (!user) {
          await getUser();
        }
        if (!userMessageStats) {
          await getMsgStats();
        }
        if (!messages || messages.length === 0) {
          await fetchMessages();
        }
    };
    fetchData();
    }, [fetchMessages, getMsgStats, getUser, messages, user, userMessageStats]);



  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.username}!</h1>
      <div className="space-y-4">
        <p>You have <span className="font-bold text-blue-600">{userMessageStats?.total}</span> total messages.</p>
        <p>
          <span className="font-bold text-red-600">{userMessageStats?.unread}</span> messages are currently unread.
        </p>
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