
import React from 'react';
import { render } from '@testing-library/react';
import EmptyWishlist from '../../src/components/Wishlist/EmptyWishlist';

describe('EmptyWishlist Component', () => {

    it('should render without crashing', () => {
        render(<EmptyWishlist />);
    });


    it('should render the correct message', () => {
        const { getByText } = render(<EmptyWishlist />);
        const messageElement = getByText('Your wishlist is currently empty');
        expect(messageElement).toBeInTheDocument();
    });


    it('should be inside a container with specific class', () => {
        const { container } = render(<EmptyWishlist />);
        const containerElement = container.querySelector('.container');
        expect(containerElement).toBeInTheDocument();
    });

    it('should be inside a row with specific class', () => {
        const { container } = render(<EmptyWishlist />);
        const rowElement = container.querySelector('.row');
        expect(rowElement).toBeInTheDocument();
    });


    it('should be inside a column with specific class', () => {
        const { container } = render(<EmptyWishlist />);
        const colElement = container.querySelector('.col-10');
        expect(colElement).toBeInTheDocument();
    });

    it('should have the correct text title class', () => {
        const { container } = render(<EmptyWishlist />);
        const textTitleElement = container.querySelector('.text-title');
        expect(textTitleElement).toBeInTheDocument();
    });

});
