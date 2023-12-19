import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import ProductList from '../../src/components/ProductList';
import store from '../../src/utils/store'
import { fetchProducts } from '../../src/utils/productSlice'
import { BrowserRouter } from 'react-router-dom';

describe('ProductList', () => {
    const MockedStateData = {
        allproducts: {
            allproducts: [
                {
                    categoryId: "vxxbw52EaQnb6aCDwJAd",
                    img: "img/product-4.png",
                    price: 18,
                    count: 0,
                    info: "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
                    inCart: false,
                    total: 0,
                    title: "HTC 10 - White",
                    company: "htc",
                    inWishlist: false,
                    userId: "DYLnWFX3d2MU6pdnu059AHN2KFm2",
                    id: "AIpOM6VRVzk7Ani1JuQW"
                },
                {
                    price: 15,
                    title: "Godrej-Sofa",
                    count: 0,
                    userId: "DYLnWFX3d2MU6pdnu059AHN2KFm2",
                    total: 0,
                    productId: "CkEUN99G13fD8ut8WZyR",
                    img: "img/product-12.jpg",
                    inCart: false,
                    info: "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
                    company: "Godrej",
                    categoryId: "tbdBvmy8IxenNNBcNwmx",
                    id: "CkEUN99G13fD8ut8WZyR"

                }
            ],
        },
    };

    jest.mock('../../src/utils/productSlice', () => ({
        ...jest.requireActual('../../src/utils/productSlice'),
        fetchProducts: jest.fn(),
    }));

    it('Renders ProductList component', async () => {
        await reporter.startStep('Step 1: Rendering Productlist component by providing mocked data to the component')
        render(
            <BrowserRouter>
                <Provider store={store}>

                    <ProductList allProducts={MockedStateData} />

                </Provider>
            </BrowserRouter>
        );
        await reporter.endStep()

        await reporter.startStep('Step 2: Wait for render and check for All category text is present in the component')
        await waitFor(() => {
            waitFor(() => expect(screen.getByText('All Category')).toBeInTheDocument());
        });
        await reporter.endStep()
    });

    it('Fetches products when a category is selected', async () => {
        await reporter.startStep('Step 1: Rendering Product List component without crashing')
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <ProductList />
                </Provider>
            </BrowserRouter>
        );
        await reporter.endStep()

        try {
            await reporter.startStep('Step 2: verify dropdown with text all category is visible on UI and fire click event')
            const dropdownButton = screen.getByText('All Category');
            fireEvent.click(dropdownButton);
            await reporter.endStep()

            await reporter.startStep('Step 3: Getting dropdown items from the DOM')
            const allCategoryItem = screen.getByText('All Category');
            const sportsItem = screen.getByText('Sports');
            const clothingItem = screen.getByText('Clothing');
            await reporter.endStep()

            await reporter.startStep('Step 4: Verify those dropdown items are present on the UI and click one of the item')
            expect(allCategoryItem).toBeInTheDocument();
            expect(sportsItem).toBeInTheDocument();
            expect(clothingItem).toBeInTheDocument()
            fireEvent.click(sportsItem);
            await reporter.endStep()

            await reporter.startStep('Step 5: After click on one of the item from the dropdown, calls fetchproducts function to get product list')
            await waitFor(() => {
                expect(fetchProducts).toHaveBeenCalledWith('1');
            });
            await reporter.endStep()

        } catch (error) {
            console.error('Error in test:', error);
        }
    })
})
