import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginModal from '../../src/components/LoginModal';

describe('LoginModal', () => {
    it('Renders LoginModal with Login component', async () => {
        const onHideMock = jest.fn();

        await reporter.startStep('Step 1: Rendering loginModal component by providing onHide mocked function with name prop Login to it.')
        render(<LoginModal name="Login" show onHide={onHideMock} />);
        await reporter.endStep()

        // Assert that the Login component is rendered
        await reporter.startStep('Step 2: Verifying that the Login component is rendered with Login button')
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.queryAllByText('Login'));
        await reporter.endStep()

        // Trigger the close button click event
        await reporter.startStep('Step 3: Verifying that it trigger the close button click event ')
        fireEvent.click(screen.getByLabelText('Close'));
        await reporter.endStep()

        // Assert that the onHide function is called
        await reporter.startStep('Step 4: Verifying the onHide function is called')
        expect(onHideMock).toHaveBeenCalledTimes(1);
        await reporter.endStep()
    });

    it('Renders LoginModal with Signup component', async () => {
        const onHideMock = jest.fn();

        await reporter.startStep('Step 1: Rendering loginModal component by providing onHide mocked function with name prop as Signup to it')
        render(<LoginModal name="Signup" show onHide={onHideMock} />);
        await reporter.endStep()

        // Assert that the Signup component is rendered
        await reporter.startStep('Step 2: Verifying that the Login component is rendered with Signup button')
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.queryAllByText('Signup'));
        await reporter.endStep()

        // Trigger the close button click event
        await reporter.startStep('Step 3: Verifying that it trigger the close button click event With Signup modal ')
        fireEvent.click(screen.getByLabelText('Close'));
        await reporter.endStep()

        // Assert that the onHide function is called
        await reporter.startStep('Step 4: Verifying the onHide function is called')
        expect(onHideMock).toHaveBeenCalledTimes(1);
        await reporter.endStep()
    });
});