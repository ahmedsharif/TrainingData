import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import RegisterUser from "./components/userRegistration.js";
import { Route, Link } from "react-router-dom";
import Login from "./components/Login.js";
import Check from "./components/Check.js";

registerServiceWorker();

class Main extends Component {
  constructor() {
    super();
    this.registerUser = this.register_user.bind(this);
    this.setState = {
      isUserRegistered: false,
      result: [],
      error: ""
    };
  }

  componentDidMount() {
    this.registerUser = "";
  }

  register_user() {
    this.setState({
      isUserRegistered: true
    });
  }

  render() {
    return (
      <div className="Main">
        <Route
          path="/"
          exact
          render={() => (
            <div className="App-header">
              <RegisterUser isUserRegistered={this.register_user} />
            </div>
          )}
        />
        <Route
          exact
          path="/login"
          render={() => (
            <div>
              <Login />
            </div>
          )}
        />
        <Route
          exact
          path="/check"
          render={() => (
            <div>
              <Check />
            </div>
          )}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <Main />
  </BrowserRouter>,
  document.getElementById("root")
);

export default Main;
