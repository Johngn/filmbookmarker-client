import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchFilm } from '../redux/actions/homeActions';

const Searchbox = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();

  const handleChange = e => {
    setSearchTerm(e.target.value);
    if (e.target.value !== '') {
      dispatch(searchFilm(e.target.value));
    }
  };

  return (
    <div className="form-container">
      <form className="form">
        <input
          type="text"
          id="search"
          className="search"
          placeholder="Enter name of film"
          value={searchTerm}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default Searchbox;
