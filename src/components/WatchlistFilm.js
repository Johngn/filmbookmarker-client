import { useState } from 'react';
import { deleteWatchlistFilm } from '../redux/actions/watchlistActions';
import { useDispatch } from 'react-redux';

const WatchlistFilm = ({ film }) => {
  const [overviewVisible, setOverviewVisible] = useState(false);

  const dispatch = useDispatch();

  const deleteWatchlistFilmHandler = e => {
    setOverviewVisible(false);
    dispatch(deleteWatchlistFilm(e.target.value));
  };

  const { title, year, overview, poster_path, _id } = film;

  return (
    <li className="watchlist-list-item">
      <div className="watchlist-item-main">
        <h3
          onClick={() => setOverviewVisible(!overviewVisible)}
          className="watchlist-item-title"
        >
          {title} ({year})
        </h3>
        <button
          value={_id}
          onClick={deleteWatchlistFilmHandler}
          className="watchlist-delete-button"
        >
          Remove
        </button>
      </div>
      {overviewVisible ? (
        <div className="watchlist-item-dropdown">
          <div className="watchlist-image-container">
            <img
              className="watchlist-image"
              src={`http://image.tmdb.org/t/p/w1280${poster_path}`}
              alt=""
            ></img>
          </div>
          <p className="watchlist-text">{overview}</p>
        </div>
      ) : (
        ''
      )}
    </li>
  );
};

export default WatchlistFilm;
