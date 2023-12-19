import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import OrdersItem from '../../src/components/Orders/OrdersItem';

// Mock data for testing
const mockItem = {
    orderId: '123456',
    orderDate: new Date().toString(),
    total: 50,
    image: 'path/to/image.jpg',
    name: 'Test Product',
    productId: '789',
};

describe('Orders.OrdersItem', () => {
    test('Renders OrdersItem component with correct data', async () => {
        await reporter.startStep('Step 1: Rendering the Orderitem component providing mocked data to it.')
        render(
            <Router>
                <OrdersItem item={mockItem} />
            </Router>
        );
        await reporter.endStep()

        // Assert that the rendered component contains order details
        await reporter.startStep('Step 2: Verifying rendered component contains order details ')
        expect(screen.getByText('Order Placed')).toBeInTheDocument();
        expect(screen.getByText('Total')).toBeInTheDocument();
        expect(screen.getByText('Order Id')).toBeInTheDocument();
        await reporter.endStep()

        // Assert that the rendered component contains product details
        await reporter.startStep('Step 3: Verifying rendered component contains product details ')
        expect(screen.getByText(mockItem.name)).toBeInTheDocument();
        expect(screen.getByText(`$${mockItem.total}`)).toBeInTheDocument();
        expect(screen.getByText(mockItem.orderId)).toBeInTheDocument();
        expect(screen.getByText(`★ Rate and Review Product`)).toBeInTheDocument();
        await reporter.endStep()
    });

    test('Renders OrdersItem component with the correct image', async () => {
        await reporter.startStep('Step 1: Rendering the order item component')
        render(
            <Router>
                <OrdersItem item={mockItem} />
            </Router>
        );
        await reporter.endStep()

        // Assert that the rendered component contains the correct product image
        await reporter.startStep('Step 2: Verifying rendered component contains the correct product image.')
        const productImage = screen.getByRole('img', { name: '' });
        expect(productImage).toBeInTheDocument();
        expect(productImage.src).toContain(mockItem.image);
        await reporter.endStep()
    });

    test('Renders OrdersItem component with a link to review', async () => {
        await reporter.startStep('Step 1: Rendering the order item component')
        render(
            <Router>
                <OrdersItem item={mockItem} />
            </Router>
        );
        await reporter.endStep()

        // Assert that the rendered component contains a link to review
        await reporter.startStep('Step 2: Verifying rendered component contains a link to review ')
        const reviewLink = screen.getByRole('link', { name: /rate and review product/i });
        expect(reviewLink).toBeInTheDocument();
        expect(reviewLink.href).toContain(`/review/${mockItem.productId}/${mockItem.orderId}`);
        await reporter.endStep()
    });
});
