import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Product from '../../src/components/Product';
import store from '../../src/utils/store'
import { Provider } from 'react-redux';
import userContext from "../../src/utils/userContext";
import { BrowserRouter } from 'react-router-dom';
import { async } from 'q';


const sampleProduct = {
    id: 1,
    title: 'Sample Product',
    img: 'sample.jpg',
    price: 10,
    inCart: false,
};

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
};

describe('Product', () => {
    it('Renders the product details', async () => {
        await reporter.startStep('Step 1: Rendering the Product component by providing mock data of products and user')
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <MockUserProvider value={{ user: mockUser }}>
                        <Product product={sampleProduct} />
                    </MockUserProvider>
                </Provider>
            </BrowserRouter>
        );
        await reporter.endStep()

        await reporter.startStep('Step 2: Getting the product title and price from DOM and Verifying the product title and price')
        await waitFor(() => {
            expect(screen.getByTestId('product-title')).toHaveTextContent('Sample Product');
            expect(screen.getByTestId('product-price')).toBeInTheDocument();
        });
        await reporter.endStep()
    });

    it('Checking if Add to Cart button is visible to add items to the cart', async () => {
        const addProductIntoCart = jest.fn();
        const openCartModal = jest.fn();
        await reporter.startStep('Step 1: Rendering the Product component by providing mock data')
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <MockUserProvider value={{ user: mockUser }}>
                        <Product
                            product={sampleProduct}
                            addProductIntoCart={addProductIntoCart}
                            openCartModal={openCartModal}
                        />
                    </MockUserProvider>
                </Provider>
            </BrowserRouter>
        );
        await reporter.endStep()

        await reporter.startStep('Step 2: Get add to cart button from DOM and click fire event')
        const cartButton = screen.getByTestId('add-to-cart-button');
        fireEvent.click(cartButton);
        await reporter.endStep()

        await reporter.startStep('Step 3: Get the ADD TO CART button and verify it is present on UI')
        expect(screen.getByText('ADD TO CART')).toBeInTheDocument();
        await reporter.endStep()

    })

    it('Disables the Add to Cart button when inCart is true', async () => {
        const productInCart = {
            ...sampleProduct,
            inCart: true,
        };

        await reporter.startStep('Step 1:Rendering the Product component by providing mock product data and user')
        render(<BrowserRouter>
            <Provider store={store}>
                <MockUserProvider value={{ user: mockUser }}>
                    <Product product={productInCart} />
                </MockUserProvider>
            </Provider>
        </BrowserRouter>);
        await reporter.endStep()

        await reporter.startStep('Step 2: Get the add to cart button from DOM and verify it disable when inCart is true')
        const cartButton = screen.getByTestId('add-to-cart-button');
        expect(cartButton).toBeDisabled();
        await reporter.endStep()
    });

})