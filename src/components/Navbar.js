import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/authActions';

const Navbar = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  return (
    <header>
      <nav className="navbar container">
        {isAuthenticated ? (
          <div>
            <Link className="navbar-link" to="/">
              Search
            </Link>
            <Link className="navbar-link" to="/watchlist">
              Watchlist
            </Link>
          </div>
        ) : (
          ''
        )}

        {isAuthenticated ? (
          <div>
            <button onClick={dispatch(logout)} className="navbar-logout">
              Logout
            </button>
          </div>
        ) : (
          <div style={{ marginLeft: 'auto' }}>
            <Link className="navbar-link" to="/register">
              Register
            </Link>
            <Link className="navbar-link" to="/login">
              Login
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
