import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import store from '../../src/utils/store'
import { Provider } from 'react-redux';
import userContext from "../../src/utils/userContext";
import { BrowserRouter } from 'react-router-dom';
import CartTotals from '../../src/components/Cart/CartTotals';

const mockUser = {
    userId: "DYLnWFX3d2MU6pdnu059AHN2KFm2",
    email: "Test1234@gmail.com",
};

const MockUserProvider = ({ children, value }) => {
    return (
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    );
};

describe('Cart.CartTotals', () => {
    test('Renders CartTotals component', async () => {

        await reporter.startStep('Step 1: Render CartTotals component with mock user and values.');
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <MockUserProvider value={{ user: mockUser }}>
                        <CartTotals value={{ subTotal: 50, tax: 5, total: 55, cart: [] }} />
                    </MockUserProvider>
                </Provider>
            </BrowserRouter>
        );
        await reporter.endStep();

        // Ensure that the component renders properly
        await reporter.startStep('Step 2: Ensure proper rendering of key elements in CartTotals.');
        expect(screen.getByText('clear cart')).toBeInTheDocument();
        expect(screen.getByText('Subtotal:')).toBeInTheDocument();
        expect(screen.getByText('Tax:')).toBeInTheDocument();
        expect(screen.getByText('Total Amount:')).toBeInTheDocument();
        expect(screen.getByText('Proceed To Checkout')).toBeInTheDocument();
        await reporter.endStep();

    });

    test('Able to click "clear cart" button to remove an item from cart', async () => {

        await reporter.startStep('Step 1: Render the CartTotals component with mock data.');
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <MockUserProvider value={{ user: mockUser }}>
                        <CartTotals
                            value={{ subTotal: 50, tax: 5, total: 55, cart: [] }}
                        />
                    </MockUserProvider>
                </Provider>
            </BrowserRouter>
        );
        await reporter.endStep();

        await reporter.startStep('Step 2: Simulate a click on the "clear cart" button.');
        fireEvent.click(screen.getByText('clear cart'));
        await reporter.endStep();

    });

    test('Navigates to /checkout when "Proceed To Checkout" button is clicked', async () => {

        await reporter.startStep('Step 1: Render CartTotals component with mock user data.');
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <MockUserProvider value={{ user: mockUser }}>
                        <CartTotals
                            value={{ subTotal: 50, tax: 5, total: 55, cart: [] }}
                        />
                    </MockUserProvider>
                </Provider>
            </BrowserRouter>
        );
        await reporter.endStep();

        await reporter.startStep('Step 2: Simulate click on "Proceed To Checkout" button.');
        fireEvent.click(screen.getByText('Proceed To Checkout'));
        await reporter.endStep();

        // Ensure that the navigation occurred
        await reporter.startStep('Step 3: Check if navigation link exists after click.');
        const checkoutButton = screen.getByText('Proceed To Checkout');
        const parentAnchor = checkoutButton.closest('a');
        await reporter.endStep();

        await reporter.startStep('Step 4: Ensure the link redirects to /checkout page.');
        expect(parentAnchor).toHaveAttribute('href', '/checkout');
        await reporter.endStep();

    });
});
