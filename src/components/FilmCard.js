import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFilm } from '../redux/actions/watchlistActions';
import PropTypes from 'prop-types';
import { setAlert } from '../redux/actions/watchlistActions';

class FilmCard extends Component {
  addToList = e => {
    e.preventDefault();

    const newFilm = {
      id: this.props.film.id,
      title: this.props.film.title,
      year: this.props.film.release_date.slice(0, 4),
      overview: this.props.film.overview,
      poster_path: this.props.film.poster_path,
    };

    this.props.addFilm(newFilm);
  };

  render() {
    const { title, id, overview, poster_path, release_date } = this.props.film;

    return (
      <div id={id} className="filmcard">
        <div className="filmcard-left">
          <div className="filmcard-image-container">
            {poster_path ? (
              <img
                className="filmcard-image"
                src={`http://image.tmdb.org/t/p/w1280${poster_path}`}
                alt=""
              ></img>
            ) : (
              <div className="filmcard-no-image">No poster found</div>
            )}
          </div>
          <button className="filmcard-add-button" onClick={this.addToList}>
            ADD TO WATCHLIST
          </button>
        </div>
        <div className="filmcard-info">
          <div>
            <h4 className="filmcard-title">
              {title} {release_date ? `(${release_date.slice(0, 4)})` : ''}
            </h4>
            <p className="filmcard-overview">{overview.substring(0, 500)}</p>
          </div>
        </div>
      </div>
    );
  }
}

FilmCard.propTypes = {
  addFilm: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { addFilm, setAlert })(FilmCard);
