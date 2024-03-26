import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userContext from "../../src/utils/userContext";
import { getOrderService } from '../../src/firebase/services/order.service';
import { BrowserRouter } from 'react-router-dom';
import Orders from '../../src/components/Orders/Orders';

// Mocking the userContext module
const mockUser = {
    userId: "DYLnWFX3d2MU6pdnu059AHN2KFm2",
    email: "Test1234@gmail.com",
};


const MockUserProvider = ({ children, value }) => {
    return (
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    );
};;

// Mocking the getOrderService and deleteRecordFromFirebaseService functions
jest.mock('../../src/firebase/services/order.service', () => ({
    getOrderService: jest.fn(() => Promise.resolve([])),
}));


describe('Orders.Orders', () => {
    it('Renders EmptyOrders when there are no orders', async () => {
        await reporter.startStep('Step 1: Rendering Orders component providing mocked user data to it.')
        render(<MockUserProvider value={{ user: mockUser }}><Orders /></MockUserProvider>);
        await reporter.endStep()

        // Wait for the component to fetch orders
        await reporter.startStep('Step 2: Verifying and Wait for the component to fetch orders')
        await waitFor(() => {
            expect(screen.getByText(/There is no orders/i)).toBeInTheDocument();
        });
        await reporter.endStep()
    });

    it('Renders OrdersList when there are orders', async () => {
        const mockOrders = [{
            id: "1FB9cUcCJfJY1kBTSFcE",
            image: "img/product-4.png",
            name: "htc",
            orderDate: "Tue Oct 31 2023 18:24:51 GMT+0530 (India Standard Time)",
            orderId: "be5d5e67-126d-497f-9471-f4b84a753088",
            price: 18,
            productId: "AIpOM6VRVzk7Ani1JuQW",
            quantity: 1,
            total: 18,
            userId: "DYLnWFX3d2MU6pdnu059AHN2KFm2"
        }, {
            id: "yRalC7VCqMfe6tVR79jD",
            image: "img/product-4.png",
            name: "htc",
            orderDate: "Thu Nov 30 2023 23:20:04 GMT-0500 (Eastern Standard Time)",
            orderId: "0c9a9a20-084b-4a07-ae07-ff51a1e6fdb6",
            price: 18,
            productId: "AIpOM6VRVzk7Ani1JuQW",
            quantity: 1,
            total: 18,
            userId: "DYLnWFX3d2MU6pdnu059AHN2KFm2"
        }];

        getOrderService.mockResolvedValueOnce(mockOrders);

        await reporter.startStep('Step 1: Rendering Orders component ')
        render(<BrowserRouter><MockUserProvider value={{ user: mockUser }}><Orders /></MockUserProvider></BrowserRouter>);
        await reporter.endStep()

        // Wait for the component to fetch orders
        await reporter.startStep('Step 2: Wait for the component to fetch orders ')
        await waitFor(() => {
            const orderPlacedElements = screen.getAllByText(/Order Placed/i);
            expect(orderPlacedElements[0]).toBeInTheDocument();
        });
        await reporter.endStep()

        // Assert that the OrdersList component is rendered
        await reporter.startStep('Step 3: Verifying OrdersList component is rendered when there are orders')
        expect(screen.getByTestId('orders-list')).toBeInTheDocument();
        await reporter.endStep()
    });

});
