import { useState, useEffect } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import WatchlistFilm from './WatchlistFilm';
import Spinner from './Spinner';
import classNames from 'classnames';
import { useActions } from '../hooks/useActions';

const Watchlist = () => {
  const [sortedByTitle, setSortedByTitle] = useState(false);
  const [sortedByYear, setSortedByYear] = useState(false);

  const watchlist = useTypedSelector(state => state.watchlist);
  const user = useTypedSelector(state => state.auth.user);

  const { getWatchlistFilms, sortWatchlistFilms } = useActions();

  useEffect(() => {
    getWatchlistFilms(user && user._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortWatchlistFilmsComponent = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (event.currentTarget.name === 'title') {
      setSortedByTitle(true);
      setSortedByYear(false);
    } else {
      setSortedByTitle(false);
      setSortedByYear(true);
    }

    sortWatchlistFilms(event.currentTarget.name);
  };

  const films = watchlist.films;

  return (
    <main id="watchlist-page" className="narrow-container">
      <h1 className="watchlist-heading">Watchlist</h1>
      <div className="watchlist-button-container">
        <div className="watchlist-number-of-films-container">
          {films.length} films
        </div>
        <div>
          <button
            className={classNames(
              { 'watchlist-button-pressed': sortedByYear },
              'watchlist-button'
            )}
            name="year"
            onClick={sortWatchlistFilmsComponent}
          >
            Sort by year
          </button>
          <button
            className={classNames(
              { 'watchlist-button-pressed': sortedByTitle },
              'watchlist-button'
            )}
            name="title"
            onClick={sortWatchlistFilmsComponent}
          >
            Sort by title
          </button>
        </div>
      </div>
      {watchlist.loading ? (
        <Spinner />
      ) : films.length > 0 ? (
        <ul className="watchlist">
          {films.map((film: any, i: number) => (
            <WatchlistFilm
              _id={film._id}
              overview={film.overview}
              title={film.title}
              year={film.year}
              poster_path={film.poster_path}
              key={i}
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
