import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux'
import userContext from "../../src/utils/userContext";
import Cart from '../../src/components/Cart/Cart';
import { fetchCartProducts } from '../../src/utils/cartSlice'
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../src/utils/cartSlice', () => ({
    ...jest.requireActual('../../src/utils/cartSlice'),
    fetchCartProducts: jest.fn(),
}));

const mockUserId = 'mockUserId';
const MockUserProvider = ({ children, value }) => {
    return (
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    );
};

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

const sampleCartItem = {
    cart: [
        {
            company: "Product 1",
            count: 1,
            id: "rlgm997oiWc2jCrgr80l",
            img: "img/product-10.png",
            inWishlist: true,
            info: "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
            price: 15,
            productId: "nCBlyCfdsp86bK7tiEO1",
            title: "Adidas T-shirt",
            userId: "DYLnWFX3d2MU6pdnu059AHN2KFm2"
        }
    ],
    subTotal: 15,
    tax: 1.5,
    total: 16.5,
};

const mockStore = configureStore({
    reducer: {
        cart: fetchCartProducts.fulfilled,
    },
    preloadedState: {
        cart: {
            cart: sampleCartItem
        },
    },
});

describe('Cart.Cart', () => {
    beforeEach(() => {
        useSelector.mockImplementation((selector) => selector({ cart: sampleCartItem }));
        useDispatch.mockReturnValue(jest.fn());
    });
    it('Renders emptycart no items in the cart', async () => {
        useSelector.mockImplementationOnce(() => ({ cart: [] }));

        await reporter.startStep('Step 1: Rendering cart component by providing mocked user data.');
        render(
            <Provider store={mockStore}>
                <MockUserProvider value={{ user: mockUserId }}>
                    < Cart />
                </MockUserProvider>
            </Provider>
        );
        await reporter.endStep();

        await reporter.startStep('Step 2: Getting an empty cart component from DOM and verifying no items in the cart.');
        expect(screen.getByTestId('empty-cart')).toBeInTheDocument();
        await reporter.endStep();
    });

    it('Renders cart items when there are items in the cart', async () => {
        await reporter.startStep('Step 1: Rendering cart component by providing mocked user data and store.');
        render(
            <BrowserRouter>
                <Provider store={mockStore}>
                    <MockUserProvider value={{ user: mockUserId }}>
                        <Cart />
                    </MockUserProvider>
                </Provider>
            </BrowserRouter>
        );
        await reporter.endStep();

        await reporter.startStep('Step 2: Getting cart component from DOM and verifying the items in the cart.');
        await waitFor(() => {
            expect(screen.getByTestId('cart-totals')).toBeInTheDocument();
        });
        await reporter.endStep();
    });
})
