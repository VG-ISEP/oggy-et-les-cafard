import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/index';
import LoginPage from './pages/LoginPage/index';
import RegisterPage from './pages/RegisterPage/index';
import ProfilePage from './pages/ProfilePage/index';
import SearchPage from './pages/SearchPage/index';
import EventsPage from './pages/EventsPage/index';
import MessagesPage from './pages/MessagesPage/index';
import EditProfilePage from './pages/EditProfilePage/index';
import ForgotPasswordPage from './pages/ForgotPasswordPage/index';
import { AuthProvider } from './contexts/AuthContext';
import NavBar from './components/navigation/NavBar';
import { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <NavBar />
          <Toaster position="top-center" reverseOrder={false} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile/:userId" element={<ProfilePage />} />
              <Route path="/profile/edit" element={<EditProfilePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
