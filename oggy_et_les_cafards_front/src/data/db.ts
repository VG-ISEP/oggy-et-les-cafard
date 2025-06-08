import { User } from '../types/User';
import { Event } from '../types/Event';
import { Message } from '../types/Message';
import { Match } from '../types/Match';

export const users: User[] = [
  {
    id: '1',
    email: 'heloise@example.com',
    role: 'bénéficiaire',
    profile: {
      name: 'Héloïse',
      age: 28,
      bio: 'Loves to paint and read. Looking for a friend to visit museums and quiet cafes with.',
      photo: 'https://i.pravatar.cc/150?u=heloise',
      location: 'Paris, France',
      interests: ['painting', 'reading', 'movies', 'art history'],
      accessibilityNeeds: ['wheelchair access', 'step-free routes'],
      preferences: ['quiet places', 'one-on-one meetups'],
      relationshipType: 'friendship',
      visibility: true,
    },
  },
  {
    id: '2',
    email: 'victor@example.com',
    role: 'volontaire',
    profile: {
      name: 'Victor',
      age: 35,
      bio: 'Patient and friendly volunteer. Enjoys hiking and cooking. Happy to help with errands or just be a listening ear.',
      photo: 'https://i.pravatar.cc/150?u=victor',
      location: 'Lyon, France',
      interests: ['hiking', 'cooking', 'music', 'volunteering'],
      accessibilityNeeds: [],
      preferences: ['outdoor activities', 'helping others'],
      relationshipType: 'mentorship',
      visibility: true,
    },
  },
    {
    id: '3',
    email: 'alexis@example.com',
    role: 'volontaire',
    profile: {
      name: 'Alexis',
      age: 22,
      bio: 'Software developer and cat lover. I can be a bit shy and prefer texting before meeting. Happy to help with tech issues.',
      photo: 'https://i.pravatar.cc/150?u=alexis',
      location: 'Marseille, France',
      interests: ['coding', 'cats', 'video games', 'social anxiety'],
      accessibilityNeeds: [],
      preferences: ['text-based communication', 'small groups'],
      relationshipType: 'friendship',
      visibility: true,
    },
  },
  {
    id: '4',
    email: 'chloe@example.com',
    role: 'bénéficiaire',
    profile: {
      name: 'Chloé',
      age: 45,
      bio: 'Librarian who loves classical music. I find large crowds overwhelming, so I\'m looking for someone to chat with about books or visit a quiet museum.',
      photo: 'https://i.pravatar.cc/150?u=chloe',
      location: 'Bordeaux, France',
      interests: ['books', 'music', 'gardening', 'history'],
      accessibilityNeeds: ['agoraphobia support'],
      preferences: ['calm environments', 'predictable schedules'],
      relationshipType: 'friendship',
      visibility: true,
    },
  },
  {
    id: '5',
    email: 'lucas@example.com',
    role: 'volontaire',
    profile: {
      name: 'Lucas',
      age: 25,
      bio: 'University student studying physiotherapy. I enjoy sports and have experience working with people with mobility challenges.',
      photo: 'https://i.pravatar.cc/150?u=lucas',
      location: 'Lille, France',
      interests: ['sports', 'running', 'physiotherapy', 'movies'],
      accessibilityNeeds: [],
      preferences: ['active outings'],
      relationshipType: 'support',
      visibility: true,
    },
  },
  {
    id: '6',
    email: 'manon@example.com',
    role: 'bénéficiaire',
    profile: {
      name: 'Manon',
      age: 68,
      bio: 'Retired teacher. I need some help with grocery shopping and technology. I have hearing loss, so I prefer written communication.',
      photo: 'https://i.pravatar.cc/150?u=manon',
      location: 'Nice, France',
      interests: ['storytelling', 'knitting', 'cooking'],
      accessibilityNeeds: ['assistance with carrying heavy items', 'hearing impairment'],
      preferences: ['phone calls', 'written instructions'],
      relationshipType: 'support',
      visibility: true,
    },
  },
  {
    id: '7',
    email: 'arthur@example.com',
    role: 'volontaire',
    profile: {
      name: 'Arthur',
      age: 31,
      bio: 'Graphic designer who works from home. I can get anxious in new social situations but I warm up quickly. Big fan of sci-fi.',
      photo: 'https://i.pravatar.cc/150?u=arthur',
      location: 'Strasbourg, France',
      interests: ['design', 'sci-fi', 'board games', 'technology'],
      accessibilityNeeds: ['social anxiety'],
      preferences: ['clear communication', 'casual meetups'],
      relationshipType: 'mentorship',
      visibility: true,
    },
  },
   {
    id: '8',
    email: 'camille@example.com',
    role: 'bénéficiaire',
    profile: {
      name: 'Camille',
      age: 21,
      bio: 'Art student looking for a mentor. I have dyslexia, so I appreciate patience with reading/writing. I love photography and visiting galleries.',
      photo: 'https://i.pravatar.cc/150?u=camille',
      location: 'Strasbourg, France',
      interests: ['art', 'photography', 'design', 'museums'],
      accessibilityNeeds: ['dyslexia support'],
      preferences: ['creative collaboration', 'visual learning'],
      relationshipType: 'mentorship',
      visibility: true,
    },
  },
  {
    id: '9',
    email: 'julien@example.com',
    role: 'bénéficiaire',
    profile: {
      name: 'Julien',
      age: 34,
      bio: 'I\'m a writer who works from home. I deal with chronic fatigue, so my energy levels can be unpredictable, but I love deep conversations about film and literature.',
      photo: 'https://i.pravatar.cc/150?u=julien',
      location: 'Paris, France',
      interests: ['film', 'literature', 'writing', 'chess'],
      accessibilityNeeds: ['understanding about energy levels', 'flexible scheduling'],
      preferences: ['low-energy activities', 'online chat'],
      relationshipType: 'friendship',
      visibility: true,
    },
  },
    {
    id: '10',
    email: 'emma@example.com',
    role: 'volontaire',
    profile: {
      name: 'Emma',
      age: 26,
      bio: 'Psychology student specializing in anxiety. I\'m a patient listener and I love creating a comfortable space for people. I enjoy calm activities like walking in the park.',
      photo: 'https://i.pravatar.cc/150?u=emma',
      location: 'Paris, France',
      interests: ['psychology', 'mindfulness', 'art', 'nature walks'],
      accessibilityNeeds: [],
      preferences: ['one-on-one meetings', 'calm environments'],
      relationshipType: 'support',
      visibility: true,
    },
  },
];

