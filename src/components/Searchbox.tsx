import { useState, useEffect, useRef } from 'react';
import { useActions } from '../hooks/useActions';

const Searchbox: React.FunctionComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchYear, setSearchYear] = useState('');
  const searchTermInputRef = useRef<HTMLInputElement>(null);
  const { searchFilm } = useActions();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        searchTerm !== '' &&
        searchTerm === searchTermInputRef.current?.value
      ) {
        searchFilm(searchTerm, searchYear);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, searchYear, searchTermInputRef]);

  return (
    <div className="form-container">
      <form className="form">
        <input
          ref={searchTermInputRef}
          type="text"
          id="search"
          className="search"
          placeholder="Enter name of film"
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
        />
        <input
          type="text"
          id="search"
          className="search-year"
          placeholder="Year"
          value={searchYear}
          onChange={event => setSearchYear(event.target.value)}
        />
      </form>
    </div>
  );
};

export default Searchbox;
