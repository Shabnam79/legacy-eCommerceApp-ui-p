import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from '../Navbar';
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import { MemoryRouter } from 'react-router-dom';

describe('Navbar Component', () => {

    it('renders the Navbar component without crashing', () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        const productsLink = screen.getByText(/Products/i);
        expect(productsLink).toBeInTheDocument();
    });

    it('displays the "Login" modal when not logged in', () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        // Find the dropdown button
        const dropdownButton = screen.getByText(/Hello Sign in/i);
        expect(dropdownButton).toBeInTheDocument();

        // Open the dropdown
        userEvent.click(dropdownButton);

        // Find the "Login" item within the dropdown menu
        const loginItem = screen.getByText('Login');
        expect(loginItem).toBeInTheDocument();

        // Now, you can click the "Login" item to trigger the login modal
        userEvent.click(loginItem);
    });

});
