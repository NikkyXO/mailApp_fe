import { useParams, Link } from "react-router-dom";
import { useMessage } from "../hooks/useMessages";
import { useEffect } from "react";

const MessageDetailPage = () => {
  const { getMessageById, singleMessage } = useMessage();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getMessageById(id);
    }
  }, [id, getMessageById]);

  if (!id) {
    return <div>Message not found</div>;
  }

  if (!singleMessage) {
    return <div>Loading message...</div>;
  }


  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="mb-4 border-b pb-4">
        <h2 className="text-2xl font-bold">{singleMessage.subject}</h2>
        <div className="text-gray-600 mt-2">
          <span>From: {singleMessage.username}</span>
          {/* <span className="ml-4">Date: {singleMessage.date}</span> */}
        </div>
      </div>
      <div className="prose max-w-none">
        <p>{singleMessage.content}</p>
      </div>
      <div className="mt-6">
        <Link
          to="/inbox"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Back to Inbox
        </Link>
      </div>
    </div>
  );
};

export default MessageDetailPage;
