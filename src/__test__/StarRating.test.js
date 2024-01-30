import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StarRating from '../../src/components/Review/StarRating';

describe('Review.StarRating', () => {
    it('renders without crashing', async () => {
        await reporter.startStep('Step 1: Renders without crashing')
        const { container } = render(<StarRating />);
        expect(container).toBeInTheDocument();
        await reporter.endStep()
    });

    it('renders 5 stars', async () => {
        await reporter.startStep('Step 1: Renders 5 stars')
        const { getAllByRole } = render(<StarRating />);
        const stars = getAllByRole('button');
        expect(stars.length).toBe(5);
        await reporter.endStep()
    });

    it('updates rating on click', async () => {
        await reporter.startStep('Step 1: Updating the rating while on click')
        const parentCallbackMock = jest.fn();
        const { getAllByRole } = render(<StarRating parentCallback={parentCallbackMock} />);

        // Click the 3rd star
        fireEvent.click(getAllByRole('button')[2]);

        expect(parentCallbackMock).toHaveBeenCalledWith(3);
        await reporter.endStep()
    });

    it('updates hover state on mouse enter', async () => {
        await reporter.startStep('Step 1: Updating the hover state on entering the mouse')
        const { getAllByRole } = render(<StarRating />);

        // Hover over the 4th star
        fireEvent.mouseEnter(getAllByRole('button')[3]);

        expect(getAllByRole('button')[3]).toHaveClass('star-rating-on');
        await reporter.endStep()
    });

    it('resets hover state on mouse leave', async () => {
        await reporter.startStep('Step 1: Rendering the star rating for hover state')
        const { getAllByRole } = render(<StarRating />);
        await reporter.endStep()

        // Hover over the 4th star
        await reporter.startStep('Step 2: Hovering on 4th star')
        fireEvent.mouseEnter(getAllByRole('button')[3]);
        await reporter.endStep()

        // Mouse leave
        await reporter.startStep('Step 3: Leaving the mouse after clicking')
        fireEvent.mouseLeave(getAllByRole('button')[3]);
        await reporter.endStep()

        await reporter.startStep('Step 4: Catching the class "star-rating-off" from button')
        expect(getAllByRole('button')[3]).toHaveClass('star-rating-off');
        await reporter.endStep()
    });

    it('correctly sets initial rating from prop', async () => {
        await reporter.startStep('Step 1: Setting the initial rating from props correctly')
        const { getAllByRole } = render(<StarRating myProductRating={3} />);
        const stars = getAllByRole('button');

        expect(stars[2]).toHaveClass('star-rating-on');
        await reporter.endStep()
    });
});
