import { useState } from 'react';
import { useActions } from '../hooks/useActions';

interface FilmCardProps {
  title: string;
  _id: string;
  year: string;
  poster_path: string;
  overview: string;
}

const WatchlistFilm = ({
  title,
  year,
  overview,
  poster_path,
  _id,
}: FilmCardProps) => {
  const [overviewVisible, setOverviewVisible] = useState(false);

  const { deleteWatchlistFilm } = useActions();

  const deleteWatchlistFilmHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setOverviewVisible(false);
    deleteWatchlistFilm(e.currentTarget.value);
  };

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
