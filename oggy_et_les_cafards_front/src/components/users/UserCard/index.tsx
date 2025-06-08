import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../../types/User';
import './style.css';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  if (!user.profile.visibility) {
    return null;
  }

  return (
    <div className="user-card">
      <img src={user.profile.photo} alt={user.profile.name} />
      <h2>{user.profile.name}</h2>
      <p>{user.role}</p>
      <p>{user.profile.bio}</p>
      <Link to={`/profile/${user.id}`}>View Profile</Link>
    </div>
  );
};

export default UserCard; 