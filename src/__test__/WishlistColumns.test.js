import React from 'react';
import { render, screen } from '@testing-library/react';
import WishlistColumns from '../../src/components/Wishlist/WishlistColumns';

describe('Wishlist.WishlistColumns', () => {
    it('Renders Wishlist Column', async () => {
        await reporter.startStep('Step 1: Rendering WishlistColumns component')
        render(<WishlistColumns />);
        await reporter.endStep()
    });
});
