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
    it('Renders without crashing', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </Provider>
        );
        expect(screen.getByAltText('store')).toBeInTheDocument();
    });

    it('Displays the login modal when "Login" is clicked', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </Provider>
        );
        userEvent.click(screen.getByText('Hello, Sign In'));

        await waitFor(() => {
            expect(screen.getByText('Login')).toBeInTheDocument();
        });

        const loginButton = screen.getByText('Login');
        userEvent.click(loginButton);

        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    it('Logs out when "Logout" is clicked', async () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <MockUserProvider value={{ user: mockUser }}>
                        <Navbar />
                    </MockUserProvider>
                </Provider>
            </BrowserRouter>
        );
        userEvent.click(screen.getByText('Hello Test1234@gmail.com'));
        const logoutButton = await screen.findByText('Logout');
        userEvent.click(logoutButton);

        await waitFor(() => {
            userEvent.click(logoutButton);
            waitFor(() => expect(screen.getByText('Hello, Sign In')).toBeInTheDocument());
        });
    });

    it('Able to select the category from the dropdown', async () => {
        const { container } = render(
            <BrowserRouter>
                <Provider store={store}>
                    <Navbar />
                </Provider>
            </BrowserRouter>
        );

        const mockCategoryList = [
            { id: 'bzolv9xdDoqZwEIjl78z', Category: "Testing" },
            { id: 'swoxKYVH3rbzPfeC1lhq', Category: 'Sports' },
        ];
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockCategoryList),
        });

        const dropdownButton = await waitFor(() => {
            expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
            return screen.getByRole('button', { name: 'All' });
        });
        fireEvent.click(dropdownButton);

        await waitFor(() => {
            const dropdownMenu = container.querySelector('.dropdown-menu.show');
            expect(dropdownMenu).toBeInTheDocument();

            const allcategoryItem = within(dropdownMenu).getByText('Testing');
            expect(allcategoryItem.textContent).toEqual('Testing');
        });
    });
});
