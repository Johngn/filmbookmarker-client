import { useState, useEffect } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import WatchlistFilm from './WatchlistFilm';
import Spinner from './Spinner';
import classNames from 'classnames';
import { useActions } from '../hooks/useActions';
import { genresArray } from '../utils/constants';

const Watchlist = () => {
  interface Genres {
    id: number;
    name: string;
  }
  interface Films {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    genres: Genres[];
    runtime: number;
    year: any;
  }
  const [selectedGenre, setSelectedGenre] = useState('all');
  const watchlist = useTypedSelector(state => state.watchlist);
  const user = useTypedSelector(state => state.auth.user);
  const [filteredFilms, setFilteredFilms] = useState<Films[]>([]);
  const [ascending, setAscending] = useState(false);
  const [sortedByTitle, setSortedByTitle] = useState(false);
  const [sortedByYear, setSortedByYear] = useState(false);
  const [sortedByDuration, setSortedByDuration] = useState(false);

  const { getWatchlistFilms } = useActions();

  useEffect(() => {
    getWatchlistFilms(user && user._id);

    return setSelectedGenre('all');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortByTitle = () => {
    setFilteredFilms(
      filteredFilms.sort((a, b): number => {
        if (ascending && sortedByTitle) {
          return b['title'] < a['title'] ? -1 : 1;
        } else {
          return b['title'] > a['title'] ? -1 : 1;
        }
      })
    );
    setAscending(sortedByTitle ? !ascending : true);
    setSortedByYear(false);
    setSortedByTitle(true);
    setSortedByDuration(false);
  };

  const sortByYear = () => {
    setFilteredFilms(
      filteredFilms.sort((a, b): number => {
        if (ascending && sortedByYear) {
          return a['year'] - b['year'];
        } else {
          return b['year'] - a['year'];
        }
      })
    );
    setAscending(sortedByYear ? !ascending : true);
    setSortedByYear(true);
    setSortedByTitle(false);
    setSortedByDuration(false);
  };

  const sortByDuration = () => {
    setFilteredFilms(
      filteredFilms.sort((a, b): number => {
        if (ascending && sortedByDuration) {
          return b['runtime'] - a['runtime'];
        } else {
          return a['runtime'] - b['runtime'];
        }
      })
    );
    setAscending(sortedByDuration ? !ascending : true);
    setSortedByYear(false);
    setSortedByTitle(false);
    setSortedByDuration(true);
  };

  useEffect(() => {
    setFilteredFilms(
      watchlist.films?.filter((film: any) => {
        const genreNames = film.genres?.map((genre: any) => genre.name);
        if (genreNames && selectedGenre === 'all') {
          return film;
        } else if (genreNames) {
          return genreNames.includes(selectedGenre);
        }
        return film;
      })
    );
    setSortedByTitle(false);
    setSortedByYear(false);
    setSortedByDuration(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGenre]);

  return (
    <main id="watchlist-page" className="watchlist-page">
      <div className="watchlist-button-container">
        <div className="watchlist-number-of-films-container">
          {filteredFilms.length} films
        </div>
        <div className="watchlist-select-button-container">
          <select
            onChange={event => setSelectedGenre(event.currentTarget.value)}
            className="watchlist-genre-select"
          >
            <option value="all" className="watchlist-genre-option">
              All
            </option>
            {genresArray.map(genre => (
              <option
                key={genre}
                className="watchlist-genre-option"
                value={genre}
              >
                {genre}
              </option>
            ))}
          </select>
          <button
            className={classNames(
              { 'watchlist-button-pressed': sortedByTitle },
              'watchlist-button'
            )}
            name="title"
            onClick={sortByTitle}
          >
            Sort by title
          </button>
          <button
            className={classNames(
              { 'watchlist-button-pressed': sortedByYear },
              'watchlist-button'
            )}
            name="year"
            onClick={sortByYear}
          >
            Sort by year
          </button>
          <button
            className={classNames(
              { 'watchlist-button-pressed': sortedByDuration },
              'watchlist-button'
            )}
            name="runtime"
            onClick={sortByDuration}
          >
            Sort by duration
          </button>
        </div>
      </div>
      {watchlist.loading ? (
        <Spinner />
      ) : filteredFilms.length > 0 ? (
        <ul className="watchlist">
          {filteredFilms.map((film: any) => (
            <WatchlistFilm
              _id={film._id}
              overview={film.overview}
              title={film.title}
              year={film.year}
              poster_path={film.poster_path}
              runtime={film.runtime}
              key={film._id}
              genres={film.genres}
            />
          ))}
        </ul>
      ) : (
        <div className="watchlist-empty-container">
          <h3 className="watchlist-emtpy-text">
            No films on watchlist. Go to search page to find films to add.
          </h3>
        </div>
      )}
    </main>
  );
};

export default Watchlist;
