
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import EditUsers from '../../src/components/Admin/EditUsers';
import { updateRoleUsersService } from '../../src/firebase/services/user.service';
import { toast } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../src/firebase/services/user.service', () => ({
    getRolesService: jest.fn(() => Promise.resolve([{ id: 1, roles: 'Admin' }])),
    getUserDataByIdService: jest.fn(() => Promise.resolve([{ id: 1, role: 'Admin', roleId: 1, email: 'test@example.com' }])),
    updateRoleUsersService: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
    },
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('EditUsers Component', () => {
    test('Renders EditUsers component', async () => {
        await reporter.startStep('Step 1: Renders Edit Users component')
        render(<BrowserRouter><EditUsers /></BrowserRouter>);
        await reporter.endStep()

        // assertion with actual UI element checks once the component is loaded
        await reporter.startStep('Step 2: Check element once the component is loaded')
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        await reporter.endStep()
    });

    test('Handles form submission', async () => {
        await reporter.startStep('Step 1: Initiate with rendering of Edit Users component')
        render(<BrowserRouter><EditUsers /></BrowserRouter>);
        await reporter.endStep()

        // Wait for component to load
        await reporter.startStep('Step 2: Wait for the component to load')
        await waitFor(() => {
            expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        });
        await reporter.endStep()

        // Fill in form fields
        await reporter.startStep('Step 3: Fill in form fields')
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'new-email@example.com' } });
        await reporter.endStep()

        // Mock the form submission
        await reporter.startStep('Step 4: Mock the form submission and fire submit event to update button')
        await waitFor(() => {
            fireEvent.submit(screen.getByRole('button', { name: /update/i }));
        });
        await reporter.endStep()

        // Assert that the update function was called
        await reporter.startStep('Step 5: Assert that the update function was called')
        expect(updateRoleUsersService).toHaveBeenCalledWith({
            roleId: 1,
            role: 'Admin',
            id: 1,
        });
        await reporter.endStep()

        // Assert that the success toast message is displayed
        await reporter.startStep('Step 6: Assert that the success toast message is displayed')
        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith('Role Updated in admin list ', { autoClose: 1000 })
        });
        await reporter.endStep()
    });

});
