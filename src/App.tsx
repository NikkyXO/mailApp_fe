
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import InboxPage from './components/InboxPage';
import MessageDetailPage from './components/MessageDetailPage';
import { UserProvider } from './contexts/user.provider';


const App = () => {
  return (
    <UserProvider>
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/inbox" element={<InboxPage />} />
            <Route path="/message/:id" element={<MessageDetailPage />} />
          </Routes>
        </div>
      </div>
    </Router>
    </UserProvider>
  );
};

export default App;
