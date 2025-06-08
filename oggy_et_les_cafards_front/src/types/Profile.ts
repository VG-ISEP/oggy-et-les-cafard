export interface Profile {
  name: string;
  age?: number;
  bio?: string;
  photo?: string;
  location?: string;
  tags?: string[];
  interests?: string[];
  accessibilityNeeds?: string[];
  preferences?: string[];
  relationshipType?: 'friendship' | 'mentorship' | 'support';
  visibility: boolean;
} 