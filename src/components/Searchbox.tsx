import { useState } from 'react';
import { useActions } from '../hooks/useActions';

const Searchbox = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { searchFilm } = useActions();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
    if (e.currentTarget.value !== '') {
      searchFilm(e.currentTarget.value);
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
