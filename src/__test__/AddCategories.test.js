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


describe('AddCategories component', () => {
    test('renders the component', () => {
        render(
            <BrowserRouter>
                <MockUserProvider value={{ user: mockUser }}>
                    <AddCategories />
                </MockUserProvider>
            </BrowserRouter>
        );
        expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    test('User should be able to submit the form with valid data', async () => {

        // Render the component
        render(
            <BrowserRouter>
                <MockUserProvider value={{ user: mockUser }}>
                    <AddCategories />
                </MockUserProvider>
            </BrowserRouter>
        );
        // Type into the input field
        fireEvent.change(screen.getByPlaceholderText('Enter Category Name'), {
            target: { value: 'TestCategory' },
        });

        // Submit the form
        fireEvent.click(screen.getByText('Submit'));

        // Reset mock functions
        jest.clearAllMocks();
    });

});
