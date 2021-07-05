import React, { Component } from 'react';
import { deleteWatchlistFilm } from '../redux/actions/watchlistActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WatchlistFilm extends Component {
    state = {
        overview: false,
    };

    showOverview = () => {
        this.setState({ overview: !this.state.overview });
    };

    deleteWatchlistFilm = e => {
        this.setState({ overview: false });
        this.props.deleteWatchlistFilm(e.target.value);
    };

    render() {
        const { title, year, overview, poster_path, _id } = this.props.film;

        return (
            <li className="watchlist-list-item">
                <div className="watchlist-item-main">
                    <h3
                        onClick={this.showOverview}
                        className="watchlist-item-title"
                    >
                        {title} ({year})
                    </h3>
                    <button
                        value={_id}
                        onClick={this.deleteWatchlistFilm}
                        className="watchlist-delete-button"
                    >
                        Remove
                    </button>
                </div>
                {this.state.overview ? (
                    <div className="watchlist-item-dropdown">
                        <div className="watchlist-image-container">
                            <img
                                className="watchlist-image"
                                src={`http://image.tmdb.org/t/p/w1280${poster_path}`}
                                alt=""
                            ></img>
                        </div>
                        <p className="watchlist-text">{overview}</p>
                    </div>
                ) : (
                    ''
                )}
            </li>
        );
    }
}

WatchlistFilm.propTypes = {
    deleteWatchlistFilm: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { deleteWatchlistFilm })(WatchlistFilm);
