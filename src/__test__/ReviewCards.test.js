import React from 'react';
import { render, screen } from '@testing-library/react';
import ReviewCards from '../../src/components/Review/ReviewCards';

const mockReview = {
    rating: 4,
    title: 'Great Product',
    description: 'This product exceeded my expectations.',
};

describe('Review.ReviewCards', () => {
    test('Renders review card with correct title and description', async () => {
        await reporter.startStep('Step 1: Rendering Review card component with mocking data of title and description')
        render(<ReviewCards review={mockReview} />);
        await reporter.endStep()

        // Check if the title and description are rendered correctly
        await reporter.startStep('Step 2: Checking if the title and description are rendered correctly')
        expect(screen.getByText('Great Product')).toBeInTheDocument();
        expect(screen.getByText('This product exceeded my expectations.')).toBeInTheDocument();
        await reporter.endStep()
    });

    test('Renders star rating component with correct rating', async () => {
        await reporter.startStep('Step 1: Rendering Review card component with mocking data of title ,description and rating as passing as prop')
        render(<ReviewCards review={mockReview} />);
        await reporter.endStep()

        // Assuming StaticStarRating renders the correct star elements based on the rating prop
        // Check if the star rating component is rendered with the correct rating
        await reporter.startStep('Step 2:Checking if the star rating component is rendered with the correct rating')
        const starRatingElement = screen.getByTestId('star-rating');
        expect(starRatingElement).toHaveAttribute('data-rating', '4');
        await reporter.endStep()
    });

});
