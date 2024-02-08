// Import necessary libraries and functions
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userContext from "../../src/utils/userContext";
import { getProductReviewByOrderIdService, saveProductReview } from '../../src/firebase/services/review.service';
import { toast } from 'react-toastify';
import { MemoryRouter } from 'react-router-dom';
import Review from '../../src/components/Review/Review'

// Mocking the react-router-dom useParams
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        productId: 'mockProductId',
        orderId: 'mockOrderId',
    }),
}));

// Mocking the userContext
const mockUser = {
    userId: "DYLnWFX3d2MU6pdnu059AHN2KFm2",
    email: "Test1234@gmail.com",
};


const MockUserProvider = ({ children, value }) => {
    return (
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    );
};

// Mocking the saveProductReview function
jest.mock('../../src/firebase/services/review.service', () => ({
    saveProductReview: jest.fn(() => Promise.resolve()),
    getProductReviewByOrderIdService: jest.fn(() => Promise.resolve([])),
}));

// Mocking the storage functions
jest.mock('firebase/storage', () => ({
    ...jest.requireActual('firebase/storage'),
    ref: jest.fn(),
    uploadBytes: jest.fn(() => Promise.resolve({ ref: { getDownloadURL: jest.fn() } })),
    getDownloadURL: jest.fn(),
    listAll: jest.fn(() => Promise.resolve({ items: [] })),
}));

// Mocking the react-toastify
jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
    },
}));

// Mocking URL.createObjectURL
global.URL.createObjectURL = jest.fn();

// Mocking FileReader
global.FileReader = jest.fn(() => ({
    readAsDataURL: jest.fn(),
    result: 'mockedDataURL',
}));

// Mocking createObjectURL method for Blob
window.URL.createObjectURL = jest.fn();

// Mocking FileList
class FileListMock extends Array {
    item() { }
}
Object.defineProperty(global, 'FileList', {
    value: FileListMock,
    writable: true,
});

// Mocking DataTransfer
class DataTransfer {
    constructor() {
        this.items = [];
    }
    setData() { }
    getData() { }
    clearData() { }
    setDragImage() { }
    addElement() { }
    setDropEffect() { }
    getFiles() {
        return this.items;
    }
}
Object.defineProperty(global, 'DataTransfer', {
    value: DataTransfer,
    writable: true,
});

// Test Suite for Review component
describe('Review.Review', () => {

    it('Renders Review component', async () => {
        await reporter.startStep('Step 1: Checking if Review Component rendering without crashing')
        render(
            <MemoryRouter>  {/* Wrap your component with MemoryRouter */}
                <MockUserProvider value={{ user: mockUser }}>
                    <Review />
                </MockUserProvider>
            </MemoryRouter>
        );
        await reporter.endStep()

        // Check if the component renders without crashing
        await reporter.startStep('Step 2: Verifying the result for getting text Rating & Reviews from DOM')
        expect(screen.getByText('Ratings & Reviews')).toBeInTheDocument();
        await reporter.endStep()
    });


    it('Submits a review', async () => {
        // Mocking getProductReviewByOrderIdService to return a data array with length > 0
        await reporter.startStep('Step 1: Mocking getProductReviewByOrderIdService to return a data array with length > 0')
        getProductReviewByOrderIdService.mockResolvedValue([{ rating: 1 }]);
        await reporter.endStep()

        await reporter.startStep('Step 2: Rendering the Review component by providing user details as a prop')
        render(
            <MemoryRouter>  {/* Wrap your component with MemoryRouter */}
                <MockUserProvider value={{ user: mockUser }}>
                    <Review />
                </MockUserProvider>
            </MemoryRouter>
        );
        await reporter.endStep()

        // Fill out the form only if the condition is met
        await reporter.startStep('Step 3: Fill out the form only if the condition is met');
        const submitButton = screen.queryByText('Submit');
        if (submitButton) {
            await waitFor(() => {
                userEvent.click(submitButton);
            });
            await reporter.startStep('Step 4.1: Getting the form elements from DOM and updating the input fields')
            fireEvent.change(screen.getByPlaceholderText('Review title...'), { target: { value: 'Test Title' } });
            fireEvent.change(screen.getByPlaceholderText('Description...'), { target: { value: 'Test Description' } });
            fireEvent.change(screen.getByLabelText('Photos'), { target: { files: [new File(['test'], 'test.jpg', { type: 'image/jpeg' })] } });
            await reporter.endStep()

            //Submit the form
            await reporter.startStep('Step 4.2: Clicking Submit button')
            fireEvent.click(screen.getByText('Submit'));
            await reporter.endStep()

            // Wait for the review to be submitted
            await reporter.startStep('Step 4.3: Check if the saveProductReview function was called and success toast was displayed')
            await waitFor(() => {
                // Check if the saveProductReview function was called
                expect(saveProductReview).toHaveBeenCalled();
                // Check if the success toast was displayed
                expect(toast.success).toHaveBeenCalledWith('review submitted successfully', { autoClose: 1000 });
            });
            await reporter.endStep()
        }
        await reporter.endStep()
    });
});
