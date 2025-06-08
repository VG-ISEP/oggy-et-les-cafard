import { userService } from './userService';
import { users } from '../data/db';

// Mock the db to ensure tests are isolated and repeatable
jest.mock('../data/db', () => ({
    ...jest.requireActual('../data/db'),
    users: [
        {
            id: '1', email: 'test1@example.com', role: 'bénéficiaire', profile: {
                name: 'Alpha Bio-search', age: 25, interests: ['music', 'art'], location: 'Paris',
                photo: '', bio: 'Loves music.', visibility: true, relationshipType: 'friendship'
            }
        },
        {
            id: '2', email: 'test2@example.com', role: 'volontaire', profile: {
                name: 'Beta', age: 35, interests: ['sports', 'art'], location: 'Lyon',
                photo: '', bio: 'A test bio.', visibility: true, relationshipType: 'mentorship'
            }
        },
        {
            id: '3', email: 'test3@example.com', role: 'volontaire', profile: {
                name: 'Gamma', age: 45, interests: ['music', 'sports'], location: 'Paris',
                photo: '', bio: 'A test bio.', visibility: false, relationshipType: 'friendship'
            }
        },
    ]
}));

describe('userService.searchUsers', () => {
    it('should only return visible users', async () => {
        const results = await userService.searchUsers({});
        expect(results.length).toBe(2);
        expect(results.some(u => u.id === '3')).toBe(false);
    });

    it('should filter by search term (name)', async () => {
        const results = await userService.searchUsers({ term: 'Alpha' });
        expect(results.length).toBe(1);
        expect(results[0].id).toBe('1');
    });

    it('should filter by search term (bio)', async () => {
        const results = await userService.searchUsers({ term: 'music' });
        expect(results.length).toBe(1);
        expect(results[0].id).toBe('1');
    });

    it('should filter by role', async () => {
        const results = await userService.searchUsers({ role: 'bénéficiaire' });
        expect(results.length).toBe(1);
        expect(results[0].id).toBe('1');
    });

    it('should filter by interest', async () => {
        const results = await userService.searchUsers({ interests: ['sports'] });
        expect(results.length).toBe(1);
        expect(results[0].id).toBe('2');
    });

    it('should filter by multiple interests', async () => {
        const results = await userService.searchUsers({ interests: ['music', 'art'] });
        expect(results.length).toBe(1);
        expect(results[0].id).toBe('1');
    });
    
    it('should filter by location', async () => {
        const results = await userService.searchUsers({ location: 'Paris' });
        expect(results.length).toBe(1); // Alpha is in Paris
        expect(results[0].id).toBe('1');
    });

    it('should filter by age range', async () => {
        const results = await userService.searchUsers({ ageRange: { min: 30, max: 40 } });
        expect(results.length).toBe(1);
        expect(results[0].id).toBe('2');
    });

    it('should filter by relationship type', async () => {
        const results = await userService.searchUsers({ relationshipType: 'mentorship' });
        expect(results.length).toBe(1);
        expect(results[0].id).toBe('2');
    });

    it('should handle combined filters', async () => {
        const results = await userService.searchUsers({ role: 'volontaire', location: 'Lyon' });
        expect(results.length).toBe(1);
        expect(results[0].id).toBe('2');
    });
}); 