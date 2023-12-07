import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddProducts from '../../src/components/Admin/AddProducts';


// Mocking the react-toastify
jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
    },
}));


describe('AddProducts Component', () => {
    it('renders form elements', () => {
        render(<AddProducts />);

        // Ensure that form elements are rendered
        expect(screen.getByText('Select Categories')).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter Product Name/i)).toBeInTheDocument();
    });

    it('submits the form correctly', async () => {
        render(<AddProducts />);

        jest.mock('../../src/components/Admin/AddProducts', () => ({
            uploadFile: jest.fn().mockImplementation(() => { }),
            fetchStoreProductData: jest.fn().mockImplementation(() => { })
        }));


        // Fill out the form
        userEvent.upload(screen.getByPlaceholderText('Upload image'), new File(['(⌐□_□)'], 'test-image.png', { type: 'image/png' }));
        userEvent.type(screen.getByPlaceholderText(/Enter Product Name/i), 'Test Product');
        userEvent.type(screen.getByPlaceholderText(/Enter product Price/i), '12');
        userEvent.type(screen.getByPlaceholderText(/Enter Quantity of Product/i), '2');
        userEvent.type(screen.getByPlaceholderText(/Enter Product Description.../i), 'Testing');
        userEvent.type(screen.getByPlaceholderText(/Enter Product Company.../i), 'Testing123');

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    });

});
