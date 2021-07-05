import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchFilm } from '../redux/actions/homeActions';

class Searchbox extends Component {
    state = {
        searchTerm: '',
    };

    handleChange = e => {
        this.setState({ searchTerm: e.target.value });
        if (e.target.value !== '') {
            this.props.searchFilm(e.target.value);
        }
    };

    handleSubmit = e => {
        e.preventDefault();

        this.props.searchFilm(this.state.searchTerm);
    };

    render() {
        return (
            <div className="form-container">
                <form onSubmit={this.handleSubmit} className="form">
                    <input
                        type="text"
                        id="search"
                        className="search"
                        placeholder="Enter name of film"
                        value={this.state.searchTerm}
                        onChange={this.handleChange}
                    />
                    {/* <input
                        className="search-button"
                        type="submit"
                        value="Search"
                    /> */}
                </form>
            </div>
        );
    }
}

Searchbox.propTypes = { searchFilm: PropTypes.func.isRequired };

export default connect(null, { searchFilm })(Searchbox);
