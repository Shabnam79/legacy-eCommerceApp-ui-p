import React from 'react';
import { render } from '@testing-library/react';
import OrderSummary from '../../src/components/Cart/OrderSummary';

describe('Cart.OrderSummary', () => {

    test('Renders OrderSummary component without crashing', async () => {
        const cartItems = [
            {
                categoryId: "vxxbw52EaQnb6aCDwJAd",
                company: "apple",
                count: 1,
                id: "WQJKVI4oJSYmJIgfGKQM",
                img: "img/product-6.png",
                inCart: false,
                info: "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
                price: 17,
                title: "Vintage Iphone",
                total: 0
            },
            {
                categoryId: "swoxKYVH3rbzPfeC1lhq",
                company: "Madame",
                count: 1,
                id: "aQzTq2UIaRpX6gVbw7hB",
                img: "img/product-11.jpg",
                inCart: false,
                info: "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
                price: 12,
                title: "Madame Jeans",
                total: 0
            }
        ];
        const subtotal = 50.00;
        const shippingCost = 10.00;
        const totalAmount = 60.00;

        await reporter.startStep('Step 1: Rendering the Order Summary component by providing mocked data of cartitems')
        const { getByTestId, getByText } = render(
            <OrderSummary
                cartItems={cartItems}
                subtotal={subtotal}
                shippingCost={shippingCost}
                totalAmount={totalAmount}
            />
        );
        await reporter.endStep()

        // Check if the component renders successfully
        await reporter.startStep('Step 2: Getting an order summary component by test-id from DOM ')
        const orderSummaryElement = getByTestId('order-summary');
        await reporter.endStep()

        await reporter.startStep('Step 3: Verifying component renders successfully')
        expect(orderSummaryElement).toBeInTheDocument();
        await reporter.endStep()
    });

    test('Renders OrderSummary component with correct values', async () => {
        const cartItems = [
            {
                categoryId: "vxxbw52EaQnb6aCDwJAd",
                company: "apple",
                count: 1,
                id: "WQJKVI4oJSYmJIgfGKQM",
                img: "img/product-6.png",
                inCart: false,
                info: "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
                price: 17,
                title: "Vintage Iphone",
                total: 0
            },
            {
                categoryId: "swoxKYVH3rbzPfeC1lhq",
                company: "Madame",
                count: 1,
                id: "aQzTq2UIaRpX6gVbw7hB",
                img: "img/product-11.jpg",
                inCart: false,
                info: "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
                price: 12,
                title: "Madame Jeans",
                total: 0
            }
        ];
        const subtotal = 50.00;
        const shippingCost = 10.00;
        const totalAmount = 60.00;

        await reporter.startStep('Step 1: Rendering the Order Summary component providig mocked data to it')
        const { getByTestId, getByText } = render(
            <OrderSummary
                cartItems={cartItems}
                subtotal={subtotal}
                shippingCost={shippingCost}
                totalAmount={totalAmount}
            />
        );
        await reporter.endStep()

        // Check if the component renders successfully
        await reporter.startStep('Step 2: Verifying if component renders successfully ')
        const orderSummaryElement = getByTestId('order-summary');
        expect(orderSummaryElement).toBeInTheDocument();
        await reporter.endStep()

        // Check if the subtotal, shipping, and total amount are displayed correctly
        await reporter.startStep('Step 1: Verifying if the subtotal, shipping, and total amount are displayed correctly')
        expect(getByText(`Subtotal: $${subtotal.toFixed(2)}`)).toBeInTheDocument();
        expect(getByText(`Shipping: $${shippingCost.toFixed(2)}`)).toBeInTheDocument();
        expect(getByText(`Total Amount: $${totalAmount.toFixed(2)}`)).toBeInTheDocument();
        await reporter.endStep()
    });
});
