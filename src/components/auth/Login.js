import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/authActions';
import './login.css';
import { Redirect } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const loginUserHandler = e => {
    e.preventDefault();

    dispatch(loginUser({ email, password }));
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
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
        <div className="register-form-item">
          <button className="register-form-button">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
