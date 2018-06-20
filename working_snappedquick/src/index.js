import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

import "./components/css/bootstrap.min.css";
import "./components/css/main.min.css";
import "./components/images/favicon.ico";
import "./components/images/favicon.ico";
import "./components/css/font-awesome.min.css";
import "./components/css/jquery.mCustomScrollbar.css";
import "./components/css/justified.css";
import "./components/css/styles.css";

import RegisterUser from "./components/Signup";
import Login from "./components/Login.js";
import CompanyProfile from "./components/PhotographerProfile";
import Payment from "./components/Payment";

registerServiceWorker();

class Main extends Component {
  render() {
    return (
      <div className="routes">
        <Route
          path="/"
          exact
          render={() => (
            <div className="App-header">
              <RegisterUser />
            </div>
          )}
        />
        <Route
          exact
          path="/login"
          render={() => (
              <Login />
          )}
        />
        <Route
          exact
          path="/companysignup"
          render={() => (
              <CompanyProfile />
          )}
        />
         <Route
          exact
          path="/payment"
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
