import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CheckoutItem from '../../src/components/Cart/CheckoutItem';
import { Provider } from 'react-redux';
import store from '../../src/utils/store'


describe('Cart.CheckoutItem', () => {
    const mockItem = {
        company: "Mock Product",
        count: 1,
        id: "rlgm997oiWc2jCrgr80l",
        img: "img/product-10.png",
        inCart: true,
        info: "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
        price: 15,
        productId: "nCBlyCfdsp86bK7tiEO1",
        title: "Adidas T-shirt",
        userId: "DYLnWFX3d2MU6pdnu059AHN2KFm2"
    };

    const mockFetchAddToCartData = jest.fn();

    test('Renders the Checkout Item component without crashing', async () => {

        await reporter.startStep('Step 1: Render Checkout Item component with mock data.');
        render(
            <Provider store={store}>
                <CheckoutItem item={mockItem} fetchAddToCartData={mockFetchAddToCartData} />
            </Provider>
        );
        await reporter.endStep();

    });


    test('Renders product details correctly', async () => {

        await reporter.startStep('Step 1: Initiate rendering of CheckoutItem component with mock data.');
        render(<Provider store={store}><CheckoutItem item={mockItem} fetchAddToCartData={mockFetchAddToCartData} /> </Provider>);
        await reporter.endStep();

        // Check if product details are rendered
        await reporter.startStep('Step 2: Verify product details display correctly on the screen.');
        expect(screen.getByAltText('product')).toBeInTheDocument();
        expect(screen.getByText(/product/i)).toBeInTheDocument();
        expect(screen.getByText(/price/i)).toBeInTheDocument();
        expect(screen.getByText(`$ ${mockItem.price * mockItem.count}`)).toBeInTheDocument();
        await reporter.endStep();

    });
});
