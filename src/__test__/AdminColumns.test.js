import React from 'react';
import { render } from '@testing-library/react';
import AdminColumns from '../../src/components/Admin/AdminColumns';

describe('Admin.AdminColumns', () => {
    test('Renders all column headers', async () => {

        await reporter.startStep('Step 1: Rendering the Admin Columns component');
        const { getByText } = render(<AdminColumns />);
        await reporter.endStep();

        await reporter.startStep('Step 2: Rendering all columns headers');
        expect(getByText('Category')).toBeInTheDocument();
        expect(getByText('Products')).toBeInTheDocument();
        expect(getByText('Name of Product')).toBeInTheDocument();
        expect(getByText('Price')).toBeInTheDocument();
        expect(getByText('Quantity')).toBeInTheDocument();
        expect(getByText('Description')).toBeInTheDocument();
        expect(getByText('Actions')).toBeInTheDocument();
        await reporter.endStep();
    });

    test('Renders only the specified column headers', async () => {

        await reporter.startStep('Step 1: Rendering the Admin columns component');
        const { queryByText } = render(<AdminColumns />);
        await reporter.endStep();

        await reporter.startStep('Step 2: Checking for specific headers which is not present');
        // Check for specific headers
        expect(queryByText('OTHER HEADER')).toBeNull();
        await reporter.endStep();
    });

    test('Renders the correct number of columns', async () => {
        await reporter.startStep('Step 1: Rendering the component of Admin columns');
        const { container } = render(<AdminColumns />);
        await reporter.endStep();

        await reporter.startStep('Step 2: Rendering the correct numbers of columns');
        const columns = container.querySelectorAll('th');
        expect(columns.length).toBe(7);
        await reporter.endStep();
    });
});
