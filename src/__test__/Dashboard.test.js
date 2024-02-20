import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Dashboard from '../../src/components/Admin/dashboard';

// Mocking react-router-dom's Link component
jest.mock('react-router-dom', () => ({
    Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

// Mocking react-redux's useDispatch
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
}));

// Mocking react-toastify
jest.mock('react-toastify', () => ({
    toast: {
        warning: jest.fn(),
    },
}));

const mockProductData = [];

// Mocking firebase functions
jest.mock('../../src/firebase/services/product.service.js', () => ({
    getProductsService: jest.fn(() => Promise.resolve(mockProductData)),
    getProductsServiceByUserId: jest.fn(() => Promise.resolve([])),
    getProductByIdService: jest.fn(() => Promise.resolve({})),
    deleteRecordFromFirebaseService: jest.fn(() => Promise.resolve()),
}));

describe('Admin.Dashboard', () => {
    test('Renders product data correctly', async () => {
        // Arrange
        await reporter.startStep('Step 1: Render Dashboard with mock user.');
        const mockUser = { userId: '123' };
        jest.spyOn(React, 'useContext').mockReturnValueOnce({ user: mockUser });
        render(<Dashboard />);
        await reporter.endStep();

        // Act
        await reporter.startStep('Step 2: Wait for asynchronous actions to complete.');
        await waitFor(() => { });
        await reporter.endStep();

        // Assert
        await reporter.startStep('Step 3: Confirm "Add Product" text presence.');
        expect(screen.getByText('Add Product')).toBeInTheDocument();
        await reporter.endStep();
    });

    test('Renders product columns after fetching', async () => {
        // Arrange
        await reporter.startStep('Step 1: Set up mock data and fetch product columns.');
        const mockUser = { userId: '123' };
        jest.spyOn(React, 'useContext').mockReturnValueOnce({ user: mockUser });
        const mockProductData = [
            {
                category: "Sports",
                categoryId: "bzolv9xdDoqZwEIjl78z",
                company: "Adidas",
                id: "6wxLfix3VDwBZ29h24Gm",
                img: "https://firebasestorage.googleapis.com/v0/b/tx-ai-engine-ff6f7.appspot.com/o/ProductImages%2F075cafd0-1005-40ee-bab9-c4753f28947a%2Fshoe1.jpeg?alt=media&token=c1c53492-671a-4050-9b29-53d588663d8c",
                info: "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
                isStock: true,
                price: "200",
                productId: "075cafd0-1005-40ee-bab9-c4753f28947a",
                quantity: "12",
                title: "Football Shoe",
                userId: "DYLnWFX3d2MU6pdnu059AHN2KFm2"
            },
            {
                category: "Stationary",
                categoryId: "0G62YSdCqd15fXkw4TUe",
                company: "Natraj",
                id: "IkekdXrpGiENLjHaGogB",
                img: "https://firebasestorage.googleapis.com/v0/b/tx-ai-engine-ff6f7.appspot.com/o/ProductImages%2Ffb21c804-6e88-4d1a-bf1e-022a1d48ec28%2FBook3.jpg?alt=media&token=3cb66265-03ee-46ba-b91d-0a08b71a8c27",
                info: "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
                isStock: true,
                price: "234",
                productId: "fb21c804-6e88-4d1a-bf1e-022a1d48ec28",
                quantity: "12",
                title: "TextBook",
                userId: "DYLnWFX3d2MU6pdnu059AHN2KFm2"
            },
        ];
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockProductData),
        });
        await reporter.endStep();

        // Act
        await reporter.startStep('Step 2: Render Dashboard and wait for data.');
        render(<Dashboard />);
        await waitFor(() => { });
        await reporter.endStep();

        // Assert
        await reporter.startStep('Step 3: Ensure two rows are present (header, product).');
        expect(screen.queryAllByRole('rowgroup')).toHaveLength(2); // Header row and data row
        await reporter.endStep();

    });

});
