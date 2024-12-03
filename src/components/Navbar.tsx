import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { Fragment } from "react/jsx-runtime";
import { useMessage } from "../hooks/useMessages";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user } = useUser();
  const { userMessageStats, getMsgStats } = useMessage();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await getMsgStats();
    };
    fetchData();
  })

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Menu */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold mr-4">Mail App</h1>

          <div className="hidden md:flex space-x-4">
            <Link to="/" className="mr-4 hover:text-blue-200">
              Home
            </Link>
            <Link to="/inbox" className="hover:text-blue-200">
              Inbox
            </Link>
          </div>
        </div>
        <div className="flex items-center">
          {user && (
            <Fragment>
              <span className="mr-4">Welcome, {user?.username}</span>
              {userMessageStats && userMessageStats?.unread && (
                <div className="hidden md:block bg-red-500 rounded-full px-2 py-1 text-sm">
                  {userMessageStats?.unread} Unread
                </div>
              )}

              <button
                className="md:hidden text-white"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </Fragment>
          )}
        </div>
      </div>

      {/* Nav Links for Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4">
          <Link
            to="/"
            className="block p-2 hover:bg-blue-700 hover:text-white"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/inbox"
            className="block p-2 hover:bg-blue-700 hover:text-white"
            onClick={() => setMenuOpen(false)}
          >
            Inbox
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
