export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  participants: string[]; // array of user ids
} 