import React from 'react';
import { render } from '@testing-library/react';
import AdminColumns from '../../src/components/Admin/AdminColumns';

test('renders all column headers', () => {
    const { getByText } = render(<AdminColumns />);
    expect(getByText('CATEGORY')).toBeInTheDocument();
    expect(getByText('PRODUCTS')).toBeInTheDocument();
    expect(getByText('NAME OF PRODUCT')).toBeInTheDocument();
    expect(getByText('PRICE')).toBeInTheDocument();
    expect(getByText('QUANTITY')).toBeInTheDocument();
    expect(getByText('DESCRIPTION')).toBeInTheDocument();
    expect(getByText('Actions')).toBeInTheDocument();
});

test('renders only the specified column headers', () => {
    const { queryByText } = render(<AdminColumns />);
    // Check for specific headers
    expect(queryByText('OTHER HEADER')).toBeNull();
});

test('renders the correct number of columns', () => {
    const { container } = render(<AdminColumns />);
    const columns = container.querySelectorAll('th');
    expect(columns.length).toBe(7);
});
