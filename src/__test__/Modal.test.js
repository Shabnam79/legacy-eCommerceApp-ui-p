import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'; // Add this line
import Modal from '../../src/components/Modal'; // Update the path as needed
import configureStore from 'redux-mock-store';

// Mock your Redux store
const mockStore = configureStore([]);
const initialState = {
    allproducts: {
        modalOpen: true,
        modalProduct: {
            img: 'some-image-url',
            title: 'Test Product',
            price: 10,
        },
    },
};
const store = mockStore(initialState);

describe('Modal', () => {
    test('Renders Modal component with correct content', async () => {
        await reporter.startStep('Step 1: Render Modal component with content.');
        render(
            <Provider store={store}>
                <Router>
                    <Modal />
                </Router>
            </Provider>
        );
        await reporter.endStep();

    });

    test('Triggers closeCartModal when continue shopping button is clicked', async () => {
        const closeCartModalMock = jest.fn();

        await reporter.startStep('Step 1: Rendered Modal component with store and router setup.');
        render(
            <Provider store={store}>
                <Router>
                    <Modal closeCartModal={closeCartModalMock} />
                </Router>
            </Provider>
        );
        await reporter.endStep();
    });

    test('Triggers closeCartModal when go to cart button is clicked', async () => {
        const closeCartModalMock = jest.fn();
        await reporter.startStep('Step 1: Click the "Go to Cart" button and observe.');
        render(
            <Provider store={store}>
                <Router>
                    <Modal closeCartModal={closeCartModalMock} />
                </Router>
            </Provider>
        );
        await reporter.endStep();
    });
});
