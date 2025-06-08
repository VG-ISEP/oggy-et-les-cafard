import React, { useState, useEffect, useCallback } from 'react';
import { User } from '../../types/User';
import { UserRole } from '../../types/UserRole';
import { userService } from '../../services/userService';
import UserList from '../../components/users/UserList';
import './style.css';

const SearchPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters and sorting state
  const [filters, setFilters] = useState({
    term: '',
    role: 'all' as UserRole | 'all',
    interest: '',
    location: '',
    minAge: '',
    maxAge: '',
    relationshipType: 'all' as 'friendship' | 'mentorship' | 'support' | 'all',
  });
  const [sortBy, setSortBy] = useState<'relevance' | 'proximity' | 'popularity'>('relevance');

  const searchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        term: filters.term,
        role: filters.role,
        interests: filters.interest ? filters.interest.split(',').map(i => i.trim()) : [],
        location: filters.location,
        ageRange: {
          min: Number(filters.minAge) || 18,
          max: Number(filters.maxAge) || 100,
        },
        relationshipType: filters.relationshipType,
        sortBy: sortBy,
      };
      const fetchedUsers = await userService.searchUsers(params);
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error fetching users", error);
    } finally {
      setLoading(false);
    }
  }, [filters, sortBy]);


  useEffect(() => {
    searchUsers();
  }, [searchUsers]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h1>Search Profiles</h1>
      <div className="search-filters">
        <input 
            name="term"
            type="text" 
            placeholder="Search by name or bio..."
            value={filters.term}
            onChange={handleFilterChange}
        />
        <input 
            name="interest"
            type="text" 
            placeholder="Interests (comma-separated)..."
            value={filters.interest}
            onChange={handleFilterChange}
        />
        <input 
            name="location"
            type="text" 
            placeholder="Filter by location..."
            value={filters.location}
            onChange={handleFilterChange}
        />
        <input
            name="minAge"
            type="number"
            placeholder="Min Age"
            value={filters.minAge}
            onChange={handleFilterChange}
        />
        <input
            name="maxAge"
            type="number"
            placeholder="Max Age"
            value={filters.maxAge}
            onChange={handleFilterChange}
        />
        <select name="role" value={filters.role} onChange={handleFilterChange}>
          <option value="all">All Roles</option>
          <option value="bénéficiaire">Bénéficiaire</option>
          <option value="volontaire">Volontaire</option>
        </select>
        <select name="relationshipType" value={filters.relationshipType} onChange={handleFilterChange}>
            <option value="all">Any Relationship</option>
            <option value="friendship">Friendship</option>
            <option value="mentorship">Mentorship</option>
            <option value="support">Support</option>
        </select>
        <select name="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
            <option value="relevance">Sort by Relevance</option>
            <option value="proximity">Sort by Proximity</option>
            <option value="popularity">Sort by Popularity</option>
        </select>
      </div>

      {loading ? <p>Loading users...</p> : <UserList users={users} />}
    </div>
  );
};

export default SearchPage; 