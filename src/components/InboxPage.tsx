
import { useEffect } from 'react';
import { useMessage } from '../hooks/useMessages';
import { Link } from 'react-router-dom';

const InboxPage = () => {

  const { messages, fetchMessages, isLoading} = useMessage();

  useEffect(() => {
    const fetchData = async () => {
      if (!messages || messages.length === 0) {
        await fetchMessages();
      }
    };
    fetchData();
  }, [fetchMessages, messages]);


  return (
    <div className="bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold p-4 border-b">Inbox</h2>
       {messages?.length === 0 && isLoading ? (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : messages ? (
          messages.map(message => (
            <Link 
              to={`/message/${message.id}`} 
              key={message.id} 
              className={`block p-4 border-b hover:bg-gray-100 ${!message.read? 'bg-blue-50' : ''}`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{message.subject}</h3>
                  <p className="text-gray-600">
                    {message.read 
                      ? message.content.slice(0, 200) 
                      : message.content.slice(0, 10) + '...'}
                  </p>
                </div>
                {!message.read && (
                  <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                    Unread
                  </span>
                )}
              </div>
            </Link>
          ))
        ): (
          <p className="text-gray-600 p-4">No messages to display for now.</p>
        )}
    </div>
  );
};

export default InboxPage;