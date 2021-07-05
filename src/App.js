import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Watchlist from './components/Watchlist';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/Alert';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { loadUser } from './redux/actions/authActions';
// import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

export default class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Alert />
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/" component={Search} />
              <PrivateRoute exact path="/watchlist" component={Watchlist} />
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}
