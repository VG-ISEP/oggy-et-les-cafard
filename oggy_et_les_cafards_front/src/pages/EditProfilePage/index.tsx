import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Profile } from '../../types/Profile';
import TagInput from '../../components/forms/TagInput';
import toast from 'react-hot-toast';
import '../../components/forms/Form.css';

const EditProfilePage: React.FC = () => {
  const { currentUser, updateUser } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setProfile({
          ...currentUser.profile,
          interests: currentUser.profile.interests || [],
          accessibilityNeeds: currentUser.profile.accessibilityNeeds || [],
          preferences: currentUser.profile.preferences || [],
      });
    } else {
        navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!profile) return;
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    
    setProfile({ 
        ...profile, 
        [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value 
    });
  };

  const setTagsFor = (field: keyof Profile) => (tags: string[]) => {
      if(!profile) return;
      setProfile({ ...profile, [field]: tags });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser && profile) {
      await updateUser(currentUser.id, profile);
      toast.success("Profile updated successfully!");
      navigate(`/profile/${currentUser.id}`);
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form-container">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={profile.name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea id="bio" name="bio" value={profile.bio || ''} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="photo">Photo URL:</label>
          <input type="text" id="photo" name="photo" value={profile.photo || ''} onChange={handleChange} />
        </div>

        <TagInput 
            label="Interests"
            tags={profile.interests as string[]}
            setTags={setTagsFor('interests')}
        />

        <TagInput 
            label="Accessibility Needs"
            tags={profile.accessibilityNeeds as string[]}
            setTags={setTagsFor('accessibilityNeeds')}
        />

        <TagInput 
            label="Preferences"
            tags={profile.preferences as string[]}
            setTags={setTagsFor('preferences')}
        />

        <div>
            <label htmlFor="visibility">
                <input 
                    type="checkbox" 
                    id="visibility" 
                    name="visibility" 
                    checked={profile.visibility} 
                    onChange={handleChange} 
                />
                Show my profile to others
            </label>
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfilePage; 