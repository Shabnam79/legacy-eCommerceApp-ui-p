import React from 'react';
import { render } from '@testing-library/react';
import Title from '../../src/components/Title';

describe('Title', () => {
    test('renders Title component with name and title', async () => {
        const testName = 'our';
        const testTitle = 'products';

        await reporter.startStep('Step 1: Rendering the Title component passing name and title as a props')
        const { container } = render(<Title name={testName} title={testTitle} />);
        await reporter.endStep()

        // Custom function to match the text using a regular expression with flexibility for whitespace
        const isTextInElement = (element) => {
            const textContent = element.textContent || element.innerText;
            const formattedText = textContent.replace(/\s+/g, ' ').trim(); // Replace multiple whitespaces with a single space
            const regex = new RegExp(`${testName}\\s*${testTitle}`, 'i'); // Allow for optional whitespace between words
            return regex.test(formattedText);
        };

        await reporter.startStep('Step 2: Use querySelectorAll with the custom matching function')
        // Use querySelectorAll with the custom matching function
        const matchingElements = container.querySelectorAll('*'); // Select all elements
        const foundElement = Array.from(matchingElements).find((element) => isTextInElement(element));
        await reporter.endStep()

        await reporter.startStep('Step 3: Checking at least one matching element is found ')
        // Assert that at least one matching element is found
        expect(foundElement).toBeInTheDocument();
        await reporter.endStep()
    });
});
