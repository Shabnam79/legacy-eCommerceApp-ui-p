import React from 'react';
import { render, screen } from '@testing-library/react';
import EmptyOrders from '../../src/components/Orders/EmptyOrders';

describe('Orders.EmptyOrders', () => {
    test('Renders EmptyOrders component', async () => {
        await reporter.startStep('Step 1: Initiate the rendering of Empty Orders component')
        render(<EmptyOrders />);
        await reporter.endStep()

        await reporter.startStep('Step 2: Getting an h1 element from the DOM and verify it;s present in the DOM')
        const h1Element = screen.getByText(/There is no orders/i);
        expect(h1Element).toBeInTheDocument();
        await reporter.endStep()
    });

    test('Has the correct class name for container', async () => {
        await reporter.startStep('Step 1: Renders Empty Orders component')
        render(<EmptyOrders />);
        await reporter.endStep()

        await reporter.startStep('Step 2: Getting a container element from DOM and verify it has correct classname for it.')
        const containerElement = screen.getByTestId('empty-orders-container');
        expect(containerElement).toHaveClass('container');
        await reporter.endStep()
    });

    test('Has the correct class name for row', async () => {
        await reporter.startStep('Step 1: Verifying the component renders successfully')
        render(<EmptyOrders />);
        await reporter.endStep()

        await reporter.startStep('Step 2: Getting row element from DOM and verify it is present on UI with class name')
        const rowElement = screen.getByTestId('empty-orders-row');
        expect(rowElement).toHaveClass('row');
        await reporter.endStep()
    });

    test('Has the correct class name for column', async () => {
        await reporter.startStep('Step 1: Verifying the component renders successfully')
        render(<EmptyOrders />);
        await reporter.endStep()

        await reporter.startStep('Step 2: Getting column element from DOM and verify it is present on UI with class name')
        const colElement = screen.getByTestId('empty-orders-column');
        expect(colElement).toHaveClass('col-10');
        await reporter.endStep()
    });

    test('Has the correct class name for text center', async () => {
        await reporter.startStep('Step 1: Initiate with rendering of component Empty Orders')
        render(<EmptyOrders />);
        await reporter.endStep()

        await reporter.startStep('Step 2: Getting a text centered element from DOM and verify element acquires text center class')
        const textCenterElement = screen.getByTestId('empty-orders-column');
        expect(textCenterElement).toHaveClass('text-center');
        await reporter.endStep()
    });

    test('Has the correct class name for text title', async () => {
        await reporter.startStep('Step 1: Initiate with rendering of component Empty Orders')
        render(<EmptyOrders />);
        await reporter.endStep()

        await reporter.startStep('Step 2: Getting a title element from DOM and verify it is present on UI with class name')
        const textTitleElement = screen.getByTestId('empty-orders-column');
        expect(textTitleElement).toHaveClass('text-title');
        await reporter.endStep()
    });
});


