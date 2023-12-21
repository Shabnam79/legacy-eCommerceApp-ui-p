import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import EditProducts from '../../src/components/Admin/EditProducts';
import { BrowserRouter } from 'react-router-dom';

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

describe('Admin.EditProducts', () => {
    test('Renders EditProducts component', async () => {
        await reporter.startStep('Step 1: Initiate with rendering of Edit products component')
        render(<BrowserRouter><EditProducts /> </BrowserRouter>);
        await reporter.endStep()

        // Wait for async data fetching
        await reporter.startStep('Step 2: Wait for async data fetching')
        await waitFor(() => {
            fireEvent.change(screen.getByLabelText('Enter Product Name :'), { target: { value: 'Product1' } });
        });
        await reporter.endStep()
    });

    test('Handles input change', async () => {
        await reporter.startStep('Step 1: Initiate with rendering of Edit products component')
        render(<BrowserRouter><EditProducts /> </BrowserRouter>);
        await reporter.endStep()

        await reporter.startStep('Step 2: Wait for async data fetching and enter for Enter product name input field')
        await act(async () => {
            fireEvent.change(screen.getByLabelText('Enter Product Name :'), { target: { value: 'NewProduct' } });
        });
        await reporter.endStep()

        await reporter.startStep('Step 2: Verify from DOM that Enter product name input fields gets the same input field value as entered')
        expect(screen.getByLabelText('Enter Product Name :')).toHaveValue('NewProduct');
        await reporter.endStep()
    });

    test('Handles checkbox change', async () => {
        await reporter.startStep('Step 1: Renders Edit products component')
        render(<BrowserRouter><EditProducts /> </BrowserRouter>);
        await reporter.endStep()

        await reporter.startStep('Step 2: Wait for async form to load and get In stock checkbox label from DOM and fire click event')
        await act(async () => {
            userEvent.click(screen.getByLabelText('In Stock :'));
        });
        await reporter.endStep()

        await reporter.startStep('Step 3: Verify that In stock check box is checked')
        expect(screen.getByLabelText('In Stock :')).toBeChecked();
        await reporter.endStep()
    });

    test('Handles form submission', async () => {
        await reporter.startStep('Step 1: Renders Edit products component without crashing')
        render(<BrowserRouter><EditProducts /> </BrowserRouter>);
        await reporter.endStep()

        await reporter.startStep('Step 2: Verify form loads and fire click event on Update button and handle form submission')
        await act(async () => {
            fireEvent.submit(screen.getByRole('button', { name: 'Update' }));
        });
        await reporter.endStep()

    });
});
