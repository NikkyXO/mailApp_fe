import { Link } from "react-router-dom";
import { useMessage } from "../hooks/useMessages";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useLoading } from "../hooks/useLoading";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Inbox, User, Mail } from 'lucide-react';
import React from "react";


const HomePage = () => {
  // const navigate = useNavigate();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { user } = useAuth();
  const { userMessageStats, getMsgStats } = useMessage();


  useEffect(() => {
    const fetchData = async () => {
      if (user && !userMessageStats?.total) {
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
  }, []);


  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
        <LoadingSpinner size={8} color="green-500" message="Fetching data..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">     
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <div className="flex items-center space-x-4">
            <User className="w-12 h-12 text-white bg-white/20 rounded-full p-2" />
            <h1 className="text-3xl font-bold text-white">
              Welcome, {user?.username}
            </h1>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center space-x-3">
                <Mail className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-gray-600">Total Messages</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {userMessageStats?.total || 0}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center space-x-3">
                <Inbox className="w-8 h-8 text-red-500" />
                <div>
                  <p className="text-gray-600">Unread Messages</p>
                  <p className="text-2xl font-bold text-red-600">
                    {userMessageStats?.unread || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Link 
            to="/inbox"
            className="w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            <Inbox className="mr-2" /> View Inbox
          </Link>
        </div>
      </div>
    </div>
  );
};


export default React.memo(HomePage);
