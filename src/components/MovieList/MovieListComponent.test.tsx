import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import MovieListComponent from './MovieListComponent';
import { mockMovieDetailData, mockGenreData, mockDataMovieList } from '../../assets/common/mockData';
const mockedUsedNavigate = jest.fn();
const mockedUsedLocation = jest.fn();

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mockedUsedNavigate,
    useLocation: () => mockedUsedLocation,
}));

const mockCallback = jest.fn();
describe("MovieList Component", () => {

    test('Renders  movieList page with mock data', () => {
        render(<MovieListComponent movieList={[mockMovieDetailData]}
            loadDataHandler={() => { }}
            loading={false}
            tabIndex={0}
            setPageIndex={mockCallback}
            pageIndex={1}
            searchFlag={false} />);
        const linkElement = screen.getByText('The Super Mario', { exact: false });
        expect(linkElement).toBeInTheDocument();
    });

    test('Triggering movieDetails page from Card view', () => {
        render(<MovieListComponent movieList={[mockMovieDetailData]}
            loadDataHandler={mockCallback}
            loading={false}
            tabIndex={0}
            setPageIndex={mockCallback}
            pageIndex={1}
            searchFlag={false} />);
        let element: HTMLElement = document.getElementsByClassName("card-hover")[0] as HTMLElement;
        element.click();
        setTimeout(() => {
            const favourite = screen.getByText('Add To Favourites');
            expect(favourite).toBeInTheDocument();
        });
    });

    test('Renders movieDetails page from MovieListComponent  view', () => {
        render(<MovieListComponent movieList={[mockMovieDetailData]}
            loadDataHandler={mockCallback}
            loading={false}
            tabIndex={0}
            setPageIndex={mockCallback}
            pageIndex={1}
            searchFlag={false} />);
        let element: HTMLElement = document.getElementsByClassName("card-hover")[0] as HTMLElement;
        element.click();
        setTimeout(() => {
            const linkElement = screen.getByText('The Super Mario', { exact: false });
            expect(linkElement).toBeInTheDocument();
            const genreElement = screen.getByText('Genre', { exact: false });
            expect(genreElement).toBeInTheDocument();
        });
    });

    test('Renders  multiple movie list with mock data', () => {
        render(<MovieListComponent movieList={mockDataMovieList}
            loadDataHandler={() => { }}
            loading={false}
            tabIndex={0}
            setPageIndex={mockCallback}
            pageIndex={1}
            searchFlag={false} />);
        const linkElement = screen.getByText('Spider-Man', { exact: false });
        expect(linkElement).toBeInTheDocument();
        const linkEle = screen.getByText('Transformers', { exact: false });
        expect(linkEle).toBeInTheDocument();
        let ListCount: number = document.getElementsByClassName("card-hover").length;
        expect(ListCount).toBe(4);
    });
});

