import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { getUserData, updateIsActiveUsersService } from '../../src/firebase/services/user.service.js';
import UserList from '../../src/components/Admin/UserList';
import { BrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

// Mocking firebase/services/user.service.js
jest.mock('../../src/firebase/services/user.service.js', () => ({
    getUserData: jest.fn(),
    updateIsActiveUsersService: jest.fn(),
}));

// Mocking the react-toastify
jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        warning: jest.fn(),
    },
}));

describe('Admin.UserList', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders user data correctly', async () => {
        const mockUserData = [
            { id: '1', email: 'user1@example.com', role: 'Admin', isActive: 'true', UID: '123' },
            { id: '2', email: 'user2@example.com', role: 'User', isActive: 'false', UID: '456' },
        ];

        // Mocking the getUserData function
        await reporter.startStep('Step 1: Mocking the getUserData function by proving mocked data to it')
        getUserData.mockResolvedValue(mockUserData);
        await reporter.endStep()

        await reporter.startStep('Step 2: Rendering User List component')
        render(<BrowserRouter><UserList /> </BrowserRouter>);
        await reporter.endStep()

        // Wait for data to be loaded
        await reporter.startStep('Step 3: Wait for data to be loaded')
        await waitFor(() => {
            expect(screen.getByText('user1@example.com')).toBeInTheDocument();
            expect(screen.getByText('user2@example.com')).toBeInTheDocument();
        });
        await reporter.endStep()
    });

    test('handles user activation correctly', async () => {
        const mockUserData = [{ id: '1', email: 'user1@example.com', role: 'Admin', isActive: 'true', UID: '123' }];

        // Mocking the getUserData function
        await reporter.startStep('Step 1: Mocking the getUserData function')
        getUserData.mockResolvedValue(mockUserData);
        await reporter.endStep()

        await reporter.startStep('Step 2: Initiate with rendering of User List component')
        render(<BrowserRouter><UserList /> </BrowserRouter>);
        await reporter.endStep()

        // Wait for data to be loaded
        await reporter.startStep('Step 3: Wait for data to be loaded')
        await waitFor(() => {
            expect(screen.getByText('user1@example.com')).toBeInTheDocument();
        });
        await reporter.endStep()

        // Mocking the updateIsActiveUsersService function
        await reporter.startStep('Step 4: Mocking the updateIsActiveUsersService function')
        updateIsActiveUsersService.mockResolvedValue();
        await reporter.endStep()

        // Click the button to toggle user activation
        await reporter.startStep('Step 5: Click the button to toggle user activation')
        fireEvent.click(screen.getByText('Active'));
        await reporter.endStep()

        // Wait for the user activation to be updated
        await reporter.startStep('Step 6: Wait for the user activation to be updated')
        await waitFor(() => {
            expect(updateIsActiveUsersService).toHaveBeenCalledWith('1', 'false');
            expect(toast.warning).toHaveBeenCalledWith('User Account has been Inactive.', { autoClose: 1000 })
        });
        await reporter.endStep()
    });

});
