import React, { Component } from 'react';
import {
  getWatchlistFilms,
  sortWatchlistFilms,
} from '../redux/actions/watchlistActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WatchlistFilm from './WatchlistFilm';
import Spinner from './Spinner';
import classNames from 'classnames';

class Watchlist extends Component {
  state = {
    sortedByTitle: false,
    sortedByYear: false,
  };

  componentDidMount() {
    this.props.getWatchlistFilms(this.props.user && this.props.user._id);
  }

  sortWatchlistFilms = e => {
    if (e.target.name === 'title') {
      this.setState({ sortedByTitle: true, sortedByYear: false });
    } else {
      this.setState({ sortedByYear: true, sortedByTitle: false });
    }

    this.props.sortWatchlistFilms(e.target.name);
  };

  render() {
    const films = this.props.watchlist.films;

    return (
      <main id="watchlist-page" className="narrow-container">
        <h1 className="watchlist-heading">Watchlist</h1>
        <div className="watchlist-button-container">
          <button
            className={classNames(
              {
                'watchlist-button-pressed': this.state.sortedByYear,
              },
              'watchlist-button'
            )}
            name="year"
            onClick={this.sortWatchlistFilms}
          >
            Sort by year
          </button>
          <button
            className={classNames(
              {
                'watchlist-button-pressed': this.state.sortedByTitle,
              },
              'watchlist-button'
            )}
            name="title"
            onClick={this.sortWatchlistFilms}
          >
            Sort by title
          </button>
        </div>
        {this.props.watchlist.loading ? (
          <Spinner />
        ) : films.length > 0 ? (
          <ul className="watchlist">
            {films.map((film, i) => (
              <WatchlistFilm film={film} key={i} />
            ))}
          </ul>
        ) : (
          <div className="watchlist-empty-container">
            <h3 className="watchlist-emtpy-text">
              No films on watchlist. Go to search page to find films to add.
            </h3>
          </div>
        )}
      </main>
    );
  }
}

Watchlist.propTypes = {
  getWatchlistFilms: PropTypes.func.isRequired,
  sortWatchlistFilms: PropTypes.func.isRequired,
  watchlist: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  watchlist: state.watchlist,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getWatchlistFilms,
  sortWatchlistFilms,
})(Watchlist);
