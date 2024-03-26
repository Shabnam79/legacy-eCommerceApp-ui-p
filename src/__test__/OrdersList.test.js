import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Orders from '../../src/components/Orders/OrdersList';

const mockOrders = [
    {
        id: 1,
        orderId: '123456',
        orderDate: new Date().toString(),
        total: 50,
        image: 'path/to/image.jpg',
        name: 'Test Product',
        productId: '789',
    },
    {
        id: 2,
        orderId: '789101',
        orderDate: new Date().toString(),
        total: 20,
        image: 'path/to/image1.jpg',
        name: 'Testify Product',
        productId: '567',
    },

];

describe('Orders.OrdersList', () => {
    it('Renders the orders list correctly', async () => {
        await reporter.startStep('Step 1: Rendering the Orders component providing mocked orders data to it.')
        render(<Router><Orders orders={mockOrders} /> </Router>);
        await reporter.endStep()

        await reporter.startStep('Step 2: Verifying the component is present in the DOM and renders successfully.')
        const ordersList = screen.getByTestId('orders-list');
        expect(ordersList).toBeInTheDocument();
        await reporter.endStep()

        // Ensure each order item is rendered
        await reporter.startStep('Step 3: Verifying each order item has been rendered successfully')
        mockOrders.forEach(order => {
            // Find the paragraph element directly containing the order ID
            const orderIdParagraph = screen.getByText(`${order.orderId}`);

            // Assert that the order ID is present and has the correct value
            expect(orderIdParagraph).toBeInTheDocument();
        });
        await reporter.endStep()

    });

    it('Passes correct props to OrdersItem component', async () => {
        await reporter.startStep('Step 1: Rendering the Orders component providing mocked orders data')
        render(<Router><Orders orders={mockOrders} /> </Router>);
        await reporter.endStep()

        await reporter.startStep('Step 2:Verifying correct props provided to component')
        mockOrders.forEach(order => {
            const ordersItem = screen.getByText(`${order.orderId}`);
            expect(ordersItem).toBeInTheDocument();
            expect(ordersItem).toHaveTextContent(order.orderId);
        });
        await reporter.endStep()
    });

})


