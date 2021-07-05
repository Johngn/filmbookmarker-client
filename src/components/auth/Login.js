import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser, logout } from '../../redux/actions/authActions';
import './login.css';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    state = {
        email: '',
        password: '',
    };

    inputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    loginUser = e => {
        e.preventDefault();

        const { email, password } = this.state;

        this.props.loginUser({ email, password });
    };

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }

        return (
            <div className="register-form-container">
                <h3 className="register-form-header">Login</h3>
                <form onSubmit={this.loginUser} className="register-form">
                    <div className="register-form-item">
                        <label className="register-form-label">Email:</label>
                        <input
                            name="email"
                            value={this.state.email}
                            onChange={this.inputChange}
                            className="register-form-input"
                            type="text"
                        ></input>
                    </div>
                    <div className="register-form-item">
                        <label className="register-form-label">Password:</label>
                        <input
                            name="password"
                            value={this.state.password}
                            onChange={this.inputChange}
                            className="register-form-input"
                            type="password"
                        ></input>
                    </div>
                    <div className="register-form-item">
                        <button className="register-form-button">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loginUser, logout })(Login);
