import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Header from './Header';
const mockedUsedNavigate = jest.fn();
const mockedUsedLocation = jest.fn();

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mockedUsedNavigate,
    useLocation: () => mockedUsedLocation,
}));

describe("Header Component", () => {

    test('Renders  Header component ', () => {
        render(<Header />);
        const linkElement = screen.getByText('Go To Favourites', { exact: false });
        expect(linkElement).toBeInTheDocument();
    });

    test('Triggers Favourite page from header', () => {
        render(<Header />);
        let element: HTMLElement = document.getElementsByClassName("buttonFav")[0] as HTMLElement;
        element.click();
        setTimeout(() => {
            const favour = screen.getByText('Favourite Movies', { exact: false });
            expect(favour).toBeInTheDocument();
        });
    });
    test('Triggers Search page from header and searching', () => {
        render(<Header />);
        let element: HTMLElement = document.getElementsByClassName("inputText")[0] as HTMLElement;
        fireEvent.change(element, { target: { value: 'hello' } });
        setTimeout(() => {
            const search = screen.getByText('Search Results', { exact: false });
            expect(search).toBeInTheDocument();
            let ListCount: number = document.getElementsByClassName("card").length;
            expect(ListCount).not.toBe(0);
        });
    });
    test('Triggers Search page from header, searching and clearing it', () => {
        render(<Header />);
        let element: HTMLElement = document.getElementsByClassName("inputText")[0] as HTMLElement;
        fireEvent.change(element, { target: { value: 'hello' } });
        setTimeout(() => {
            fireEvent.change(element, { target: { value: 'spider' } });
            const search = screen.getByText('Search Results for spider', { exact: false });
            expect(search).toBeInTheDocument();
            let ListCount: number = document.getElementsByClassName("card").length;
            expect(ListCount).not.toBe(0);
            fireEvent.change(element, { target: { value: '' } });
            const notFound = screen.getByText("Please search Something!!");
            expect(notFound).toBeInTheDocument();
        });
    });

});
