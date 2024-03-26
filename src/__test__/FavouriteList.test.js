import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import FavouriteList from '../../src/components/Wishlist/FavouriteList';
import userContext from "../../src/utils/userContext";
import store from '../../src/utils/store'
import { Provider } from 'react-redux';
import { getWishlistService } from '../../src/firebase/services/wishlist.service'

// Mocking the user context
const userDetails = {
    userId: 'DYLnWFX3d2MU6pdnu059AHN2KFm2',
    email: 'Test1234@gmail.com'
};

const MockUserProvider = ({ children, value }) => {
    return (
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    );
};

jest.mock('../../src/firebase/services/wishlist.service');

describe('Wishlist.FavouriteList', () => {
    it('Renders the component with wishlist items', async () => {

        const mockWishlistData = [
            {
                id: 'RWLc68Zga0HqlR3GnAtH',
                title: 'Mock Product',
                userId: 'DYLnWFX3d2MU6pdnu059AHN2KFm2',
                productId: '6wxLfix3VDwBZ29h24Gm',
                inWishlist: true,
                info: 'Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.',
                price: '200',
                img: 'https://firebasestorage.googleapis.com/v0/b/tx-ai-engine-ff6f7.appspot.com/o/ProductImages%2F075cafd0-1005-40ee-bab9-c4753f28947a%2Fshoe1.jpeg?alt=media&token=c1c53492-671a-4050-9b29-53d588663d8c',
            },
        ];

        await reporter.startStep('Step 1: Verifying FavouriteList component renders successfully')
        getWishlistService.mockResolvedValue(mockWishlistData);
        render(
            <Provider store={store}>
                <MockUserProvider value={{ user: userDetails }}>
                    <FavouriteList />
                </MockUserProvider>
            </Provider>
        );
        await reporter.endStep()

        // Wait for the wishlist data to be fetched and rendered
        await reporter.startStep('Step 2: Wait for the wishlist data to be fetched and rendered')
        await waitFor(() => {
            const wishlistItem = screen.getByTestId('wishlist-items');
            expect(wishlistItem).toBeInTheDocument();
        });
        await reporter.endStep()

        //Assert that the wishlist item is rendered
        await reporter.startStep('Step 3: Verifying that wishlist item is rendered')
        const wishlistItemTitle = screen.getByText('Mock Product');
        expect(wishlistItemTitle).toBeInTheDocument();
        await reporter.endStep()
    });

    it('Handles the case when the user is not logged in', async () => {
        // Mocking the user context for a scenario when the user is not logged in
        const defaultUser = {
            userId: null,
        }

        const consoleSpy = jest.spyOn(console, 'log');
        await reporter.startStep('Step 1: Rendering the component with mocked user data when user is not logged in')
        render(
            <Provider store={store}>
                <MockUserProvider value={{ user: defaultUser }}>
                    <FavouriteList />
                </MockUserProvider>
            </Provider>
        );
        await reporter.endStep()

        // Assert that the login message is displayed
        await reporter.startStep('Step 2: Verifying login message is displayed')
        expect(consoleSpy).toHaveBeenCalledWith('Please login to see past Wishlist products');
        await reporter.endStep()
    });

    it('Handles the case when the component is initially rendered with an empty wishlist', async () => {
        const initialWishlistData = []
        getWishlistService.mockResolvedValue(initialWishlistData);
        await reporter.startStep('Step 1: Initiate the rendering of Favourite List component')
        render(
            <Provider store={store}>
                <MockUserProvider value={{ user: userDetails }}>
                    <FavouriteList />
                </MockUserProvider>
            </Provider>
        );
        await reporter.endStep()

        // Assert that no wishlist items are rendered
        await reporter.startStep('Step 2: Verifying that no wishlist items are rendered')
        expect(screen.queryByText('Mock Product')).toBeNull();
        await reporter.endStep()
    });
});
