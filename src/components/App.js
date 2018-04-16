import * as React from 'react';
import Header from './Header';
import Home from './Home';
import LoginForm from './LoginForm';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import NewsDetailed from './NewsDetailed';
import AddNews from './AddNews';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route component={Header} />
          <Switch>
            <AuthRoute exact path="/" component={Home} />
            <AuthRoute path="/login" component={LoginForm} />
            <AuthRoute path="/addNews" component={AddNews} />
            <AuthRoute path={'/news/:id'} component={NewsDetailed} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
