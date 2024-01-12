import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux'
import userContext from "../../src/utils/userContext";
import ProductWishlist from '../../src/components/Wishlist/ProductWishlist';
import { fetchWishlistProducts } from '../../src/utils/wishlistSlice';
import { async } from 'q';

jest.mock('../../src/utils/wishlistSlice', () => ({
    ...jest.requireActual('../../src/utils/wishlistSlice'),
    fetchWishlistProducts: jest.fn(),
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

const sampleWishlistItem = [
    { id: 'rlgm997oiWc2jCrgr80l', company: 'Product 1' }, { id: 'rlgm997oiWc2jCrgr81l', company: 'Product 2' }
];

const mockStore = configureStore({
    reducer: {
        wishlist: fetchWishlistProducts.fulfilled,
    },
    preloadedState: {
        wishlist: {
            wishlist: [
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
        },
    },
});

describe('Wishlist.ProductWishlist', () => {
    beforeEach(() => {
        useSelector.mockImplementation((selector) => selector(mockStore.getState()));
        useDispatch.mockReturnValue(jest.fn());
    });
    it('Renders empty wishlist message when no items in the wishlist', async () => {
        await reporter.startStep('Step 1: Mocking the useSelector wishlist data from the store when there are no items')
        useSelector.mockImplementationOnce(() => ({ wishlist: [] }));
        await reporter.endStep()

        await reporter.startStep('Step 2: Rendering the Product wishlist component by providing provider store wrapper and mocked user data')
        render(
            <Provider store={mockStore}>
                <MockUserProvider value={{ user: mockUserId }}>
                    < ProductWishlist />
                </MockUserProvider>
            </Provider>
        );
        await reporter.endStep()

        await reporter.startStep('Step 3: Verifying the component renders empty wishlist message when no items in the wishlist')
        expect(screen.getByText(/Your wishlist is currently empty/i)).toBeInTheDocument();
        await reporter.endStep()
    });

    it('Renders wishlist items when there are items in the wishlist', async () => {
        await reporter.startStep('Step 1: Mocking the useSelector wishlist data from the store when there are items')
        useSelector.mockImplementationOnce(() => ({ wishlist: [sampleWishlistItem] }));
        await reporter.endStep()

        await reporter.startStep('Step 2: Rendering the Product wishlist component by providing mocked data to component')
        render(

            <Provider store={mockStore}>
                <MockUserProvider value={{ user: mockUserId }}>
                    <ProductWishlist value={{ wishlist: [sampleWishlistItem] }} />
                </MockUserProvider>
            </Provider>

        );
        await reporter.endStep()

        await reporter.startStep('Step 3: Verifying rendering wishlist items when there are items in the wishlist ')
        await waitFor(() => {
            expect(screen.getByTestId('wishlist-items')).toBeInTheDocument();
        });
        await reporter.endStep()

    });

});
