import { Link } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';

const Navbar = () => {
  const isAuthenticated = useTypedSelector(state => state.auth.isAuthenticated);

  const { logout } = useActions();

  return (
    <header>
      <nav className="navbar container">
        <Link className="navbar-title-link" to="/watchlist">
          <h2 className="navbar-title">Filmmarker</h2>
        </Link>

        {isAuthenticated ? (
          <>
            <div>
              <Link className="navbar-link" to="/search">
                Search
              </Link>
              <Link className="navbar-link" to="/watchlist">
                Watchlist
              </Link>
              <button onClick={logout} className="navbar-logout">
                Logout
              </button>
            </div>
          </>
        ) : (
          <div>
            <Link className="navbar-link" to="/register">
              Register
            </Link>
            <Link className="navbar-link" to="/">
              Login
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
