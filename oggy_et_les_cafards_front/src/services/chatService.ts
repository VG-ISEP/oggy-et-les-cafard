import { messages, matches } from '../data/db';
import { Message } from '../types/Message';
import { Match } from '../types/Match';

const LATENCY = 500;

const simulateLatency = <T>(data: T): Promise<T> => {
    return new Promise(resolve => {
        setTimeout(() => resolve(data), LATENCY);
    });
};

export const chatService = {
    sendMessage: async (senderId: string, receiverId: string, text: string): Promise<Message> => {
        const newMessage: Message = {
            id: `msg${Math.random()}`,
            senderId,
            receiverId,
            text,
            timestamp: new Date().toISOString()
        };
        messages.push(newMessage);
        return simulateLatency(newMessage) as Promise<Message>;
    },

    getMessages: async (matchId: string): Promise<Message[]> => {
        const match = matches.find(m => m.id === matchId);
        if (!match) return simulateLatency([]) as Promise<Message[]>;
        
        const conversation = messages.filter(msg => 
            (msg.senderId === match.userIds[0] && msg.receiverId === match.userIds[1]) ||
            (msg.senderId === match.userIds[1] && msg.receiverId === match.userIds[0])
        );
        return simulateLatency(conversation) as Promise<Message[]>;
    },

    getMatches: async (userId: string): Promise<Match[]> => {
        const userMatches = matches.filter(m => m.userIds.includes(userId));
        return simulateLatency(userMatches) as Promise<Match[]>;
    }
}; 