export const events: Event[] = [
  {
    id: 'evt1',
    title: 'Community Picnic',
    description: 'A fun picnic for everyone.',
    date: '2025-07-15T14:00:00Z',
    location: 'Central Park',
    participants: ['1', '2'],
  },
  {
    id: 'evt2',
    title: 'Quiet Museum Visit',
    description: 'Visit the new art exhibition during off-peak hours to avoid crowds. A calm and inspiring outing.',
    date: '2025-08-01T11:00:00Z',
    location: 'City Art Museum',
    participants: ['1', '4'],
  },
  {
    id: 'evt3',
    title: 'Inclusive Board Game Night',
    description: 'Join us for a night of fun in a reserved, quiet area of the cafe. Small group event, perfect for a relaxed evening.',
    date: '2025-08-10T18:00:00Z',
    location: 'The Friendly Dragon Cafe',
    participants: ['7', '8', '3'],
  },
  {
    id: 'evt4',
    title: 'Local Market Tour',
    description: 'Explore the tastes and smells of the local market. We can help with carrying bags.',
    date: '2025-08-12T09:30:00Z',
    location: 'Old Town Market Square',
    participants: ['6', '5'],
  },
  {
    id: 'evt5',
    title: 'Book Club Meeting',
    description: 'This month we are discussing "The Midnight Library". Join us for a lively chat.',
    date: '2025-08-20T19:00:00Z',
    location: 'Bordeaux Public Library',
    participants: ['4', '2'],
  },
  {
    id: 'evt6',
    title: 'Group Run',
    description: 'A friendly 5k run through the city park. All paces welcome.',
    date: '2025-08-05T08:00:00Z',
    location: 'Lille City Park',
    participants: ['5'],
  }
];

export const messages: Message[] = [
    {
        id: 'msg1',
        senderId: '1',
        receiverId: '2',
        text: 'Hi Victor, looking forward to the picnic!',
        timestamp: '2025-07-14T10:00:00Z'
    },
    {
        id: 'msg2',
        senderId: '2',
        receiverId: '1',
        text: 'Hi Héloïse, me too! It will be great.',
        timestamp: '2025-07-14T10:05:00Z'
    },
    {
        id: 'msg3',
        senderId: '4',
        receiverId: '2',
        text: 'Hi Victor, I saw you like cooking. Any favorite recipes?',
        timestamp: '2025-07-15T11:00:00Z'
    },
    {
        id: 'msg4',
        senderId: '7',
        receiverId: '8',
        text: 'Hi Camille, I saw you\'re an art student. I\'d be happy to chat about graphic design sometime.',
        timestamp: '2025-07-20T15:00:00Z'
    },
    {
        id: 'msg5',
        senderId: '8',
        receiverId: '7',
        text: 'Hi Arthur! That would be amazing. Thank you!',
        timestamp: '2025-07-20T16:30:00Z'
    },
    {
        id: 'msg6',
        senderId: '5',
        receiverId: '6',
        text: 'Hello Manon, I can help with your groceries this week if you like.',
        timestamp: '2025-07-21T09:00:00Z'
    },
    {
        id: 'msg7',
        senderId: '10',
        receiverId: '9',
        text: 'Hi Julien, I read your profile. I also love films! No pressure at all, but if you\'d ever like to chat about them, I\'m here.',
        timestamp: '2025-07-22T11:00:00Z'
    },
    {
        id: 'msg8',
        senderId: '9',
        receiverId: '10',
        text: 'Hi Emma. That\'s very kind of you, thank you. I\'d like that. Have you seen the latest movie by director Yorgos Lanthimos?',
        timestamp: '2025-07-22T18:20:00Z'
    }
];

export const matches: Match[] = [
    {
        id: 'match1',
        userIds: ['1', '2'],
        timestamp: '2025-07-13T12:00:00Z'
    },
    {
        id: 'match2',
        userIds: ['4', '2'],
        timestamp: '2025-07-14T18:00:00Z'
    },
    {
        id: 'match3',
        userIds: ['7', '8'],
        timestamp: '2025-07-19T11:00:00Z'
    },
    {
        id: 'match4',
        userIds: ['5', '6'],
        timestamp: '2025-07-20T20:00:00Z'
    },
    {
        id: 'match5',
        userIds: ['1', '4'],
        timestamp: '2025-07-22T14:00:00Z'
    },
    {
        id: 'match6',
        userIds: ['9', '10'],
        timestamp: '2025-07-22T10:00:00Z'
    },
    {
        id: 'match7',
        userIds: ['3', '8'],
        timestamp: '2025-07-23T11:00:00Z'
    }
]; 