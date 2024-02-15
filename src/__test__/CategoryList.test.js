import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userContext from "../../src/utils/userContext";
import CategoryList from '../../src/components/Admin/CategoryList';
import { getCategoryServiceByUserId, getCategoryByCategoryIdService } from '../../src/firebase/services/category.service';
import { getAllCategoryService, DeleteCategoryByIdService } from '../../src/firebase/services/category.service';
import * as categoryService from '../../src/firebase/services/category.service';
import { toast } from 'react-toastify';

// Mocking the react-router-dom module
jest.mock('react-router-dom', () => ({
    Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

// Mocking the firebase/services/category.service module
jest.mock('../../src/firebase/services/category.service', () => ({
    getCategoryServiceByUserId: jest.fn(),
    getCategoryByIdService: jest.fn(() => Promise.resolve()),
    getCategoryByCategoryIdService: jest.fn(),
    deleteRecordFromFirebaseService: jest.fn(),
    getAllCategoryService: jest.fn(),
}));

// Mocking react-toastify
jest.mock('react-toastify', () => ({
    toast: {
        warning: jest.fn(),
    },
}));

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

describe('Admin.CategoryList', () => {
    it('Renders category list with data', async () => {

        await reporter.startStep('Step 1: Mocking category data for testing purposes.');
        // Mock category data
        const mockCategoryData = [
            { userId: '1', Category: 'Category 1', id: '1' },
            { userId: '1', Category: 'Category 2', id: '2' },
        ];
        await reporter.endStep();

        // Mock getCategoryServiceByUserId
        await reporter.startStep('Step 2: Stubbing getCategoryServiceByUserId to return mock data.');
        getAllCategoryService.mockResolvedValue(mockCategoryData);
        await reporter.endStep();

        // Render the component
        await reporter.startStep('Step 3: Rendering CategoryList component with user context.');
        render(
            <MockUserProvider value={{ user: userDetails }}>
                <CategoryList />
            </MockUserProvider>
        );
        await reporter.endStep();

        // Check if the data is displayed
        await reporter.startStep('Step 4: Verifying the display of category data on the component.');
        expect(screen.getByText('Category 1')).toBeInTheDocument();
        expect(screen.getByText('Category 2')).toBeInTheDocument();
        await reporter.endStep();

    });

    it('Renders category list with data and performs delete action', async () => {

        await reporter.startStep('Step 1: Mock initial category data for testing.');
        // Mock category data
        const mockCategoryData = [
            { userId: '1', Category: 'Category 1', id: '1' },
            { userId: '1', Category: 'Category 2', id: '2' },
        ];
        await reporter.endStep();

        // Mock getCategoryServiceByUserId
        await reporter.startStep('Step 2: Mock service to retrieve categories by user ID.');
        getAllCategoryService.mockResolvedValue(mockCategoryData);
        await reporter.endStep();

        // Render the component
        await reporter.startStep('Step 3: Render CategoryList component within user context.');
        render(
            <MockUserProvider value={{ user: userDetails }}>
                <CategoryList />
            </MockUserProvider>
        );
        await reporter.endStep();

        // Check if the data is displayed
        await reporter.startStep('Step 4: Verify rendering of Category 1 and Category 2.');
        expect(screen.getByText('Category 1')).toBeInTheDocument();
        expect(screen.getByText('Category 2')).toBeInTheDocument();
        await reporter.endStep();

        // Mock getCategoryByIdService
        await reporter.startStep('Step 5: Spy on getCategoryByIdService for delete operation.');
        const getCategoryServiceByUserIdMock = jest.spyOn(categoryService, 'getCategoryByCategoryIdService');
        const mockDeletedCategoryData = { userId: '1', Category: 'Category 1', id: '1' };
        getCategoryServiceByUserIdMock.mockResolvedValue(mockDeletedCategoryData);
        await reporter.endStep();

        // Perform delete action
        await reporter.startStep('Step 6: Simulate user click on delete button for 1st Category.');
        fireEvent.click(screen.getByTestId('delete-button-1'));
        await reporter.endStep();
    });
});
