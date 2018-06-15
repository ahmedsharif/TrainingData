import React, { Component } from "react";
import { Route ,Redirect, Link } from "react-router-dom";

import "./css/bootstrap.min.css";
import "./css/main.min.css";
import "./images/favicon.ico";
import "./images/favicon.ico";
import "./css/font-awesome.min.css";
import "./css/jquery.mCustomScrollbar.css";
import "./css/justified.css";
import "./css/styles.css";
import "./Login.js"

import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const url = "http://54.213.158.63/snapped_quick_api_and_admin/public/api/users";

function renderRedirect()  {
    return <Redirect to="/Login" />;
};


const userRequest = state => {
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: state.userName,
      fname: state.userName,
      lname: state.userName,
      email: state.email,
      password: state.password,
      role: "client",
      device: "12345",
      personal_contact: state.phoneNumber,
      OS: "2",
      device_token: "1234568"
    })
  })
    .then(response => response.json())
    .catch(error => console.error("Error:", error))
    .then(json => {
      console.log(json);
    });
  // {this.renderRedirect()}
  // return <Redirect to="/login" />;
};

class RegisterUser extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      dateOfBirth: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      phoneNumber: "",
      redirect: false,
    };
  }

  componentDidMount() {
    return <Redirect to="/login" />;
  }

  onSubmit = event => {
    event.preventDefault();
    userRequest(this.state);
    renderRedirect();
    // {this.state.setRedirect}
    // {this.renderRedirect()}
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  render() {
    return (
      <div className="cover-banner">
        <div className="tabels">
          <div className="tabel-cell">
            <div className="container">
              <div className="form-holder">
                <form>
                {/* <Route
                  exact
                  path="/login"
                  render={() => (
                    <Link to="/login"></Link>
                  )}
                /> */}
                  <input
                    onChange={event =>
                      this.setState(byPropKey("userName", event.target.value))
                    }
                    type="text"
                    name="userName"
                    className="input-field username"
                    placeholder="Username"
                    id="userName"
                  />
                  <input
                    onChange={event =>
                      this.setState(
                        byPropKey("dateOfBirth", event.target.value)
                      )
                    }
                    type="text"
                    name="dateOfBirth"
                    className="input-field dob"
                    placeholder="Date Of Birth"
                    id="dateOfBirth"
                  />
                   <label>
                    Email*
                    <Input  placeholder="Email" name='email'  className="input-field email" id="email"  onChange={event =>
                      this.setState(byPropKey("email", event.target.value))
                    } validations={[required, email]}/>
                </label>
                  {/* <input
                    onChange={event =>
                      this.setState(byPropKey("email", event.target.value))
                    }
                    type="email"
                    name="email"
                    className="input-field email"
                    placeholder="Email"
                    id="email"
                  /> */}
                  <input
                    onChange={event =>
                      this.setState(byPropKey("password", event.target.value))
                    }
                    type="password"
                    name="password"
                    className="input-field password"
                    placeholder="Password"
                    id="password"
                  />
                  <input
                    onChange={event =>
                      this.setState(
                        byPropKey("comfirmPassword", event.target.value)
                      )
                    }
                    type="password"
                    name="confirmPassword"
                    className="input-field password"
                    placeholder="Confirm Password"
                    id="comfirmPassword"
                  />
                  <input
                    onChange={event =>
                      this.setState(byPropKey("address", event.target.value))
                    }
                    type="text"
                    name="address"
                    className="input-field address"
                    placeholder="Address"
                    id="address"
                  />
                  <input
                    onChange={event =>
                      this.setState(
                        byPropKey("phoneNumber", event.target.value)
                      )
                    }
                    type="text"
                    name="phoneNumber"
                    className="input-field phone"
                    placeholder="Phone Number"
                    id="phoneNumber"
                  />
                   <Link to="/login">
                    <button
                      type="submit"
                      value="register"
                      onClick={this.onSubmit}
                    >
                      Search
                    </button>
                  </Link>
                  {/* <input
                    type="submit"
                    onClick={this.state.setRedirect}
                    value="Register"
                  /> */}
                </form>
                <p className="forgot">
                  Already Have an Account? <a href="login.html">Login Here</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterUser;
