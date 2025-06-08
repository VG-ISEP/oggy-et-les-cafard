import { users } from '../data/db';
import { User } from '../types/User';
import { UserRole } from '../types/UserRole';
import { Profile } from '../types/Profile';

const LATENCY = 500; 

const simulateLatency = <T>(data: T): Promise<T> => {
    return new Promise(resolve => {
        setTimeout(() => resolve(data), LATENCY);
    });
};

export const userService = {
    getUsers: async (): Promise<User[]> => {
        return simulateLatency(users.filter(u => u.profile.visibility)) as Promise<User[]>;
    },

    searchUsers: async (params: { 
        term?: string; 
        role?: UserRole | 'all';
        interests?: string[];
        location?: string;
        ageRange?: { min: number; max: number };
        relationshipType?: 'friendship' | 'mentorship' | 'support' | 'all';
        sortBy?: 'relevance' | 'proximity' | 'popularity';
    }): Promise<User[]> => {
        let results = users.filter(u => u.profile.visibility);

        if (params.term) {
            const term = params.term.toLowerCase();
            results = results.filter(u => 
                u.profile.name.toLowerCase().includes(term) ||
                u.profile.bio?.toLowerCase().includes(term)
            );
        }

        if (params.role && params.role !== 'all') {
            results = results.filter(u => u.role === params.role);
        }

        if (params.interests && params.interests.length > 0) {
            results = results.filter(u => 
                params.interests?.every(interest => u.profile.interests?.includes(interest))
            );
        }
        
        if (params.location) {
            const location = params.location.toLowerCase();
            results = results.filter(u => u.profile.location?.toLowerCase().includes(location));
        }

        if (params.ageRange) {
            results = results.filter(u => 
                u.profile.age && u.profile.age >= params.ageRange!.min && u.profile.age <= params.ageRange!.max
            );
        }

        if (params.relationshipType && params.relationshipType !== 'all') {
            results = results.filter(u => u.profile.relationshipType === params.relationshipType);
        }
        
        if (params.sortBy && params.term) {
            switch (params.sortBy) {
                case 'popularity':
                    results.sort((a, b) => (b.profile.interests?.length || 0) - (a.profile.interests?.length || 0));
                    break;
                case 'proximity':
                    results.sort((a, b) => a.profile.location?.localeCompare(b.profile.location || '') || 0);
                    break;
                case 'relevance': 
                default:
                    results.sort((a, b) => {
                        const scoreA = (a.profile.name.match(new RegExp(params.term!, 'gi')) || []).length;
                        const scoreB = (b.profile.name.match(new RegExp(params.term!, 'gi')) || []).length;
                        return scoreB - scoreA;
                    });
                    break;
            }
        }

        return simulateLatency(results) as Promise<User[]>;
    },

    getUser: async (id: string): Promise<User | undefined> => {
        const user = users.find(u => u.id === id);
        return simulateLatency(user) as Promise<User | undefined>;
    },

    getUserByEmail: async (email: string): Promise<User | undefined> => {
        const user = users.find(u => u.email === email);
        return simulateLatency(user) as Promise<User | undefined>;
    },

    updateUserProfile: async (userId: string, profile: Profile): Promise<User | undefined> => {
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            users[userIndex].profile = { ...users[userIndex].profile, ...profile };
            return simulateLatency(users[userIndex]) as Promise<User | undefined>;
        }
        return simulateLatency(undefined) as Promise<User | undefined>;
    },

    requestContact: async (fromUserId: string, toUserId: string): Promise<boolean> => {
        // This is a mock function, in a real app this would create a contact request notification
        console.log(`User ${fromUserId} requested contact with ${toUserId}`);
        return simulateLatency(true) as Promise<boolean>;
    },

    reportUser: async (reporterId: string, reportedUserId: string, reason: string): Promise<boolean> => {
        // This is a mock, in a real app this would create a report against a user
        console.log(`User ${reporterId} reported user ${reportedUserId} for: ${reason}`);
        return simulateLatency(true) as Promise<boolean>;
    },
}; 