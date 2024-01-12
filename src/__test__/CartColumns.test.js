import React from 'react';
import { render } from '@testing-library/react';
import CartColumns from '../../src/components/Cart/CartColumns';

describe('Cart.CartColumns', () => {
    it('Renders without crashing', async () => {
        await reporter.startStep('Step 1: Render CartColumns component.');
        const { container } = render(<CartColumns />);
        await reporter.endStep();

        await reporter.startStep('Step 2: Check if component is in the document.');
        expect(container).toBeInTheDocument();
        await reporter.endStep();
    });

    it('Renders the correct number of columns', async () => {

        await reporter.startStep('Step 1: Initiate rendering of the CartColumns component.');
        const { getAllByTestId } = render(<CartColumns />);
        await reporter.endStep();

        await reporter.startStep('Step 2: Verify the presence of six columns in CartColumns.');
        const columns = getAllByTestId('cart-column');
        expect(columns).toHaveLength(6);
        await reporter.endStep();
    });

    it('Renders the correct column labels', async () => {

        await reporter.startStep('Step 1: Verify the rendering of CartColumns component.');
        const { getByText } = render(<CartColumns />);
        await reporter.endStep();

        await reporter.startStep('Step 2: Ensure correct display of essential column labels.');
        expect(getByText('products')).toBeInTheDocument();
        expect(getByText('name of product')).toBeInTheDocument();
        expect(getByText('price')).toBeInTheDocument();
        expect(getByText('quantity')).toBeInTheDocument();
        expect(getByText('remove')).toBeInTheDocument();
        expect(getByText('total')).toBeInTheDocument();
        await reporter.endStep();
    });

})