import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import MovieListComponent from './MovieListComponent';
import { mockMovieDetailData, mockGenreData } from '../../assets/common/mockData';
const mockedUsedNavigate = jest.fn();
const mockedUsedLocation = jest.fn();

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mockedUsedNavigate,
    useLocation: () => mockedUsedLocation,
}));

const mockCallback = jest.fn();
describe("MovieList Component", () => {

    test('renders  movieList page with mock data', () => {
        render(<MovieListComponent movieList={[mockMovieDetailData]}
            loadDataHandler={() => { }}
            loading={false}
            tabIndex={0}
            setPageIndex={mockCallback}
            pageIndex={1}
            searchFlag={false} />);
        const linkElement = screen.getByText('The Super Mario', { exact: false });
        expect(linkElement).toBeInTheDocument();
        const genreElement = screen.getByText('Genre', { exact: false });
        expect(genreElement).toBeInTheDocument();
        const count = screen.getByText('5507');
        expect(count).toBeInTheDocument();
    });

    test('Triggering movieDetails page from Card view', () => {
        render(<MovieListComponent movieList={[mockMovieDetailData]}
            loadDataHandler={mockCallback}
            loading={false}
            tabIndex={0}
            setPageIndex={mockCallback}
            pageIndex={1}
            searchFlag={false} />);
        let element: HTMLElement = document.getElementsByClassName("card")[0] as HTMLElement;
        element.click();
        setTimeout(() => {
            const favourite = screen.getByText('Add To Favourites');
            expect(favourite).toBeInTheDocument();

        }, 300);
    });


});

