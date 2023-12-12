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
    getCategoryServiceByUserId: jest.fn(() => Promise.resolve([{ id: 'categoryId', Category: 'MockCategory' }])),
    updateCategoryIntoProductCategoryService: jest.fn(() => Promise.resolve()),
}));

describe('EditCategory Component', () => {
    it('renders EditCategory component', () => {
        // Mock the useParams
        jest.mock('react-router-dom', () => ({
            useParams: jest.fn(() => ({ categoryId: 'mockCategoryId' })),
            Link: ({ children }) => children,
        }));

        // Import your EditCategory component after mocking the useParams
        const EditCategory = require('../../src/components/Admin/EditCategory').default;

        render(
            <BrowserRouter>
                <MockUserProvider value={{ user: userDetails }}>
                    <EditCategory />
                </MockUserProvider>
            </BrowserRouter>
        );

        // Add your assertions here
        expect(screen.getByPlaceholderText('Enter Category Name')).toBeInTheDocument();
    });

    it('handles input change', () => {
        render(
            <BrowserRouter>
                <MockUserProvider value={{ user: userDetails }}>
                    <EditCategory />
                </MockUserProvider>
            </BrowserRouter>
        );

        const input = screen.getByPlaceholderText('Enter Category Name');
        fireEvent.change(input, { target: { value: 'NewCategory' } });

        expect(input.value).toBe('NewCategory');
    });

    it('submits the form and updates category', async () => {
        render(
            <BrowserRouter>
                <MockUserProvider value={{ user: userDetails }}>
                    <EditCategory />
                </MockUserProvider>
            </BrowserRouter>
        );

        const input = screen.getByPlaceholderText('Enter Category Name');
        fireEvent.change(input, { target: { value: 'NewCategory' } });

        const submitButton = screen.getByText('Update');
        fireEvent.click(submitButton);

        // Add assertions related to the expected API calls or UI changes
        await waitFor(() => {
            expect(updateCategoryIntoProductCategoryService).toHaveBeenCalled();
            expect(toast.success).toHaveBeenCalledWith('Category updated in admin list', { autoClose: 1000 })
        });
    });

    it('displays warning when category already exists', async () => {
        render(
            <BrowserRouter>
                <MockUserProvider value={{ user: userDetails }}>
                    <EditCategory />
                </MockUserProvider>
            </BrowserRouter>
        );

        const input = screen.getByPlaceholderText('Enter Category Name');
        fireEvent.change(input, { target: { value: 'MockCategory' } });

        const submitButton = screen.getByText('Update');
        fireEvent.click(submitButton);

        // Add assertions related to the expected warning message
        await waitFor(() => {
            expect(updateCategoryIntoProductCategoryService).toHaveBeenCalled();
            expect(toast.warning).toHaveBeenCalledWith('Category already added in admin list ', { autoClose: 3000 })
        });
    });
});

