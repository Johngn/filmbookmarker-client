import { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

import IntroText from './IntroText';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const isAuthenticated = useTypedSelector(state => state.auth.isAuthenticated);

  const { registerUser, setAlert } = useActions();

  const registerUserHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== password2) {
      setAlert('Passwords do not match', 'failure');
    } else {
      registerUser({ email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="register-form-container">
        <h3 className="register-form-header">Register</h3>
        <form onSubmit={registerUserHandler} className="register-form">
          <div className="register-form-item">
            <label className="register-form-label">Email:</label>
            <input
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="register-form-input"
              type="text"
            ></input>
          </div>
          <div className="register-form-item">
            <label className="register-form-label">Password:</label>
            <input
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="register-form-input"
              type="password"
            ></input>
          </div>
          <div className="register-form-item">
            <label className="register-form-label">Confirm Password:</label>
            <input
              name="password2"
              value={password2}
              onChange={e => setPassword2(e.target.value)}
              className="register-form-input"
              type="password"
            ></input>
          </div>
          <p style={{ marginTop: '20px', color: 'red', textAlign: 'center' }}>
            Already have an account? Then{' '}
            <Link to="/login">
              <span className="register-warning">Login</span>
            </Link>
          </p>
          <div className="register-form-item">
            <button className="register-form-button">Submit</button>
          </div>
        </form>
      </div>

      <IntroText />
    </>
  );
};

export default Register;
