import { useState, useEffect, useRef } from 'react';
import { useActions } from '../hooks/useActions';

const Searchbox: React.FunctionComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { searchFilm } = useActions();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== '' && searchTerm === inputRef.current?.value) {
        searchFilm(searchTerm);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, inputRef]);

  return (
    <div className="form-container">
      <form className="form">
        <input
          ref={inputRef}
          type="text"
          id="search"
          className="search"
          placeholder="Enter name of film"
          value={searchTerm}
          // onChange={handleChange}
          onChange={event => setSearchTerm(event.target.value)}
        />
      </form>
    </div>
  );
};

export default Searchbox;
