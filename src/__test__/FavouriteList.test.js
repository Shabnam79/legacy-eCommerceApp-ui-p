import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import FavouriteList from '../../src/components/Wishlist/FavouriteList';
import userContext from "../../src/utils/userContext";
import store from '../../src/utils/store'
import { Provider } from 'react-redux';

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

// Mocking the wishlist service
jest.mock('../../src/firebase/services/wishlist.service', () => ({
    getWishlistService: jest.fn(() => Promise.resolve([{ id: 1, title: 'Mock Product' }])),
}));

describe('Wishlist.FavouriteList', () => {
    it('Renders the component with wishlist items', async () => {
        await reporter.startStep('Step 1: Verifying FavouriteList component renders successfully')
        render(
            <Provider store={store}>
                <MockUserProvider value={{ user: userDetails }}>
                    <FavouriteList />
                </MockUserProvider>
            </Provider>
        );
        await reporter.endStep()

        // Wait for the asynchronous data fetching
        await reporter.startStep('Step 2: Wait for the asynchronous data fetching')
        await waitFor(() => expect(screen.getByText('Mock Product')).toBeInTheDocument());
        await reporter.endStep()

        // Assert that the wishlist item is rendered
        await reporter.startStep('Step 3: Verifying that wishlist item is rendered')
        expect(screen.getByText('Mock Product')).toBeInTheDocument();
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
        // Mocking the wishlist service to return an empty array
        jest.mock('../../src/firebase/services/wishlist.service', () => ({
            getWishlistService: jest.fn(() => Promise.resolve([])),
        }));

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
