import { chatService } from './chatService';
import { messages } from '../data/db';

let mockMessages: any[];
let mockMatches: any[];

jest.mock('../data/db', () => ({
    __esModule: true,
    get messages() {
        return mockMessages;
    },
    get matches() {
        return mockMatches;
    },
}));

describe('chatService', () => {
    beforeEach(() => {
        // Reset data before each test
        mockMessages = [
            { id: 'msg1', senderId: '1', receiverId: '2', text: 'Hello!', timestamp: '2024-01-01T12:00:00.000Z' }
        ];
        mockMatches = [
            { id: 'match1', userIds: ['1', '2'], timestamp: '2024-01-01T11:00:00.000Z' }
        ];
    });

    describe('sendMessage', () => {
        it('should add a new message', async () => {
            const initialMessageCount = mockMessages.length;
            const newMessage = await chatService.sendMessage('2', '1', 'Hi there!');
            expect(mockMessages.length).toBe(initialMessageCount + 1);
            expect(newMessage.text).toBe('Hi there!');
            expect(mockMessages.find(m => m.id === newMessage.id)).toBeDefined();
        });
    });

    describe('getMessages', () => {
        it('should return messages for a given match', async () => {
            const result = await chatService.getMessages('match1');
            expect(result.length).toBe(1);
            expect(result[0].id).toBe('msg1');
        });

        it('should return an empty array for a non-existent match', async () => {
            const result = await chatService.getMessages('match2');
            expect(result.length).toBe(0);
        });
    });

    describe('getMatches', () => {
        it('should return matches for a given user', async () => {
            const result = await chatService.getMatches('1');
            expect(result.length).toBe(1);
            expect(result[0].id).toBe('match1');
        });

        it('should return an empty array for a user with no matches', async () => {
            const result = await chatService.getMatches('3');
            expect(result.length).toBe(0);
        });
    });
}); 