import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import RepoList from './components/RepoList';
import RepoDetails from './components/RepoDetails';
import Profile from './components/Profile';

function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      setToken(token);
    } else {
      setToken(localStorage.getItem('token') || '');
    }
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/repos">
          {token ? <RepoList /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/repos/:id">
          {token ? <RepoDetails /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/profile">
          {token ? <Profile /> : <Redirect to="/login" />}
        </Route>
        <Route path="/" render={() => <Redirect to="/login" />} />
      </Switch>
    </Router>
  );
}

export default App;