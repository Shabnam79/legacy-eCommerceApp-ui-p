import React from 'react';
import { render, screen, waitFor, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import userContext from "../../src/utils/userContext";
import Navbar from '../../src/components/Navbar';
import { Provider } from 'react-redux';
import store from '../../src/utils/store';

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

describe('Navbar', () => {
    it('Renders without crashing', async () => {
        await reporter.startStep('Step 1: Rendering the Navbar component.')
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </Provider>
        );
        await reporter.endStep()

        await reporter.startStep('Step 2: Getting an element from DOM and verifying Navbar renders without crashing.')
        expect(screen.getByAltText('store')).toBeInTheDocument();
        await reporter.endStep()
    });

    it('Displays the login modal when "Login" is clicked', async () => {
        await reporter.startStep('Step 1: Renders navbar component ')
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </Provider>
        );
        await reporter.endStep()

        await reporter.startStep('Step 2: Getting a text Hello,Sign In and fire click event')
        userEvent.click(screen.getByText('Hello, Sign In'));
        await reporter.endStep()

        await reporter.startStep('Step 3: Verify that login text is present in the dropdown')
        await waitFor(() => {
            expect(screen.getByText('Login')).toBeInTheDocument();
        });
        await reporter.endStep()

        await reporter.startStep('Step 4: Getting an element text Login from DOM and click on it.')
        const loginButton = screen.getByText('Login');
        userEvent.click(loginButton);
        await reporter.endStep()

        await reporter.startStep('Step 5: Verifying that login modal will displau when Login is clicked')
        expect(screen.getByText('Login')).toBeInTheDocument();
        await reporter.endStep()
    });

    it('Logs out when "Logout" is clicked', async () => {
        await reporter.startStep('Step 1: Renders the navbar component with mocked user data')
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <MockUserProvider value={{ user: mockUser }}>
                        <Navbar />
                    </MockUserProvider>
                </Provider>
            </BrowserRouter>
        );
        await reporter.endStep()

        await reporter.startStep('Step 2: Getting an element with text Hello Test1234@gmail.com and check for logout from dropdown and fire click event')
        userEvent.click(screen.getByText('Hello Test1234@gmail.com'));
        const logoutButton = await screen.findByText('Logout');
        userEvent.click(logoutButton);
        await reporter.endStep()

        await reporter.startStep('Step 3: Click on logout button and verifying Hello, Sign In text is visible on UI')
        await waitFor(() => {
            userEvent.click(logoutButton);
            waitFor(() => expect(screen.getByText('Hello, Sign In')).toBeInTheDocument());
        });
        await reporter.endStep()
    });

    it('Able to select the category from the dropdown', async () => {
        await reporter.startStep('Step 1: Render the Navbar component')
        const { container } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <Navbar />
                </Provider>
            </BrowserRouter>
        );
        await reporter.endStep()

        // Mock the response from the getCategoryService function
        await reporter.startStep('Step 2: Mock the response from the getCategoryService function')
        const mockCategoryList = [
            { id: 'bzolv9xdDoqZwEIjl78z', Category: "Testing" },
            { id: 'swoxKYVH3rbzPfeC1lhq', Category: 'Sports' },
            // Add more categories if needed
        ];
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockCategoryList),
        });
        await reporter.endStep()

        // Wait for the dropdown button to be present
        await reporter.startStep('Step 3: Wait for the dropdown button to be present')
        const dropdownButton = await waitFor(() => {
            expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
            return screen.getByRole('button', { name: 'All' });
        });
        await reporter.endStep()

        // Click on the dropdown button
        await reporter.startStep('Step 4: Click on the dropdown button')
        fireEvent.click(dropdownButton);
        await reporter.endStep()

        // Wait for the dropdown menu to be visible
        await reporter.startStep('Step 5: Wait for the dropdown menu to be visible')
        await waitFor(() => {
            const dropdownMenu = container.querySelector('.dropdown-menu.show');
            expect(dropdownMenu).toBeInTheDocument();
        });
        await reporter.endStep()
    });
});
