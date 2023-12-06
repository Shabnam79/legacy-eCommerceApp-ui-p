import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import CheckoutForm from '../../src/components/Cart/CheckoutForm';
import userContext from '../utils/userContext';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));
jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        warning: jest.fn(),
    },
}));

describe('CheckoutForm component', () => {
    const mockUserContextValue = {
        user: {
            userId: 'mockUserId',
        },
    };

    const renderComponent = (props) =>
        render(
            <BrowserRouter>
                <CheckoutForm {...props} />
            </BrowserRouter>,
            {
                wrapper: ({ children }) => (
                    <userContext.Provider value={mockUserContextValue}>
                        {children}
                    </userContext.Provider>
                ),
            }
        );

    test('renders shipping address when user is logged in', async () => {
        const mockValue = {
            cartSubTotal: 100,
            cartTax: 10,
            cartTotal: 110,
            cart: [
            ],
        };

        const mockGetDocs = jest.fn(() =>
            Promise.resolve({
                forEach: jest.fn(),
            })
        );
        jest.mock('firebase/firestore', () => ({
            ...jest.requireActual('firebase/firestore'),
            getDocs: mockGetDocs,
        }));

        renderComponent({ value: mockValue });
    });

});

