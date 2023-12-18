import React from 'react';
import { render } from '@testing-library/react';
import Default from '../../src/components/Default';

describe('Default Page 404', () => {
    test('Renders error message and 404', async () => {

        await reporter.startStep('Step 1: Render component with /not-found route.');
        const { getByText } = render(<Default location={{ pathname: '/not-found' }} />);
        await reporter.endStep();

        await reporter.startStep('Step 2: Check error and 404 messages.');
        expect(getByText('error')).toBeInTheDocument();
        expect(getByText('404')).toBeInTheDocument();
        expect(getByText('page not found')).toBeInTheDocument();
        await reporter.endStep();

    });

    test('Renders the correct path in the error message', async () => {
        await reporter.startStep('Step 1: Render component with /some-path route.');
        const { getByText } = render(<Default location={{ pathname: '/some-path' }} />);
        await reporter.endStep();

        await reporter.startStep('Step 2: Check correct path in the error message.');
        expect(getByText(/the requested URL/)).toBeInTheDocument();
        expect(getByText(/\/some-path/)).toBeInTheDocument();
        await reporter.endStep();

    });
});
