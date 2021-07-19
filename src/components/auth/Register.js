import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/actions/authActions';
import './register.css';
import { setAlert } from '../../redux/actions/watchlistActions';
import { Redirect } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const registerUserHandler = e => {
    e.preventDefault();

    if (password !== password2) {
      dispatch(setAlert('Passwords do not match', 'failure'));
    } else {
      dispatch(registerUser({ email, password }));
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
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
        <div className="register-form-item">
          <button className="register-form-button">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
