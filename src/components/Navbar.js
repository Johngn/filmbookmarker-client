import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../redux/actions/authActions';

class Navbar extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;

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
              <button onClick={this.props.logout} className="navbar-logout">
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
  }
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default withRouter(connect(mapStateToProps, { logout })(Navbar));
