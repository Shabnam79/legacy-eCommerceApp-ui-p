import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userContext from "../../src/utils/userContext";
import EditCategory from '../../src/components/Admin/EditCategory';
import { BrowserRouter } from 'react-router-dom';
import { updateCategoryIntoProductCategoryService } from '../../src/firebase/services/category.service'
import { toast } from 'react-toastify';


const userDetails = {
    userId: 'DYLnWFX3d2MU6pdnu059AHN2KFm2',
    email: 'Test1234@gmail.com'
};

const MockUserProvider = ({ children, value }) => {
    return (
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    );
};

// Mocking the react-toastify
jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        warning: jest.fn(),
    },
}));

// Mock your service functions
jest.mock('../../src/firebase/services/category.service', () => ({
    getCategoryByCategoryIdService: jest.fn(() => Promise.resolve([{ id: 'categoryId', Category: 'MockCategory' }])),
    updateCategoryIntoProductCategoryService: jest.fn(() => Promise.resolve()),
}));

describe('Admin.EditCategory', () => {
    it('Renders EditCategory component', async () => {
        // Mock the useParams
        jest.mock('react-router-dom', () => ({
            useParams: jest.fn(() => ({ categoryId: 'mockCategoryId' })),
            Link: ({ children }) => children,
        }));

        // Import your EditCategory component after mocking the useParams
        const EditCategory = require('../../src/components/Admin/EditCategory').default;

        await reporter.startStep('Step 1: Rendering Edit category component with mocked user data')
        render(
            <BrowserRouter>
                <MockUserProvider value={{ user: userDetails }}>
                    <EditCategory />
                </MockUserProvider>
            </BrowserRouter>
        );
        await reporter.endStep()

        await reporter.startStep('Step 2: Getting an placeholder text from DOM and verify its present on UI.')
        expect(screen.getByPlaceholderText('Enter Category Name')).toBeInTheDocument();
        await reporter.endStep()
    });

    it('Handles input change', async () => {
        await reporter.startStep('Step 1: Inititate with rendering of Edit Category component')
        render(
            <BrowserRouter>
                <MockUserProvider value={{ user: userDetails }}>
                    <EditCategory />
                </MockUserProvider>
            </BrowserRouter>
        );
        await reporter.endStep()

        await reporter.startStep('Step 2: Getting an input field from their placeholder text from DOM')
        const input = screen.getByPlaceholderText('Enter Category Name');
        await reporter.endStep()

        await reporter.startStep('Step 3: Update the input field')
        fireEvent.change(input, { target: { value: 'NewCategory' } });
        await reporter.endStep()

        await reporter.startStep('Step 4: Verify that input value should be same as present on DOM')
        expect(input.value).toBe('NewCategory');
        await reporter.endStep()
    });

    it('Submits the form and updates category', async () => {
        await reporter.startStep('Step 1: Renders Edit category component')
        render(
            <BrowserRouter>
                <MockUserProvider value={{ user: userDetails }}>
                    <EditCategory />
                </MockUserProvider>
            </BrowserRouter>
        );
        await reporter.endStep()

        await reporter.startStep('Step 2: Get an input field from DOM and fire change event on the field')
        const input = screen.getByPlaceholderText('Enter Category Name');
        fireEvent.change(input, { target: { value: 'NewCategory' } });
        await reporter.endStep()

        await reporter.startStep('Step 3: Get submit buttom from DOM and fire click event on the button')
        const submitButton = screen.getByText('Update');
        fireEvent.click(submitButton);
        await reporter.endStep()

        // Add assertions related to the expected API calls or UI changes
        await reporter.startStep('Step 4: Verify updateCategoryIntoProductCategoryService fn called and shows toast success message')
        await waitFor(() => {
            expect(updateCategoryIntoProductCategoryService).toHaveBeenCalled();
            expect(toast.success).toHaveBeenCalledWith('Category updated in admin list', { autoClose: 1000 })
        });
        await reporter.endStep()
    });

    it('Displays warning when category already exists', async () => {
        await reporter.startStep('Step 1: Renders Edit category component without crashing')
        render(
            <BrowserRouter>
                <MockUserProvider value={{ user: userDetails }}>
                    <EditCategory />
                </MockUserProvider>
            </BrowserRouter>
        );
        await reporter.endStep()

        await reporter.startStep('Step 2: Get an input field from DOM and fire change event on the field')
        const input = screen.getByPlaceholderText('Enter Category Name');
        fireEvent.change(input, { target: { value: 'MockCategory' } });
        await reporter.endStep()

        await reporter.startStep('Step 3: Get submit buttom from DOM and fire click event on the button')
        const submitButton = screen.getByText('Update');
        fireEvent.click(submitButton);
        await reporter.endStep()
    });
});

