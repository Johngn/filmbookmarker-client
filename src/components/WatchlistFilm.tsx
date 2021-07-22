import { useState, useEffect } from 'react';
import { useActions } from '../hooks/useActions';

interface Genre {
  id: number;
  name: string;
}

interface FilmCardProps {
  title: string;
  _id: string;
  year: string;
  poster_path: string;
  overview: string;
  runtime: number;
  genres: Genre[];
}

const WatchlistFilm = ({
  title,
  year,
  overview,
  poster_path,
  _id,
  runtime,
  genres,
}: FilmCardProps) => {
  const [overviewVisible, setOverviewVisible] = useState(false);

  useEffect(() => setOverviewVisible(false), [title]);

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
          {title} ({year}) {runtime && <p>{runtime} mins</p>}
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
          <div>
            <div className="watchlist-text">{overview}</div>
            {genres && (
              <div className="watchlist-text">
                {genres.map((genre, i, genres) => {
                  if (genres.length === i + 1) {
                    return (
                      <span key={genre.id} className="watchlist-genre">
                        {genre.name}
                      </span>
                    );
                  } else {
                    return (
                      <span key={genre.id} className="watchlist-genre">
                        {genre.name},{' '}
                      </span>
                    );
                  }
                })}
              </div>
            )}
          </div>
        </div>
      ) : (
        ''
      )}
    </li>
  );
};

export default WatchlistFilm;
