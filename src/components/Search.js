import React, { useEffect } from 'react';
import FilmCard from './FilmCard';
import { getDefaultFilms } from '../redux/actions/homeActions';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner';
import Searchbox from './Searchbox';

const Search = () => {
  const films = useSelector(state => state.films.films);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDefaultFilms());
  });

  return (
    <div className="container">
      <Searchbox />
      <main id="home">
        {films.loading ? (
          <Spinner />
        ) : films.length > 0 ? (
          films.map((film, i) => <FilmCard key={film.id} film={film} />)
        ) : (
          <div className="no-films-found-container">No films found</div>
        )}
      </main>
    </div>
  );
};

export default Search;
