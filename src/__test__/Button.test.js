import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ButtonContainer } from '../../src/components/Button';

describe('Button', () => {
  test('Renders button with default styles', async () => {

    await reporter.startStep('Step 1:Rendering the component Button Container');
    render(<ButtonContainer />);
    await reporter.endStep();

    await reporter.startStep('Step 2:Getting the button from the DOM');
    const button = screen.getByRole('button');
    await reporter.endStep();

    // Add your assertions for default styles here
    await reporter.startStep('Step 3: Expecting the default styling on the button');
    expect(button).toHaveStyle(`
      text-transform: capitalize;
      font-size: 1rem;
      background: rgb(5, 54, 69);
      border: 2px outset buttonface;
      border-radius: 0.25rem;
      color: rgb(243, 240, 235);
      padding: 5px 10px;
      cursor: pointer;
      margin: 0.2rem 0.5rem 0.2rem 0;
    `);
    await reporter.endStep();
  });

  test('Renders button with cart styles', async () => {

    await reporter.startStep('Step 1: Button Container component renders');
    render(<ButtonContainer cart />);
    await reporter.endStep();

    await reporter.startStep('Step 2: Getting the button element from DOM');
    const button = screen.getByRole('button');
    await reporter.endStep();

    // Add your assertions for cart styles here
    await reporter.startStep('Step 3: Rendering the button with cart styles');
    expect(button).toHaveStyle(`
      text-transform: capitalize;
      font-size: 1rem;
      background: transparent;
      border: 2px outset buttonface;
      border-radius: 0.25rem;
      color: rgb(243, 240, 235);
      padding: 5px 10px;
      cursor: pointer;
      margin: 0.2rem 0.5rem 0.2rem 0;
    `);
    await reporter.endStep();
  });

  test('Handles click event', async () => {
    const handleClick = jest.fn();

    await reporter.startStep('Step 1: Rendering the component and passing handleclick function on click after mocking it');
    render(<ButtonContainer onClick={handleClick} />);
    await reporter.endStep();

    await reporter.startStep('Step 2: Getting the button element from DOM');
    const button = screen.getByRole('button');
    await reporter.endStep();

    await reporter.startStep('Step 3: Clicking the button');
    fireEvent.click(button);
    await reporter.endStep();

    await reporter.startStep('Step 4: Calls handleClick functions to verify handle click event');
    expect(handleClick).toHaveBeenCalled();
    await reporter.endStep();
  });
});
