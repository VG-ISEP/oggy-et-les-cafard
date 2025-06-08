import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import UserCard from './index';
import { User } from '../../../types/User';

const mockUser: User = {
  id: 'test-id',
  email: 'test@example.com',
  role: 'volontaire',
  profile: {
    name: 'Test User',
    bio: 'A test bio.',
    photo: 'https://i.pravatar.cc/150?u=test',
    visibility: true,
  },
};

describe('UserCard', () => {
  it('renders user information correctly', () => {
    render(
      <Router>
        <UserCard user={mockUser} />
      </Router>
    );

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('volontaire')).toBeInTheDocument();
    expect(screen.getByAltText('Test User')).toHaveAttribute('src', 'https://i.pravatar.cc/150?u=test');
  });

  it('contains a link to the user profile', () => {
    render(
      <Router>
        <UserCard user={mockUser} />
      </Router>
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', '/profile/test-id');
  });
}); 