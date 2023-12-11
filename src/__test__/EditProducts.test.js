import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import EditProducts from '../../src/components/Admin/EditProducts';

// Mocking react-router-dom's useParams
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn().mockReturnValue({ productId: 'mockProductId' }),
}));

// Mocking react-bootstrap's Dropdown component
jest.mock('react-bootstrap', () => ({
    ...jest.requireActual('react-bootstrap'),
    Dropdown: ({ children }) => <div>{children}</div>,
}));

// Mocking react-toastify
jest.mock('react-toastify', () => ({
    ...jest.requireActual('react-toastify'),
    toast: {
        success: jest.fn(),
    },
}));

// Mocking Firebase services
jest.mock('../firebase/services/product.service', () => ({
    getCategoryService: jest.fn(() => Promise.resolve([{ id: '1', Category: 'Category1' }])),
    getProductByProductIdService: jest.fn(() =>
        Promise.resolve([
            {
                category: 'Category1',
                categoryId: '1',
                title: 'Product1',
                price: '10',
                quantity: '5',
                info: 'Product Info',
                company: 'Company1',
                isStock: true,
                userId: 'userId',
                productId: 'mockProductId',
                img: 'mockImageUrl',
            },
        ])
    ),
    saveUpdateProductStore: jest.fn(() => Promise.resolve()),
}));

// Mocking Firebase storage
jest.mock('../firebase/config/firebase.config', () => ({
    storage: {
        ref: jest.fn(() => ({
            child: jest.fn(() => ({
                put: jest.fn(() => Promise.resolve({ ref: { getDownloadURL: jest.fn(() => 'mockImageUrl') } })),
            })),
        })),
    },
}));

describe('EditProducts component', () => {
    test('renders EditProducts component', async () => {
        render(<EditProducts />);

        // Wait for async data fetching
        await waitFor(() => {
            fireEvent.change(screen.getByLabelText('Enter Product Name :'), { target: { value: 'Product1' } });
            // Add assertions for other rendered elements
        });
    });

    test('handles input change', async () => {
        render(<EditProducts />);

        await act(async () => {
            fireEvent.change(screen.getByLabelText('Enter Product Name :'), { target: { value: 'NewProduct' } });
        });

        expect(screen.getByLabelText('Enter Product Name :')).toHaveValue('NewProduct');
    });

    test('handles checkbox change', async () => {
        render(<EditProducts />);

        await act(async () => {
            userEvent.click(screen.getByLabelText('In Stock :'));
        });

        expect(screen.getByLabelText('In Stock :')).toBeChecked();
    });

    test('handles form submission', async () => {
        render(<EditProducts />);

        await act(async () => {
            fireEvent.submit(screen.getByRole('button', { name: 'Update' }));
        });

        // Add assertions for the expected behavior after form submission
        // e.g., expect(saveUpdateProductStore).toHaveBeenCalledWith(expectedProductData);
    });
});
