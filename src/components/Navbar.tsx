import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { useMessage } from "../hooks/useMessages";
import  { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Menu, Home, Inbox, LogOut, MessageCircle } from 'lucide-react';


const Navbar = () => {
  const { user, logout } = useAuth();
  const { userMessageStats, getMsgStats } = useMessage();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (user && !userMessageStats?.total) {
        await getMsgStats();
      }
    };
    fetchData();
  }, [])

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo and Desktop Menu */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-8 h-8 text-white" />
              <h1 className="text-2xl font-bold text-white">Mail App</h1>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-white hover:text-blue-200 transition duration-300"
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>
              <Link 
                to="/inbox" 
                className="flex items-center space-x-2 text-white hover:text-blue-200 transition duration-300 relative"
              >
                <Inbox className="w-5 h-5" />
                <span>Inbox</span>
                {userMessageStats && userMessageStats?.unread > 0 && (
                  <span className="absolute -top-2 -right-4 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">
                    {userMessageStats.unread}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <Fragment>
                <div className="hidden md:flex items-center space-x-4">
                  <span className="text-white">
                    Welcome, {user.username}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-white hover:text-red-300 transition duration-300"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                  className="md:hidden text-white"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <Menu className="w-6 h-6" />
                </button>
              </Fragment>
            ) : null}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden absolute left-0 right-0 bg-blue-700 shadow-lg">
            <div className="px-4 pt-2 pb-4 space-y-2">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white">
                  Welcome, {user?.username}
                </span>
                {userMessageStats && userMessageStats?.unread > 0 && (
                  <span className="bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">
                    {userMessageStats.unread} Unread
                  </span>
                )}
              </div>
              <Link
                to="/"
                className="block py-2 text-white hover:bg-blue-600 rounded transition"
                onClick={() => setMenuOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <Home className="w-5 h-5" />
                  <span>Home</span>
                </div>
              </Link>
              <Link
                to="/inbox"
                className="block py-2 text-white hover:bg-blue-600 rounded transition"
                onClick={() => setMenuOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <Inbox className="w-5 h-5" />
                  <span>Inbox</span>
                </div>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full text-left py-2 text-white hover:bg-blue-600 rounded transition"
              >
                <div className="flex items-center space-x-2">
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );

};

export default Navbar;

