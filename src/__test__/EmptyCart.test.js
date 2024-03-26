import React from 'react';
import { render } from '@testing-library/react';
import EmptyCart from '../../src/components/Cart/EmptyCart';

describe('Cart.EmptyCart', () => {
    it('Renders without crashing', async () => {
        await reporter.startStep('Step 1: Rendering the Empty Cart component')
        const { getByTestId } = render(<EmptyCart />);
        await reporter.endStep()

        await reporter.startStep('Step 2: Getting an empty cart element from DOm and verify its present on UI.')
        const emptyCartElement = getByTestId('empty-cart');
        expect(emptyCartElement).toBeInTheDocument();
        await reporter.endStep()
    });

    it('Displays the correct message', async () => {
        await reporter.startStep('Step 1: Rendering the Empty Cart component')
        const { getByText } = render(<EmptyCart />);
        await reporter.endStep()

        await reporter.startStep('Step 2: Getting an empty cart message from DOM and verify it is present on UI.')
        const emptyCartMessage = getByText('Your cart is currently empty');
        expect(emptyCartMessage).toBeInTheDocument();
        await reporter.endStep()
    });

    it('Has the correct CSS class', async () => {
        await reporter.startStep('Step 1: Rendering the Empty Cart component')
        const { getByTestId } = render(<EmptyCart />);
        await reporter.endStep()

        await reporter.startStep('Step 2: Getting an empty cart element from DOM and verify it has a class name associated with it.')
        const emptyCartElement = getByTestId('empty-cart');
        expect(emptyCartElement).toHaveClass('container mt-5');
        await reporter.endStep()
    });

    //ensures that the rendered component matches the previous snapshot.
    //This is useful for detecting unexpected changes in the component's appearance over time
    it('Matches snapshot', async () => {
        await reporter.startStep('Step 1: Rendering the Empty Cart component and verify it matches with snapshot')
        const { asFragment } = render(<EmptyCart />);
        expect(asFragment()).toMatchSnapshot();
        await reporter.endStep()
    });
});
