import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import { useTypedSelector } from './hooks/useTypedSelector';

import Navbar from './components/Navbar';
import Search from './components/Search';
import Watchlist from './components/Watchlist';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/Alert';
import Spinner from './components/Spinner';

import './App.css';

const App = () => {
  const { loading } = useTypedSelector(state => state.auth);

  return (
    <div className="App">
      <Alert />
      <Router>
        <Navbar />
        {loading && <Spinner />}
        {!loading && (
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/" component={Login} />
            <PrivateRoute exact path="/search" component={Search} />
            <PrivateRoute exact path="/watchlist" component={Watchlist} />
          </Switch>
        )}
      </Router>
    </div>
  );
};

export default App;
