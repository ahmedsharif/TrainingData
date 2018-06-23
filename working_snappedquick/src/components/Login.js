import React from "react";
import { byPropKey } from "./Base.js";
import { Redirect } from "react-router-dom";

const url =
  "http://54.213.158.63/snapped_quick_api_and_admin/public/api/users/login";

var flag = false;

const getUserData = state => {
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      mode: "no-cors"
    },
    body: JSON.stringify({
      username: state.userName,
      password: state.password,
      role: "client",
      OS: "2",
      device_token: "13243984"
    })
  })
    .then(response => response.json())
    .then(responseData => {
      console.log(responseData);
      localStorage.setItem("data", JSON.stringify(responseData));
      flag = true;
    })
    .catch(error => console.log(error));
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      redirect: false
    };
  }

  onSubmit = event => {
    event.preventDefault();
    getUserData(this.state);
    if (flag) {
      this.setState({
        redirect: true
      });
    }
  };

  render() {
    return this.state.redirect ? (
      <Redirect to="/companysignup" />
    ) : (
      <div className="cover-banner">
        <div className="tabels">
          <div className="tabel-cell">
            <div className="container">
              <div className="form-holder">
                <form method="" onSubmit={this.onSubmit}>
                  <input
                    type="text"
                    name="userName"
                    required="required"
                    className="input-field username"
                    onChange={event =>
                      this.setState(byPropKey("userName", event.target.value))
                    }
                    id="userName"
                    placeholder="Username"
                  />
                  <input
                    type="password"
                    name="password"
                    required="required"
                    className="input-field password"
                    onChange={event =>
                      this.setState(byPropKey("password", event.target.value))
                    }
                    id="password"
                    placeholder="Password"
                  />
                  <input type="submit" value="Login" />
                </form>
                <p className="forgot">
                  <a href="forgot-password.html">Forgot Password?</a>
                </p>
                <p className="acount">Don't Have an Account? Create Account</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
