import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Signup from '../../src/components/Signup';
import { toast } from 'react-toastify';


// Mocking the Firebase functions
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
}));

// Mock the toast.success function
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
  },
}));


describe('Signup', () => {
  test('Renders the component', async () => {
    await reporter.startStep('Step 1: Rendering the Sign up component')
    render(<Signup />);
    await reporter.endStep();

    await reporter.startStep('Step 2: Getting the form elements from DOM and verifying present on UI')
    const emailInput = screen.getByPlaceholderText('jane@formik.com');
    const passwordInput = screen.getByPlaceholderText('******');
    const signupButton = screen.getByText('Signup');
    // const loginButton = screen.getByText('Login');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(signupButton).toBeInTheDocument();
    // expect(loginButton).toBeInTheDocument();
    await reporter.endStep()
  });

  test('Submits the form with valid data', async () => {
    await reporter.startStep('Step 1: Rendering Sign up component without crashing')
    render(<Signup />);

    await reporter.startStep('Step 2: Getting form elements from DOM ')
    const emailInput = screen.getByPlaceholderText('jane@formik.com');
    const passwordInput = screen.getByPlaceholderText('******');
    const signupButton = screen.getByText('Signup');
    await reporter.endStep()

    // Fill in the form
    await reporter.startStep('Step 3: Fill in the form')
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    await reporter.endStep()

    // Submit the form
    await reporter.startStep('Step 4:Submitting the form')
    fireEvent.click(signupButton);
    await reporter.endStep()

    await reporter.startStep('Step 5: Showing signup successfully toast message after submitting valid data')
    await act(() => {
      fireEvent.click(signupButton);
      waitFor(() => expect(toast.success).toHaveBeenCalledWith('Signup successfully'))
    });
    await reporter.endStep()
  });


  test('Displays an error message for an already used email', async () => {
    // Mock Firebase's createUserWithEmailAndPassword to simulate an error
    await reporter.startStep('Step 1: Mocking Firebase createUserWithEmailAndPassword to simulate an error')
    const createUserWithEmailAndPasswordMock = jest.fn(() =>
      Promise.reject({ code: 'auth/email-already-in-use' })
    );

    require('firebase/auth').createUserWithEmailAndPassword = createUserWithEmailAndPasswordMock;
    await reporter.endStep()

    await reporter.startStep('Step 2: Rendering Signup component ')
    render(<Signup />);
    await reporter.endStep()

    await reporter.startStep('Step 3: Getting form elements from DOM')
    const emailInput = screen.getByPlaceholderText('jane@formik.com');
    const passwordInput = screen.getByPlaceholderText('******');
    const signupButton = screen.getByText('Signup');
    await reporter.endStep()

    // Fill in the form
    await reporter.startStep('Step 4: Fill in the form after getting elements from DOM')
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    await reporter.endStep()

    // Submit the form
    await reporter.startStep('Step 5: Clicking on Signup Button')
    fireEvent.click(signupButton);
    await reporter.endStep()

    // Wait for error message
    await reporter.startStep('Step 6: Waiting for error message')
    await act(() => {
      fireEvent.click(signupButton);
      waitFor(() => expect(toast.success).toHaveBeenCalledWith('auth/email-already-in-use'))
    });
    await reporter.endStep()
  });
});
