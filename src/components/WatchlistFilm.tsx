import { useState, useEffect } from 'react';
import { useActions } from '../hooks/useActions';
import { FaRegTrashAlt } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import rottenTomatoes from '../images/rottentomatoes.png';
import metacritic from '../images/metacritic.png';

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
  ratings: [{ Source: string; Value: string }];
}

const WatchlistFilm = ({
  title,
  year,
  overview,
  poster_path,
  _id,
  runtime,
  genres,
  ratings,
}: FilmCardProps) => {
  const [overviewVisible, setOverviewVisible] = useState(true);

  useEffect(() => setOverviewVisible(true), [title]);

  const { deleteWatchlistFilm } = useActions();

  const deleteWatchlistFilmHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setOverviewVisible(false);
    deleteWatchlistFilm(e.currentTarget.value);
  };

  return (
    <li className="watchlist-list-item">
      {overviewVisible ? (
        <div className="watchlist-item-dropdown">
          <div className="watchlist-image-container">
            <img
              className="watchlist-image"
              src={`http://image.tmdb.org/t/p/w1280${poster_path}`}
              alt=""
            ></img>
          </div>

          <div className="watchlist-right">
            <div className="watchlist-item-main">
              <h3
                // onClick={() => setOverviewVisible(!overviewVisible)}
                className="watchlist-item-title"
              >
                {title} <span className="watchlist-film-year">({year})</span>{' '}
                {runtime && (
                  <p className="watchlist-film-runtime">{runtime} mins</p>
                )}
              </h3>
              <button
                value={_id}
                onClick={deleteWatchlistFilmHandler}
                className="watchlist-delete-button"
              >
                <IconContext.Provider
                  value={{ color: '#cc0000', size: '1.5em' }}
                >
                  <FaRegTrashAlt />
                </IconContext.Provider>
              </button>
            </div>
            <div className="watchlist-text">{overview}</div>
            {genres && (
              <div className="watchlist-genres">
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
                        {genre.name}
                      </span>
                    );
                  }
                })}
              </div>
            )}
            {ratings && (
              <div className="ratings-container">
                <div className="rating">
                  <img
                    src="http://icons.iconarchive.com/icons/danleech/simple/1024/imdb-icon.png"
                    width="40px"
                    height="30px"
                    alt="IMDB"
                  />
                  <div>
                    {ratings.filter(
                      rating => rating.Source === 'Internet Movie Database'
                    ).length > 0 &&
                      ratings.filter(
                        rating => rating.Source === 'Internet Movie Database'
                      )[0].Value}
                  </div>
                </div>
                <div className="rating">
                  <img
                    src={rottenTomatoes}
                    width="25px"
                    height="30px"
                    alt="Rotten Tomatoes"
                  />
                  <div>
                    {ratings.filter(
                      rating => rating.Source === 'Rotten Tomatoes'
                    ).length > 0 &&
                      ratings.filter(
                        rating => rating.Source === 'Rotten Tomatoes'
                      )[0].Value}
                  </div>
                </div>
                <div className="rating">
                  <img
                    className="metacritic"
                    src={metacritic}
                    width="30px"
                    height="30px"
                    alt="Metacritic"
                  />
                  <div>
                    {ratings.filter(rating => rating.Source === 'Metacritic')
                      .length > 0 &&
                      ratings.filter(
                        rating => rating.Source === 'Metacritic'
                      )[0].Value}
                  </div>
                </div>
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
