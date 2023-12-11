import React from 'react';
import { render, screen } from '@testing-library/react';
import WishlistColumns from '../../src/components/Wishlist/WishlistColumns';

describe('WishlistColumns Component', () => {
    it('renders product column', () => {
        render(<WishlistColumns />);
        const productColumn = screen.getByText('products');
        expect(productColumn).toBeInTheDocument();
    });

    it('renders company column', () => {
        render(<WishlistColumns />);
        const companyColumn = screen.getByText('company');
        expect(companyColumn).toBeInTheDocument();
    });

    it('renders name of product column', () => {
        render(<WishlistColumns />);
        const nameColumn = screen.getByText('name of product');
        expect(nameColumn).toBeInTheDocument();
    });

    it('renders price column', () => {
        render(<WishlistColumns />);
        const priceColumn = screen.getByText('price');
        expect(priceColumn).toBeInTheDocument();
    });

    it('renders remove column', () => {
        render(<WishlistColumns />);
        const removeColumn = screen.getByText('remove');
        expect(removeColumn).toBeInTheDocument();
    });
});
