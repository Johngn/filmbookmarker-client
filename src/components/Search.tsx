import { useEffect } from 'react';
import FilmCard from './FilmCard';
import { useTypedSelector } from '../hooks/useTypedSelector';
import Spinner from './Spinner';
import Searchbox from './Searchbox';
import { useActions } from '../hooks/useActions';

const Search = () => {
  const films = useTypedSelector(state => state.films.films);

  const { getDefaultFilms } = useActions();

  useEffect(() => {
    getDefaultFilms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  interface FilmCardProps {
    title: string;
    id: string;
    release_date: string;
    poster_path: string;
    overview: string;
  }

  return (
    <div className="container">
      <div>
        <p className="search-text">
          Search for films using the search box, and then add them to your
          watchlist
        </p>
      </div>
      <Searchbox />
      <main id="home">
        {films.loading ? (
          <Spinner />
        ) : films.length > 0 ? (
          films.map((film: FilmCardProps) => (
            <FilmCard
              key={film.id}
              id={film.id}
              overview={film.overview}
              poster_path={film.poster_path}
              title={film.title}
              release_date={film.release_date}
            />
          ))
        ) : (
          <div className="no-films-found-container">No films found</div>
        )}
      </main>
    </div>
  );
};

export default Search;
