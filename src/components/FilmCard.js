import { useDispatch } from 'react-redux';
import { addFilm } from '../redux/actions/watchlistActions';

const FilmCard = ({ film }) => {
  const dispatch = useDispatch();

  const { title, id, overview, poster_path, release_date } = film;

  const addToList = e => {
    e.preventDefault();

    const newFilm = {
      id,
      title,
      year: release_date.slice(0, 4),
      overview,
      poster_path,
    };

    dispatch(addFilm(newFilm));
  };

  return (
    <div id={id} className="filmcard">
      <div className="filmcard-left">
        <div className="filmcard-image-container">
          {poster_path ? (
            <img
              className="filmcard-image"
              src={`http://image.tmdb.org/t/p/w1280${poster_path}`}
              alt=""
            ></img>
          ) : (
            <div className="filmcard-no-image">No poster found</div>
          )}
        </div>
        <button className="filmcard-add-button" onClick={addToList}>
          ADD TO WATCHLIST
        </button>
      </div>
      <div className="filmcard-info">
        <div>
          <h4 className="filmcard-title">
            {title} {release_date ? `(${release_date.slice(0, 4)})` : ''}
          </h4>
          <p className="filmcard-overview">{overview.substring(0, 450)}</p>
        </div>
      </div>
    </div>
  );
};

export default FilmCard;
