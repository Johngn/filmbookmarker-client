import { useState, useEffect } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import './login.css';
import { Redirect } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loginUser, loadUser, setLoading } = useActions();

  const isAuthenticated = useTypedSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    // setLoading();
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
