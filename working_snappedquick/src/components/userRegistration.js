import React, { Component } from "react";
import PropTypes from "prop-types";

import "./css/bootstrap.min.css";
import "./css/main.min.css";
import "./images/favicon.ico";
import "./images/favicon.ico";
import "./css/font-awesome.min.css";
import "./css/jquery.mCustomScrollbar.css";
import "./css/justified.css";
import "./css/styles.css";

// import  { userData } from "./userRegistration.js";
// import * as data from "./userRegistration.js";

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const url =
  "http://192.168.100.13:8080/snapped_quick_api_and_admin/public/api/users";

const getUserData = state => {
  let username = state.userName;
  let email = state.email;
  let password = state.password;
  let role = "client";
  let device = "12345";
  let personal_contact = state.phoneNumber;
  let OS = 2;
  let device_token = "13259785947";
  //  let queryUrl = `${url}?fname=${username}&lname=${username}&username=${username}&email=${email}&password=${password}&role=${role}&device=${device}&personal_contact=${personal_contact}&OS=${OS}&device_token=${device_token}`;
  //   return fetch(queryUrl, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     }
  //   }).then(response => {
  //     if (!response.ok) {
  //       throw response;
  //     }
  //     return response.json();
  //   });
  // };

  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: JSON.stringify({
      "username": username,
      "fname": username,
      "lname": username,
      "email": email,
      "password": password,
      "role": role,
      "device": device,
      "personal_contact": personal_contact,
      "OS": OS,
      "device_token": device_token
    })
  }).then(response => {
    if (!response.ok) {
      console.log(response);
    }
    return response.json();
  });
};

class RegisterUser extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      userName: "",
      dateOfBirth: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      phoneNumber: ""
    };
  }

  static propTypes = {
    searchHandler: PropTypes.func
  };

  onSubmit = event => {
    const {
      userName,
      dateOfBirth,
      email,
      password,
      confirmPassword,
      address,
      phoneNumber
    } = this.state;

    return getUserData(this.state).then(response => {
      console.log("fetched", response);
      this.state.query = response;
    });
    // localStorage.setItem("user_data",result)
    // search(jsonData => {
    //   this.setState({
    //     results: jsonData.items
    //   });
    // }, this.state);
  };

  render() {
    const {
      query,
      userName,
      dateOfBirth,
      email,
      password,
      confirmPassword,
      address,
      phoneNumber
    } = this.state;
    return (
      <div className="cover-banner">
        <div className="tabels">
          <div className="tabel-cell">
            <div className="container">
              <div className="form-holder">
                <form
                  method=""
                  action="dashboard.html"
                  onSubmit={this.onSubmit}
                >
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
                  <input
                    onChange={event =>
                      this.setState(byPropKey("email", event.target.value))
                    }
                    type="email"
                    name="email"
                    className="input-field email"
                    placeholder="Email"
                    id="email"
                  />
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
                  <input type="submit" value="Register" />
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
