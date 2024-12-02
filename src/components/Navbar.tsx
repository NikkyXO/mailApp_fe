import { Link } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { Fragment } from 'react/jsx-runtime';
import { useMessage } from '../hooks/useMessages';

const Navbar = () => {
  // Predefined user (as per requirements)
  const { user } = useUser();
  const { userMessageStats } = useMessage();

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold mr-4">Mail App</h1>
          <Link to="/" className="mr-4 hover:text-blue-200">Home</Link>
          <Link to="/inbox" className="hover:text-blue-200">Inbox</Link>
        </div>
        <div className="flex items-center"> 
            { user && (
            <Fragment>
          <span className="mr-4">
            Welcome, {user?.username}
          </span>
          <div className="bg-red-500 rounded-full px-2 py-1 text-sm">
            {userMessageStats?.unread} Unread
          </div>
            </Fragment>
            )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;