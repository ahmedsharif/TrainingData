import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Url from "domurl";

import "./css/bootstrap.min.css";
import "./css/main.min.css";
import "./images/favicon.ico";
import "./images/favicon.ico";
import "./css/font-awesome.min.css";
import "./css/jquery.mCustomScrollbar.css";
import "./css/justified.css";

// import "./js/main.min.js";
// import "./js/lightbox-plus-jquery.min.js";
// import "./js/jquery.mCustomScrollbar.concat.min.js";
// import "./js/imagesloaded.pkgd.min.js";
// import "./js/justified.min.js";
// import $ from "./js/custom.js"

// import * as user from "./userRegistration.js";

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});


function search(callback, state) {
  // searchurl.state.q = state;
  var searchurl = new Url(
    "http://192.168.100.13:8080/snapped_quick_api_and_admin/public/api/users"
  );

  searchurl.query.q = state.target.userName;
  searchurl.query.q = state.target.dateOfBirth;
  searchurl.query.q = state.target.email;
  searchurl.query.q = state.target.password;
  searchurl.query.q = state.target.confirmPassword;
  searchurl.query.q = state.target.address;
  searchurl.query.q = state.target.phoneNumber;
  let request = new Request(searchurl.toString());
  fetch(request)
    .then(response => response.json())
    .then(callback);
}

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

    search(jsonData => {
      this.setState({
        results: jsonData.items
      });
    }, this.state);
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
      <div class="cover-banner">
        <div class="tabels">
          <div class="tabel-cell">
            <div class="container">
              <div class="form-holder">
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
                <p class="forgot">
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
// export default {search };
