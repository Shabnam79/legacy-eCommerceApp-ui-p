import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userContext from "../../src/utils/userContext";
import CategoryList from '../../src/components/Admin/CategoryList';
import {
    deleteRecordFromFirebaseService,
    getCategoryServiceByUserId
} from '../../src/firebase/services/category.service';
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
    deleteRecordFromFirebaseService: jest.fn(),
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
        // Mock category data
        const mockCategoryData = [
            { userId: '1', Category: 'Category 1', id: '1' },
            { userId: '1', Category: 'Category 2', id: '2' },
        ];

        // Mock getCategoryServiceByUserId
        getCategoryServiceByUserId.mockResolvedValue(mockCategoryData);

        // Render the component
        render(
            <MockUserProvider value={{ user: userDetails }}>
                <CategoryList />
            </MockUserProvider>
        );

        // Wait for the data to be loaded
        await waitFor(() => {
            expect(getCategoryServiceByUserId).toHaveBeenCalledTimes(1);
        });

        // Check if the data is displayed
        expect(screen.getByText('Category 1')).toBeInTheDocument();
        expect(screen.getByText('Category 2')).toBeInTheDocument();
    });

    it('Renders category list with data and performs delete action', async () => {
        // Mock category data
        const mockCategoryData = [
            { userId: '1', Category: 'Category 1', id: '1' },
            { userId: '1', Category: 'Category 2', id: '2' },
        ];

        // Mock getCategoryServiceByUserId
        getCategoryServiceByUserId.mockResolvedValue(mockCategoryData);

        // Render the component
        render(
            <MockUserProvider value={{ user: userDetails }}>
                <CategoryList />
            </MockUserProvider>
        );

        // Wait for the data to be loaded
        await waitFor(() => {
            expect(getCategoryServiceByUserId).toHaveBeenCalledTimes(2);
        });

        // Check if the data is displayed
        expect(screen.getByText('Category 1')).toBeInTheDocument();
        expect(screen.getByText('Category 2')).toBeInTheDocument();

        // Mock getCategoryByIdService
        const getCategoryByIdServiceMock = jest.spyOn(categoryService, 'getCategoryByIdService');
        const mockDeletedCategoryData = { userId: '1', Category: 'Category 1', id: '1' };
        getCategoryByIdServiceMock.mockResolvedValue(mockDeletedCategoryData);


        // Mock deleteRecordFromFirebaseService
        deleteRecordFromFirebaseService.mockResolvedValue([]);


        // Perform delete action
        fireEvent.click(screen.getByTestId('delete-button-1'));

        // Wait for the delete action to complete
        await waitFor(() => {
            expect(getCategoryServiceByUserId).toHaveBeenCalledTimes(3);
            expect(deleteRecordFromFirebaseService).toHaveBeenCalledTimes(1);
            expect(toast.warning).toHaveBeenCalledWith('Ctaegory removed from the List', {
                autoClose: 1000,
            });
            expect(getCategoryByIdServiceMock).toHaveBeenCalledTimes(1);
            expect(getCategoryByIdServiceMock).toHaveBeenCalledWith('1');
        });
    });

});
