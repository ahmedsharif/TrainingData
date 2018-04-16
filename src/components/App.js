import * as React from "react";
import Header from "./Header";
import Home from "./Home";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AuthRoute from "./AuthRoute";



class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route component={Header} />
          <Switch>
            <AuthRoute exact path="/" component={Home}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
