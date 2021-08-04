import { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

import IntroText from './IntroText';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loginUser, loadUser, setLoading } = useActions();

  const isAuthenticated = useTypedSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginUserHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading();
    loginUser({ email, password });
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="register-form-container">
        <h3 className="register-form-header">Login</h3>
        <form onSubmit={loginUserHandler} className="register-form">
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
          <p style={{ marginTop: '20px', color: 'red', textAlign: 'center' }}>
            No account?{' '}
            <Link to="/register">
              <span className="register-warning">Register</span>
            </Link>{' '}
            first
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

export default Login;
