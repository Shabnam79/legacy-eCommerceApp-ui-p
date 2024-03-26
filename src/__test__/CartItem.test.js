import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CartItem from '../../src/components/Cart/CartItem';
import store from '../../src/utils/store'
import { Provider } from 'react-redux';


describe('Cart.CartItem', () => {
    const item = {
        id: "8PqVbtoUlX5s9XGAdfLp",
        title: 'Product 1',
        img: 'product-image.jpg',
        price: 20,
        total: 40,
        count: 2,
        quantity: 5,
    };

    it('Renders the component without crashing', async() => {

        await reporter.startStep('Step 1: Render CartItem component with sample data.');
        const { container } = render(<Provider store={store}><CartItem item={item} value={{}} /> </Provider>);
        expect(container).toBeInTheDocument();
        await reporter.endStep();

    });

    it('Able to click on trash icon click to delete item from the cart', async () => {

        await reporter.startStep('Step 1: Rendered CartItem component with provided item and store.');
        const { getByTestId } = render(<Provider store={store}><CartItem item={item} value={{}} /></Provider>);
        const trashIcon = getByTestId('trash-icon');
        await reporter.endStep();

        await reporter.startStep('Step 2: Clicked on the trash icon to delete the item.');
        fireEvent.click(trashIcon);
        await reporter.endStep();

    });

    it('Able to click "+" button on increasing quantity of an item', async () => {

        await reporter.startStep('Step 1: Render the CartItem component with the provided item.');
        const { getByText } = render(<Provider store={store}><CartItem item={item} value={{}} /> </Provider>);
        const incrementButton = getByText('+');
        await reporter.endStep();

        await reporter.startStep('Step 2: Click the increment button to increase item quantity.');
        fireEvent.click(incrementButton);
        await reporter.endStep();

    });

    it('Able to click on "-" button on decreasing quantity of an item ', async () => {

        await reporter.startStep('Step 1: Render the CartItem component with the provided item.');
        const { getByText } = render(<Provider store={store}><CartItem item={item} value={{}} /></Provider>);
        const decrementButton = getByText('-');
        await reporter.endStep();

        await reporter.startStep('Step 2: Click the decrement button to decrease item quantity.');
        fireEvent.click(decrementButton);
        await reporter.endStep();
        
    });
});







