import React, { Component } from 'react';
import FilmCard from './FilmCard';
import { getDefaultFilms } from '../redux/actions/homeActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from './Spinner';
import Searchbox from './Searchbox';

class Search extends Component {
    componentDidMount() {
        this.props.getDefaultFilms();
    }

    render() {
        const films = this.props.films.films;

        return (
            <div className="container">
                <Searchbox />
                <main id="home">
                    {this.props.films.loading ? (
                        <Spinner />
                    ) : films.length > 0 ? (
                        films.map((film, i) => (
                            <FilmCard key={film.id} film={film} />
                        ))
                    ) : (
                        <div className="no-films-found-container">
                            No films found
                        </div>
                    )}
                </main>
            </div>
        );
    }
}

Search.propTypes = {
    getDefaultFilms: PropTypes.func.isRequired,
    films: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    films: state.films,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getDefaultFilms })(Search);
