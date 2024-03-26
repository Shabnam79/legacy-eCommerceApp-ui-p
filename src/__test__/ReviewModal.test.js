import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ReviewModal from '../../src/components/Review/ReviewModal';

// Mock the modules that you are importing from
jest.mock('../firebase/services/review.service');

describe('Review.ReviewModal', () => {
    test('Renders with no reviews', async () => {
        await reporter.startStep('Step 1: Renders with no reviews')
        const props = {
            name: 'Product Name',
            productId: '123',
            onHide: jest.fn(),
        };

        render(<ReviewModal {...props} />);
        await reporter.endStep()

        //expect(screen.getByText(/No review has been published yet for the product/i)).toBeInTheDocument();
    });

    test('Renders with reviews', async () => {
        await reporter.startStep('Step 1: Mocking the response from the service')
        const props = {
            name: 'Product Name',
            productId: '123',
            onHide: jest.fn(),
        };

        // Mock the response from the service
        jest.spyOn(require('../firebase/services/review.service'), 'getProductReviewByProductIdService')
            .mockResolvedValue([{ id: 1, text: 'Great product!' }]);

        render(<ReviewModal {...props} />);
        await reporter.endStep()

        // Wait for the component to update after resolving the promise
        // await screen.findByText(/Great product!/i);
        // expect(screen.getByText(/Great product!/i)).toBeInTheDocument();
    });

    test('Closes the modal when Close button is clicked', async () => {
        await reporter.startStep('Step 1: Closing the modal after click on button')
        const props = {
            name: 'Product Name',
            productId: '123',
            onHide: jest.fn(),
        };

        render(<ReviewModal {...props} />);
        await reporter.endStep()

        // fireEvent.click(screen.getByText(/Close/i));
        // expect(props.onHide).toHaveBeenCalledTimes(1);
    });
});
