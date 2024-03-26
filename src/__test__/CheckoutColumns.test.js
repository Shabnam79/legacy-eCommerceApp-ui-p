import React from 'react';
import { render } from '@testing-library/react';
import CheckoutColumns from '../../src/components/Cart/CheckoutColumns';

describe('Cart.CheckoutColumns', () => {
    it('Renders the CheckoutColumns correctly', async () => {

        await reporter.startStep('Step 1: ');
        const { getByText } = render(<CheckoutColumns />);
        await reporter.endStep();

        await reporter.startStep('Step 2: ');
        expect(getByText('products')).toBeInTheDocument();
        expect(getByText('name of product')).toBeInTheDocument();
        expect(getByText('price')).toBeInTheDocument();
        expect(getByText('quantity')).toBeInTheDocument();
        expect(getByText('total')).toBeInTheDocument();
        await reporter.endStep();

    });

    it('Renders the container with the correct class', async () => {
        await reporter.startStep('Step 1: Render the CheckoutColumns component for testing.');
        const { container } = render(<CheckoutColumns />);
        await reporter.endStep();

        await reporter.startStep('Step 2: Verify container classes for correct styling.');
        expect(container.firstChild).toHaveClass('container-fluid');
        expect(container.firstChild).toHaveClass('text-center');
        expect(container.firstChild).toHaveClass('d-none');
        expect(container.firstChild).toHaveClass('d-lg-block');
        await reporter.endStep();
    });
});