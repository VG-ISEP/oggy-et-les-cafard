import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { User } from '../../types/User';
import { userService } from '../../services/userService';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import './style.css';

const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { currentUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      try {
        setLoading(true);
        const fetchedUser = await userService.getUser(userId);
        if (fetchedUser) {
          setUser(fetchedUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleRequestContact = async () => {
    if (!currentUser || !user) return;
    const success = await userService.requestContact(currentUser.id, user.id);
    if (success) {
      toast.success(`Contact request sent to ${user.profile.name}!`);
    } else {
      toast.error(`Could not send contact request.`);
    }
  };

  const handleReportUser = async () => {
    if (!currentUser || !user || currentUser.id === user.id) return;
    
    const reason = prompt(`Please provide a reason for reporting ${user.profile.name}:`);

    if (reason) {
        const success = await userService.reportUser(currentUser.id, user.id, reason);
        if (success) {
            toast.success(`${user.profile.name} has been reported. Our team will review this shortly.`);
        } else {
            toast.error(`Could not report ${user.profile.name}. Please try again later.`);
        }
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={user.profile.photo} alt={user.profile.name} className="profile-photo" />
        <h1>{user.profile.name}</h1>
        <p>{user.email}</p>
        <p>Role: {user.role}</p>
        <div className="profile-actions">
          {currentUser && currentUser.id === userId ? (
            <Link to="/profile/edit" className="edit-profile-button">Edit Profile</Link>
          ) : currentUser && (
            <>
              <button onClick={handleRequestContact} className="contact-request-button">Request Contact</button>
              <button onClick={handleReportUser} className="report-user-button">Report User</button>
            </>
          )}
        </div>
      </div>
      <div className="profile-details">
        <h2>About Me</h2>
        <p>{user.profile.bio}</p>
        <h2>Interests</h2>
        <div className="tags">
          {user.profile.interests?.map(interest => <span key={interest} className="tag">{interest}</span>)}
        </div>
        <h2>Accessibility Needs</h2>
        <div className="tags">
          {user.profile.accessibilityNeeds?.map(need => <span key={need} className="tag">{need}</span>)}
        </div>
        <h2>Preferences</h2>
        <div className="tags">
          {user.profile.preferences?.map(preference => <span key={preference} className="tag">{preference}</span>)}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 