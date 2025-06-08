import React, { useState, useEffect } from 'react';
import { User } from '../../types/User';
import { userService } from '../../services/userService';
import UserList from '../../components/users/UserList';

const HomePage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Welcome to Hingage</h1>
      <p>This is the home page. Check out our users:</p>
      {loading ? <p>Loading users...</p> : <UserList users={users} />}
    </div>
  );
};

export default HomePage; 