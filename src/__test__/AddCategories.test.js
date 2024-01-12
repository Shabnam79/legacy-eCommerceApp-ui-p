import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userContext from "../../src/utils/userContext";
import AddCategories from '../../src/components/Admin/AddCategories';
import { BrowserRouter } from 'react-router-dom';

const mockUser = {
    userId: "mockUserId",
    email: "Test1234@gmail.com",
};

const MockUserProvider = ({ children, value }) => {
    return (
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    );
};


// Mock the firebase module
jest.mock('../../src/firebase/services/category.service', () => ({
    getCategoryServiceByUserId: jest.fn(),
    saveCategoryIntoProductCategoryService: jest.fn(),
}));


describe('Admin.AddCategories', () => {

    test('Renders the Add categories component of Admin', async () => {
        await reporter.startStep('Step 1: Rendering the component')
        render(
            <BrowserRouter>
                <MockUserProvider value={{ user: mockUser }}>
                    <AddCategories />
                </MockUserProvider>
            </BrowserRouter>
        );

        await reporter.endStep()

        await reporter.startStep('Step 2: Verifying result')
        expect(screen.getByText('Submit')).toBeInTheDocument();
        await reporter.endStep()

    })


    test('User should be able to submit the form with valid data', async () => {

        // Render the component
        await reporter.startStep('Step 1: Rendering the component to able to view the form')
        render(
            <BrowserRouter>
                <MockUserProvider value={{ user: mockUser }}>
                    <AddCategories />
                </MockUserProvider>
            </BrowserRouter>
        );
        await reporter.endStep()


        await reporter.startStep('Step 2: Able to type the data into the input field of Enter Category Name')
        // Type into the input field
        fireEvent.change(screen.getByPlaceholderText('Enter Category Name'), {
            target: { value: 'TestCategory' },
        });
        await reporter.endStep()

        await reporter.startStep('Step 3: Submit the form')
        // Submit the form
        fireEvent.click(screen.getByText('Submit'));
        await reporter.endStep()

        // Reset mock functions
        jest.clearAllMocks();
    });

});