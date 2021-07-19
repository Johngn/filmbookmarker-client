import { useState, useEffect } from 'react';
import {
  getWatchlistFilms,
  sortWatchlistFilms,
} from '../redux/actions/watchlistActions';
import { useDispatch, useSelector } from 'react-redux';
import WatchlistFilm from './WatchlistFilm';
import Spinner from './Spinner';
import classNames from 'classnames';

const Watchlist = () => {
  const [sortedByTitle, setSortedByTitle] = useState(false);
  const [sortedByYear, setSortedByYear] = useState(false);

  const watchlist = useSelector(state => state.watchlist);
  const user = useSelector(state => state.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWatchlistFilms(user && user._id));
  }, [user, dispatch]);

  const sortWatchlistFilmsComponent = e => {
    if (e.target.name === 'title') {
      setSortedByTitle(true);
      setSortedByYear(false);
    } else {
      setSortedByTitle(false);
      setSortedByYear(true);
    }

    dispatch(sortWatchlistFilms(e.target.name));
  };

  const films = watchlist.films;

  return (
    <main id="watchlist-page" className="narrow-container">
      <h1 className="watchlist-heading">Watchlist</h1>
      <div className="watchlist-button-container">
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
      {watchlist.loading ? (
        <Spinner />
      ) : films.length > 0 ? (
        <ul className="watchlist">
          {films.map((film, i) => (
            <WatchlistFilm film={film} key={i} />
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
