import { useEffect } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import WatchlistFilm from './WatchlistFilm';
import Spinner from './Spinner';
import classNames from 'classnames';
import { useActions } from '../hooks/useActions';

const Watchlist = () => {
  const watchlist = useTypedSelector(state => state.watchlist);
  const user = useTypedSelector(state => state.auth.user);

  const { getWatchlistFilms, sortByYear, sortByTitle, sortByDuration } =
    useActions();

  useEffect(() => {
    getWatchlistFilms(user && user._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              { 'watchlist-button-pressed': watchlist.sortedByTitle },
              'watchlist-button'
            )}
            name="title"
            onClick={sortByTitle}
          >
            Sort by title
          </button>
          <button
            className={classNames(
              { 'watchlist-button-pressed': watchlist.sortedByYear },
              'watchlist-button'
            )}
            name="year"
            onClick={sortByYear}
          >
            Sort by year
          </button>
          <button
            className={classNames(
              { 'watchlist-button-pressed': watchlist.sortedByDuration },
              'watchlist-button'
            )}
            name="year"
            onClick={sortByDuration}
          >
            Sort by duration
          </button>
        </div>
      </div>
      {watchlist.loading ? (
        <Spinner />
      ) : films.length > 0 ? (
        <ul className="watchlist">
          {films.map((film: any) => (
            <WatchlistFilm
              _id={film._id}
              overview={film.overview}
              title={film.title}
              year={film.year}
              poster_path={film.poster_path}
              runtime={film.runtime}
              key={film._id}
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
