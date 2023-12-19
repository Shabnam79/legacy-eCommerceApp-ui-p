import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import store from '../../src/utils/store'
import { Provider } from 'react-redux';
import userContext from "../../src/utils/userContext";
import CartList from '../../src/components/Cart/CartList';


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


const mockedGetCartData = {
    company: "Mock Product",
    count: 1,
    id: "rlgm997oiWc2jCrgr80l",
    img: "img/product-10.png",
    inCart: true,
    info: "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
    price: 15,
    productId: "nCBlyCfdsp86bK7tiEO1",
    title: "Adidas T-shirt",
    userId: "DYLnWFX3d2MU6pdnu059AHN2KFm2"
};

//Mock getCartProductsService
jest.mock('../../src/firebase/services/cart.service', () => ({
    getCartProductsService: jest.fn(() => Promise.resolve([mockedGetCartData])),
}));

describe('Cart.CartList', () => {
    it('Renders CartList component with CartItem', async () => {

        await reporter.startStep('Step 1: Render CartList component with empty cart.');
        render(
            <Provider store={store}>
                <MockUserProvider value={{ user: mockUser }}>
                    <CartList value={{ cart: [] }} />
                </MockUserProvider>
            </Provider>
        );

        // Wait for the data to be loaded
        await reporter.startStep('Step 2: Ensure that the product name is displayed after data loads.');
        await waitFor(() => {
            expect(screen.getByText('Adidas T-shirt')).toBeInTheDocument();
        });
    });

    it('Renders "Please login" message when user is not logged in', async () => {

        // Mock console.log to spy on the log message
        const consoleSpy = jest.spyOn(console, 'log');

        await reporter.startStep('Step 1: Render CartList component with empty user and cart.');
        render(<Provider store={store}>
            <MockUserProvider value={{ user: {} }}>
                <CartList value={{ cart: [] }} />
            </MockUserProvider>
        </Provider>);
        await reporter.endStep();

        await reporter.startStep('Step 2: Verify "Please login" message is logged to console.');
        expect(consoleSpy).toHaveBeenCalledWith('Please login to see past Cart products');
        await reporter.endStep();

    });

    it('Doesnt calls fetchAddToCartData when user is not logged in', async () => {
        const fetchAddToCartDataMock = jest.fn();

        await reporter.startStep('Step 1: Render CartList component with empty cart and unauthenticated user.');
        render(
            <Provider store={store}>
                <MockUserProvider value={{}}>
                    <CartList value={{ cart: [] }} fetchAddToCartData={fetchAddToCartDataMock} />
                </MockUserProvider>
            </Provider>
        );
        await reporter.endStep();

        // Use waitFor to wait for the asynchronous code to complete
        await reporter.startStep('Step 2: Verify fetchAddToCartData is not called during rendering.');
        await waitFor(() => {
            expect(fetchAddToCartDataMock).toHaveBeenCalledTimes(0);
        });
        await reporter.endStep();

    });
});
