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

    it('Renders the component without crashing', () => {
        const { container } = render(<Provider store={store}><CartItem item={item} value={{}} /> </Provider>);
        expect(container).toBeInTheDocument();
    });

    it('Able to click on trash icon click to delete item from the cart', () => {
        const { getByTestId } = render(<Provider store={store}><CartItem item={item} value={{}} /></Provider>);
        const trashIcon = getByTestId('trash-icon');

        fireEvent.click(trashIcon);

    });

    it('Able to click "+" button on increasing quantity of an item', () => {
        const { getByText } = render(<Provider store={store}><CartItem item={item} value={{}} /> </Provider>);
        const incrementButton = getByText('+');

        fireEvent.click(incrementButton);
    });

    it('Able to click on "-" button on decreasing quantity of an item ', () => {
        const { getByText } = render(<Provider store={store}><CartItem item={item} value={{}} /></Provider>);
        const decrementButton = getByText('-');

        fireEvent.click(decrementButton);
    });
});







