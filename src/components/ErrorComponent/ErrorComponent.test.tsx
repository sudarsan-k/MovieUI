import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import ErrorComponent from './ErrorComponent';

describe("Error Component", () => {
    test('Renders  ErrorComponent with error message', () => {
        render(<ErrorComponent errorMessage='No Record Found!!' />);
        const linkElement = screen.getByText('No Record Found!!');
        expect(linkElement).toBeInTheDocument();
    });
});
