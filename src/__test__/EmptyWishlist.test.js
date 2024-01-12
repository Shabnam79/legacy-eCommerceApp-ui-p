
import React from 'react';
import { render } from '@testing-library/react';
import EmptyWishlist from '../../src/components/Wishlist/EmptyWishlist';

describe('Wishlist.EmptyWishlist', () => {

    it('Should render without crashing', async () => {
        await reporter.startStep('Step 1: Verifying that EmptyWishlist component renders without crashing')
        render(<EmptyWishlist />);
        await reporter.endStep()
    });


    it('Should render the correct message', async () => {
        await reporter.startStep('Step 1:Initiate EmptyWishlist component renders')
        const { getByText } = render(<EmptyWishlist />);
        await reporter.endStep()

        await reporter.startStep('Step 2: Verifying that Correct message will display when there is no data')
        const messageElement = getByText('Your wishlist is currently empty');
        expect(messageElement).toBeInTheDocument();
        await reporter.endStep()
    });


    it('Should be inside a container with specific class', async () => {
        await reporter.startStep('Step 1:Initiate EmptyWishlist component renders')
        const { container } = render(<EmptyWishlist />);
        await reporter.endStep()

        await reporter.startStep('Step 2:Verifying EmptyWishlist component renders with specific class')
        const containerElement = container.querySelector('.container');
        expect(containerElement).toBeInTheDocument();
        await reporter.endStep()

    });

    it('Should be inside a row with specific class', async () => {
        await reporter.startStep('Step 1:Initiate EmptyWishlist component renders')
        const { container } = render(<EmptyWishlist />);
        await reporter.endStep()

        await reporter.startStep('Step 2: Verify component renders inside a row with specific class')
        const rowElement = container.querySelector('.row');
        expect(rowElement).toBeInTheDocument();
        await reporter.endStep()
    });


    it('Should be inside a column with specific class', async () => {
        await reporter.startStep('Step 1:Initiate EmptyWishlist component renders')
        const { container } = render(<EmptyWishlist />);
        await reporter.endStep()

        await reporter.startStep('Step 2: Verify component should have a column with specific class')
        const colElement = container.querySelector('.col-10');
        expect(colElement).toBeInTheDocument();
        await reporter.endStep()
    });

    it('Should have the correct text title class', async () => {
        await reporter.startStep('Step 1: Initiate EmptyWishlist component renders')
        const { container } = render(<EmptyWishlist />);
        await reporter.endStep()

        await reporter.startStep('Step 2: Verify component have correct text with title class')
        const textTitleElement = container.querySelector('.text-title');
        expect(textTitleElement).toBeInTheDocument();
        await reporter.endStep()
    });

});
