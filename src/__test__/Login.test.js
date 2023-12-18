import React from 'react';
import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import Login from '../../src/components/Login'


describe('Login', () => {


    it('Renders the Login component', async () => {
        await reporter.startStep('Step 1: Renders Login component')
        render(<Login />);
        await reporter.endStep()

        await reporter.startStep('Step 2: Getting an element with text Login from DOM and verify its present on UI')
        const loginText = screen.getByText('Login');
        expect(loginText).toBeInTheDocument();
        await reporter.endStep()
    });

    it('Renders login form with email and password inputs', async () => {
        await reporter.startStep('Step 1: Renders Login component')
        const { getByLabelText } = render(<Login />);
        await reporter.endStep()

        await reporter.startStep('Step 2: Verifying login form with email and passowrd input is rendering')
        expect(getByLabelText('Email')).toBeInTheDocument();
        expect(getByLabelText('Password')).toBeInTheDocument();
        await reporter.endStep()
    });

    it('Renders the Login component with initial values', async () => {
        await reporter.startStep('Step 1: Renders Login component')
        render(<Login />);
        await reporter.endStep()

        // Check that the initial email and password values are displayed
        await reporter.startStep('Step 2: Verifying component renders with initial values of email and password.')
        expect(screen.getByLabelText('Email')).toHaveValue('Test1234@gmail.com');
        expect(screen.getByLabelText('Password')).toHaveValue('Test1234');
        await reporter.endStep()
    });

    it('Displays an error message for password too short', async () => {
        await reporter.startStep('Step 1: Renders Login component')
        render(<Login />);
        await reporter.endStep()

        try {

            // Fill in the password field with a too short password
            await reporter.startStep('Step 2: Fill in the password field with a too short password ')
            fireEvent.change(screen.getByLabelText('Password'), {
                target: { value: 'short' },
            });
            await reporter.endStep()

            // Submit the form
            await reporter.startStep('Step 3: Submit the form ')
            fireEvent.click(screen.getByText('Login'));
            await reporter.endStep()

            // Check for the error message
            await reporter.startStep('Step 4: Check for the error message')
            const passwordError = await screen.findByText(/Must be grater than 6 characters/i);
            expect(passwordError).toBeInTheDocument();
            await reporter.endStep()
        } catch (error) {
            console.error('Error in test:', error);
        }
    });

    it('Displays an error message for password too long', async () => {
        await reporter.startStep('Step 1: Rendering Login component')
        render(<Login />);
        await reporter.endStep()

        // Fill in the password field with a too long password
        await reporter.startStep('Step 2: Fill in the password field with a too long password')
        fireEvent.change(screen.getByLabelText('Password'), {
            target: { value: 'verylongpasswordthatexceedscharacterlimit' },
        });
        await reporter.endStep()

        // Submit the form
        await reporter.startStep('Step 3: Submit the form')
        fireEvent.click(screen.getByText('Login'));
        await reporter.endStep()

        // Check for the error message
        await reporter.startStep('Step 4:Check for the error message')
        const passwordError = await screen.findByText(/Must be less than or equal to 10 characters/i);
        expect(passwordError).toBeInTheDocument();
        await reporter.endStep()
    });

    it('Does not display error messages with valid email and password', async () => {
        await reporter.startStep('Step 1: Verifying Login component renders successfully')
        render(<Login />);
        await reporter.endStep()

        // Fill in the email and password fields with valid data
        await reporter.startStep('Step 2: Fill in the email and password fields with valid data')
        fireEvent.change(screen.getByLabelText('Email'), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByLabelText('Password'), {
            target: { value: 'password' },
        });
        await reporter.endStep()

        // Submit the form
        await reporter.startStep('Step 3:Submit the form')
        fireEvent.click(screen.getByText('Login'));
        await reporter.endStep()

        // Check that no error messages are displayed
        await reporter.startStep('Step 4: Verifying that no error messages are displayed')
        const emailError = screen.queryByText(/Must be a valid email/i);
        const passwordError = screen.queryByText(/Must be greater than 6 characters/i);
        expect(emailError).toBeNull();
        expect(passwordError).toBeNull();
        await reporter.endStep()
    });

}
)