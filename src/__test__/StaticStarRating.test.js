import React from 'react';
import { render } from '@testing-library/react';
import StaticStarRating from '../../src/components/Review/StaticStarRating';

describe('Review.StaticStarRating', () => {
    it('Renders the component with the correct rating', async () => {
        await reporter.startStep('Step 1: Rendering Static Star rating component and passing dummy data to product rating prop')
        const { getByTestId } = render(<StaticStarRating myProductRating={3} />);
        await reporter.endStep()

        await reporter.startStep('Step 2: Getting star rating element from DOM using test id and checking it with dummy data provided')
        const starRatingElement = getByTestId('star-rating');
        expect(starRatingElement).toHaveAttribute('data-rating', '3');
        await reporter.endStep()
    });

    it('Renders the correct number of stars highlighted based on the rating', async () => {
        await reporter.startStep('Step 1: Rendering the Star Rating component by providing dummy data to productingRating as a prop ')
        const { container } = render(<StaticStarRating myProductRating={2} />);
        await reporter.endStep()

        await reporter.startStep('Step 2: Getting Stars from DOM using classname and verifying correct number of stars highlighted based on the rating')
        const starButtons = container.querySelectorAll('.star-rating-button');
        expect(starButtons[0]).toHaveClass('star-rating-on');
        expect(starButtons[1]).toHaveClass('star-rating-on');
        expect(starButtons[2]).toHaveClass('star-rating-off');
        expect(starButtons[3]).toHaveClass('star-rating-off');
        expect(starButtons[4]).toHaveClass('star-rating-off');
        await reporter.endStep()
    });

    it('Displays the correct number of stars based on the given rating', async () => {
        await reporter.startStep('Step 1: Rendering Static Star rating component and passing dummy data to product rating prop')
        const { container } = render(<StaticStarRating myProductRating={4} />);
        await reporter.endStep()

        await reporter.startStep('Step 2: Getting an element from DOM based on classname')
        const starButtons = container.querySelectorAll('.star-rating-button');
        await reporter.endStep()

        await reporter.startStep('Step 3: Verifying correct number of stars based on the given rating ')
        expect(starButtons).toHaveLength(5);
        await reporter.endStep()
    });

});
