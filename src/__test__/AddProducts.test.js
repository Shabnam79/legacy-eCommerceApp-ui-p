import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddProducts from '../../src/components/Admin/AddProducts';
import { BrowserRouter } from 'react-router-dom';


// Mocking the react-toastify
jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
    },
}));


describe('Admin.AddProducts', () => {
    it('Renders form elements of Add Product component', async () => {
        await reporter.startStep('Step 1: Render the Add Product component');
        render(<BrowserRouter><AddProducts /></BrowserRouter>);
        await reporter.endStep();

        await reporter.startStep('Step 2: Rendering form elements');
        // Ensure that form elements are rendered
        expect(screen.getByText('Select Categories')).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter Product Name/i)).toBeInTheDocument();
        await reporter.endStep();
    });

    it('Submits the form correctly', async () => {

        await reporter.startStep('Step 1: Rendering Add Products');
        render(<BrowserRouter><AddProducts /></BrowserRouter>);
        await reporter.endStep();

        jest.mock('../../src/components/Admin/AddProducts', () => ({
            uploadFile: jest.fn().mockImplementation(() => { }),
            fetchStoreProductData: jest.fn().mockImplementation(() => { })
        }));

        await reporter.startStep('Step 2: Filling out the form');
        // Fill out the form
        userEvent.upload(screen.getByPlaceholderText('Upload image'), new File(['(⌐□_□)'], 'test-image.png', { type: 'image/png' }));
        userEvent.type(screen.getByPlaceholderText(/Enter Product Name/i), 'Test Product');
        userEvent.type(screen.getByPlaceholderText(/Enter product Price/i), '12');
        userEvent.type(screen.getByPlaceholderText(/Enter Quantity of Product/i), '2');
        userEvent.type(screen.getByPlaceholderText(/Enter Product Description.../i), 'Testing');
        userEvent.type(screen.getByPlaceholderText(/Enter Product Company.../i), 'Testing123');
        await reporter.endStep();

        await reporter.startStep('Step 3: Submitting the form');
        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));
        await reporter.endStep();
    });

});
