import { eventService } from './eventService';
import { events } from '../data/db';

jest.mock('../data/db', () => ({
    ...jest.requireActual('../data/db'),
    events: [
        { id: 'evt1', name: 'Tech Conference', date: '2024-08-15T10:00:00.000Z', location: 'Online', description: 'A conference about technology.', participants: ['1', '2'] },
        { id: 'evt2', name: 'Art Workshop', date: '2024-09-20T14:00:00.000Z', location: 'Paris', description: 'A workshop for artists.', participants: ['3'] }
    ]
}));

describe('eventService', () => {
    describe('getEvents', () => {
        it('should return all events', async () => {
            const result = await eventService.getEvents();
            expect(result.length).toBe(2);
        });
    });

    describe('joinEvent', () => {
        it('should allow a user to join an event', async () => {
            const result = await eventService.joinEvent('evt2', '1');
            expect(result).toBe(true);
            const event = events.find(e => e.id === 'evt2');
            expect(event?.participants).toContain('1');
        });

        it('should not allow a user to join an event they are already in', async () => {
            const result = await eventService.joinEvent('evt1', '1');
            expect(result).toBe(false);
        });

        it('should return false for a non-existent event', async () => {
            const result = await eventService.joinEvent('evt3', '1');
            expect(result).toBe(false);
        });
    });

    describe('leaveEvent', () => {
        it('should allow a user to leave an event', async () => {
            const result = await eventService.leaveEvent('evt1', '1');
            expect(result).toBe(true);
            const event = events.find(e => e.id === 'evt1');
            expect(event?.participants).not.toContain('1');
        });

        it('should return false if the user is not in the event', async () => {
            const result = await eventService.leaveEvent('evt2', '2');
            expect(result).toBe(false);
        });

        it('should return false for a non-existent event', async () => {
            const result = await eventService.leaveEvent('evt3', '1');
            expect(result).toBe(false);
        });
    });
}); 