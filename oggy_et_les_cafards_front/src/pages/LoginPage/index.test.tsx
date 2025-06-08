import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './index';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';

const mockLogin = jest.fn();
const mockNavigate = jest.fn();

// Mock dependencies
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

jest.mock('../../contexts/AuthContext', () => ({
    ...jest.requireActual('../../contexts/AuthContext'),
    useAuth: () => ({
        login: mockLogin,
    }),
}));

describe('LoginPage', () => {
    beforeEach(() => {
        mockLogin.mockClear();
        mockNavigate.mockClear();
    });

    const renderWithRouter = () => {
        return render(
            <Router>
                <LoginPage />
            </Router>
        );
    }

    it('renders the login form', () => {
        renderWithRouter();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('allows the user to type in email and password fields', async () => {
        renderWithRouter();
        
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);

        await userEvent.type(emailInput, 'test@example.com');
        await userEvent.type(passwordInput, 'password123');

        expect(emailInput).toHaveValue('test@example.com');
        expect(passwordInput).toHaveValue('password123');
    });
    
    it('calls login and navigates on successful submission', async () => {
        mockLogin.mockResolvedValue({ id: '1', email: 'test@example.com' }); // Simulate success
        
        renderWithRouter();
        
        await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
        await userEvent.type(screen.getByLabelText(/password/i), 'password');
        await userEvent.click(screen.getByRole('button', { name: /login/i }));
        
        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password');
        });
        
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });


    it('shows an error message on failed login', async () => {
        mockLogin.mockResolvedValue(null); // Simulate a failed login
        
        renderWithRouter();
        
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const loginButton = screen.getByRole('button', { name: /login/i });

        await userEvent.type(emailInput, 'wrong@example.com');
        await userEvent.type(passwordInput, 'wrongpassword');
        await userEvent.click(loginButton);

        expect(await screen.findByText('Invalid email or password.')).toBeInTheDocument();
        expect(mockNavigate).not.toHaveBeenCalled();
    });
}); 