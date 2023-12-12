import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WishlistItem from '../../src/components/Wishlist/WishlistItem';

// Mock dependencies
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));
jest.mock('../firebase/services/product.service', () => ({
    deleteRecordFromFirebaseService: jest.fn(),
}));
jest.mock('../firebase/services/wishlist.service', () => ({
    getWishlistByIdService: jest.fn(),
}));

// Mock toast library
jest.mock('react-toastify', () => ({
    toast: {
        warning: jest.fn(),
    },
}));

describe('Wishlist.WishlistItem', () => {
    const item = {
        id: 1,
        company: 'Test Company',
        title: 'Test Product',
        img: 'test-image.jpg',
        price: 20,
    };

    const value = {};
    const fetchAddToWishlistData = jest.fn();
    const removeWishlist = jest.fn();

    it('Renders WishlistItem component', () => {
        render(
            <WishlistItem
                item={item}
                value={value}
                fetchAddToWishlistData={fetchAddToWishlistData}
                removeWishlist={removeWishlist}
            />
        );

        const companyElements = screen.queryAllByText(/company/i);
        expect(companyElements.length).toBeGreaterThan(0);
    });

    it('User should able to click trash icon to remove an item from wishlist', () => {

        render(
            <WishlistItem
                item={item}
                value={value}
            />
        );

        // Click the trash icon
        fireEvent.click(screen.getByTestId('trash-icon'));
    });
});
