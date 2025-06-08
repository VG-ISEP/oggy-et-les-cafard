import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './NavBar.css';

const NavBar: React.FC = () => {
  const { currentUser, logout } = useAuth();

  const handleSOS = () => {
    // TODO: Implement real SOS functionality (e.g., send location to trusted contacts)
    alert('SOS button pressed! In a real app, this would send an alert to your trusted contacts.');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">Hingage</Link>
      <div className="nav-main-links">
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/search" className="nav-link">Search</Link>
          </li>
          <li className="nav-item">
            <Link to="/events" className="nav-link">Events</Link>
          </li>
          {currentUser ? (
            <>
              <li className="nav-item">
                <Link to="/messages" className="nav-link">Messages</Link>
              </li>
              <li className="nav-item">
                <Link to={`/profile/${currentUser.id}`} className="nav-link">Profile</Link>
              </li>
              <li className="nav-item">
                <Link to="/profile/edit" className="nav-link">Settings</Link>
              </li>
              <li className="nav-item">
                <button onClick={logout} className="nav-button">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <button onClick={handleSOS} className="sos-button">SOS</button>
    </nav>
  );
};

export default NavBar; 