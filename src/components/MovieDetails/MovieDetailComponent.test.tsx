import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import MovieDetailComponent from './MovieDetailComponent';
import { mockMovieDetailData, mockGenreData } from '../../assets/common/mockData';
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mockedUsedNavigate
}));

const mockCallback = jest.fn();
describe("MovieDetail Component", () => {

    test('Renders  movieDetails page with mock data', () => {
        render(<MovieDetailComponent movieDetail={mockMovieDetailData}
            genreData={mockGenreData} languageData={"English"}
            favouriteHandler={mockCallback} buttonFlag={false} />);
        const linkElement = screen.getByText('The Super Mario', { exact: false });
        expect(linkElement).toBeInTheDocument();
        const genreElement = screen.getByText('Genre', { exact: false });
        expect(genreElement).toBeInTheDocument();
        const languageElement = screen.getByText('Language', { exact: false });
        expect(languageElement).toBeInTheDocument();
        const count = screen.getByText('5507');
        expect(count).toBeInTheDocument();
        const favourite = screen.getByText('Add To Favourites');
        expect(favourite).toBeInTheDocument();
    });

    test('Renders changing button text', () => {
        render(<MovieDetailComponent movieDetail={mockMovieDetailData}
            genreData={mockGenreData} languageData={"English"}
            favouriteHandler={mockCallback} buttonFlag={true} />);
        const favourite = screen.getByText('Remove From Favourites');
        expect(favourite).toBeInTheDocument();
    });
    test('Button should be clicked once', () => {
        render(<MovieDetailComponent movieDetail={mockMovieDetailData}
            genreData={mockGenreData} languageData={"English"}
            favouriteHandler={mockCallback} buttonFlag={false} />);
        fireEvent.click(screen.getByText('Add To Favourites'));
        expect(mockCallback).toHaveBeenCalledTimes(1);
    });
    test('Triggering add to favoutites button', () => {
        render(<MovieDetailComponent movieDetail={mockMovieDetailData}
            genreData={mockGenreData} languageData={"English"}
            favouriteHandler={mockCallback} buttonFlag={false} />);
        fireEvent.click(screen.getByText('Add To Favourites'));
        setTimeout(() => {
            const favourite = screen.getByText('Remove From Favourites');
            expect(favourite).toBeInTheDocument();
        });
    });
    test('Triggering Remove from favoutites button', () => {
        render(<MovieDetailComponent movieDetail={mockMovieDetailData}
            genreData={mockGenreData} languageData={"English"}
            favouriteHandler={mockCallback} buttonFlag={true} />);
        fireEvent.click(screen.getByText('Remove From Favourites'));
        setTimeout(() => {
            const favourite = screen.getByText('Add To Favourites');
            expect(favourite).toBeInTheDocument();
        });
    });

});
