import { useParams, Link } from "react-router-dom";
import { useMessage } from "../hooks/useMessages";
import { useEffect } from "react";
import { 
  ArrowLeft, 
  Mail, 
  User, 
  Calendar, 
  Reply, 
  MoreVertical 
} from 'lucide-react';
import { LoadingSpinner } from "./LoadingSpinner";
import React from "react";

const MessageDetailPage = () => {
  const { getMessageById, singleMessage, markMessageRead } = useMessage();
  const { id } = useParams();
  useEffect(() => {
    const loadMessage = async () => {
      if (id && (!singleMessage || singleMessage?.id !== id)) {
        await getMessageById(id);
      }
      if (id && singleMessage && !singleMessage.read) {
        await markMessageRead(id);
      }
    };
    loadMessage();
  }, [getMessageById, id, markMessageRead, singleMessage]);

  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <Mail className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700">
            Message Not Found
          </h2>
          <Link 
            to="/inbox" 
            className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Return to Inbox
          </Link>
        </div>
      </div>
    );
  }

  if (!singleMessage) {
    return <LoadingSpinner className="mt-20" message="Loading message..." />;
  }



  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <div className="flex justify-between items-center">
            <Link 
              to="/inbox" 
              className="text-white hover:bg-white/20 p-2 rounded-full transition"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="flex items-center space-x-2">
              <button className="text-white hover:bg-white/20 p-2 rounded-full transition">
                <Reply className="w-6 h-6" />
              </button>
              <button className="text-white hover:bg-white/20 p-2 rounded-full transition">
                <MoreVertical className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {singleMessage.subject}
          </h2>

          <div className="flex items-center space-x-4 mb-6 text-gray-600">
            <div className="bg-blue-100 p-2 rounded-full">
              <User className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">
                {singleMessage.username}
              </p>
              <p className="text-sm flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(singleMessage?.createdAt ?? '').toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700 leading-relaxed">
            <p>{singleMessage.content}</p>
          </div>

          <div className="mt-8 flex space-x-4">
            <Link
              to="/inbox"
              className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Inbox</span>
            </Link>
            {/* <button
              className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              <Reply className="w-5 h-5" />
              <span>Reply</span>
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default React.memo(MessageDetailPage);
