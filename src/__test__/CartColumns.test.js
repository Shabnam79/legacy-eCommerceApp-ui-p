import React from 'react';
import { render } from '@testing-library/react';
import CartColumns from '../../src/components/Cart/CartColumns';

describe('Cart.CartColumns', () => {
    it('Renders without crashing', () => {
        const { container } = render(<CartColumns />);
        expect(container).toBeInTheDocument();
    });

    it('Renders the correct number of columns', () => {
        const { getAllByTestId } = render(<CartColumns />);
        const columns = getAllByTestId('cart-column');
        expect(columns).toHaveLength(6);
    });

    it('Renders the correct column labels', () => {
        const { getByText } = render(<CartColumns />);
        expect(getByText('products')).toBeInTheDocument();
        expect(getByText('name of product')).toBeInTheDocument();
        expect(getByText('price')).toBeInTheDocument();
        expect(getByText('quantity')).toBeInTheDocument();
        expect(getByText('remove')).toBeInTheDocument();
        expect(getByText('total')).toBeInTheDocument();
    });

})