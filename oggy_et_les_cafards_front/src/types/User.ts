import { Profile } from './Profile';
import { UserRole } from './UserRole';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  profile: Profile;
} 