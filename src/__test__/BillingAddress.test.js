import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import BillingAddressForm from '../../src/components/Cart/BillingAddress';

describe('Cart.BillingAddressForm', () => {
    it('Renders the BillingAddressForm component with default values', async () => {

        await reporter.startStep('Step 1: Rendering the BillingAddressForm component');
        const { getByLabelText, getByDisplayValue } = render(<BillingAddressForm />);
        await reporter.endStep();

        await reporter.startStep('Step 2: Rendering Forms elements with default values');
        expect(getByLabelText('First Name')).toBeInTheDocument();
        expect(getByDisplayValue('John')).toBeInTheDocument();
        expect(getByLabelText('Last Name')).toBeInTheDocument();
        expect(getByDisplayValue('Doe')).toBeInTheDocument();
        expect(getByLabelText('Address 1')).toBeInTheDocument();
        expect(getByDisplayValue('11th Street , Palm Olympia')).toBeInTheDocument();
        expect(getByLabelText('Address 2')).toBeInTheDocument();
        expect(getByDisplayValue('Boston Road')).toBeInTheDocument();
        expect(getByLabelText('City')).toBeInTheDocument();
        expect(getByDisplayValue('New Jersey City')).toBeInTheDocument();
        expect(getByLabelText('State')).toBeInTheDocument();
        expect(getByDisplayValue('Newyork')).toBeInTheDocument();
        expect(getByLabelText('Country')).toBeInTheDocument();
        expect(getByDisplayValue('USA')).toBeInTheDocument();
        expect(getByLabelText('ZIP Code')).toBeInTheDocument();
        expect(getByDisplayValue('123456')).toBeInTheDocument();
        await reporter.endStep();
    });

    it('Updates form data on input change', async () => {

        await reporter.startStep('Step 1: Able to render BillingAddress Form component');
        const { getByLabelText } = render(<BillingAddressForm />);
        await reporter.endStep();

        await reporter.startStep('Step 2: Able to view First name and last name input fields');
        const firstNameInput = getByLabelText('First Name');
        const lastNameInput = getByLabelText('Last Name');
        await reporter.endStep();

        await reporter.startStep('Step 3: Updates form elements of First and last name input fields');
        fireEvent.change(firstNameInput, { target: { value: 'John' } });
        fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
        await reporter.endStep();

        await reporter.startStep('Step 4: Verifying the result');
        expect(firstNameInput.value).toBe('John');
        expect(lastNameInput.value).toBe('Doe');
        await reporter.endStep();
    });

    it('Submits the form with valid data', async () => {

        await reporter.startStep('Step 1:Rendering the component of BillingAddressForm');
        const { getByText, getByLabelText } = render(<BillingAddressForm />);
        await reporter.endStep();

        await reporter.startStep('Step 2: Getting the elements from DOM');
        const submitButton = getByText('Submit');
        const firstNameInput = getByLabelText('First Name');
        const lastNameInput = getByLabelText('Last Name');
        await reporter.endStep();

        await reporter.startStep('Step 3: Update the input fields');
        fireEvent.change(firstNameInput, { target: { value: 'John' } });
        fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
        await reporter.endStep();

        await reporter.startStep('Step 4: Submitting the form with data');
        fireEvent.click(submitButton);
        await reporter.endStep();
    });

});