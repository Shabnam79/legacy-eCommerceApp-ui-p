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
})