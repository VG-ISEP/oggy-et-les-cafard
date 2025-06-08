import { events } from '../data/db';
import { Event } from '../types/Event';

const LATENCY = 500;

const simulateLatency = <T>(data: T): Promise<T> => {
    return new Promise(resolve => {
        setTimeout(() => resolve(data), LATENCY);
    });
};

export const eventService = {
    getEvents: async (): Promise<Event[]> => {
        return simulateLatency(events) as Promise<Event[]>;
    },

    joinEvent: async (eventId: string, userId: string): Promise<boolean> => {
        const event = events.find(e => e.id === eventId);
        if (event && !event.participants.includes(userId)) {
            event.participants.push(userId);
            return simulateLatency(true) as Promise<boolean>;
        }
        return simulateLatency(false) as Promise<boolean>;
    },

    leaveEvent: async (eventId: string, userId: string): Promise<boolean> => {
        const event = events.find(e => e.id === eventId);
        if (event && event.participants.includes(userId)) {
            event.participants = event.participants.filter(p => p !== userId);
            return simulateLatency(true) as Promise<boolean>;
        }
        return simulateLatency(false) as Promise<boolean>;
    },
}; 