import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

import "./css/bootstrap.min.css";
import "./css/main.min.css";
import "./images/favicon.ico";
import "./images/favicon.ico";
import "./css/font-awesome.min.css";
import "./css/jquery.mCustomScrollbar.css";
import "./css/justified.css";
import "./css/styles.css";
import "./Login.js";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import validator from "validator";

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const url = "http://54.213.158.63/snapped_quick_api_and_admin/public/api/users";

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
};

const EMAIL = value => {
  if (!validator.isEmail(value)) {
    return `${value} is not a valid email.`;
  }
};

const required = value => {
  if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return "require";
  }
};

const mesasge = value => {
  return "Field values are not correct";
}

var initial_password = "";
const PASSWORD = value => {
  if (value.toString().trim.length < 6) {
    return "password should be >=  6 digits";
  }
  initial_password = value;
};

const CONFIRMPASSWORD = value => {
  if (initial_password !== value) {
    return "password does not match";
  }
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
      redirect: false
    };
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
  }

  onSubmit = event => {
    event.preventDefault();
    userRequest(this.state);

    this.setState({
      redirect: true
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    setTimeout(() => {
      this.form.showErr(this.userInput, <span>API error</span>);
    }, 1000);
  };

  removeApiError = () => {
    this.form.hideError(this.userInput);
  };

  handlePasswordInput(value) {
    if (this.state.password === value) {
      this.setState({
        comfirmPassword: value
      });
    }
  }

  render() {
    const {
      userName,
      dateOfBirth,
      password,
      confirmPassword,
      address,
      phoneNumber,
  } = this.state;

  const isInvalid =
            password !== confirmPassword ||
            password === "" ||
            userName === "" ||
            dateOfBirth === "" ||
            phoneNumber === "" ||
            address === "";

    return this.state.redirect ? (
      <Redirect to="/login" />
    ) : (
      <div className="cover-banner">
        <div className="tabels">
          <div className="tabel-cell">
            <div className="container">
              <div className="form-holder">
                <Form
                  ref={c => {
                    this.form = c;
                  }}
                  onSubmit={this.handleSubmit.bind(this)}
                >
                  <div>
                    <label>
                      <Input required="required"
                        onChange={event =>
                          this.setState(
                            byPropKey("userName", event.target.value)
                          )
                        }
                        onFocus={this.removeApiError}
                        ref={c => {
                          this.userInput = c;
                        }}
                        placeholder="username"
                        className="input-field username"
                        type="text"
                        name="userName"
                        id="userName"
                        validations={[required]}
                      />
                    </label>
                  </div>

                  <div>
                    <label>
                      <Input
                        onChange={event =>
                          this.setState(
                            byPropKey("dateOfBirth", event.target.value)
                          )
                        }
                        onFocus={this.removeApiError}
                        ref={c => {
                          this.userInput = c;
                        }}
                        placeholder="Date Of Birth"
                        className="input-field dob"
                        type="text"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        validations={[required]}
                      />
                    </label>
                  </div>

                  <div>
                    <label>
                      <Input
                        onFocus={this.removeApiError}
                        ref={c => {
                          this.userInput = c;
                        }}
                        placeholder="Email"
                        name="email"
                        validations={[required, EMAIL]}
                        className="input-field email"
                        id="email"
                        onChange={event =>
                          this.setState(byPropKey("email", event.target.value))
                        }
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      <Input
                        onFocus={this.removeApiError}
                        ref={c => {
                          this.userInput = c;
                        }}
                        placeholder="Password"
                        name="password"
                        type="password"
                        validations={[required, PASSWORD]}
                        className="input-field password"
                        id="password"
                        onChange={event =>
                          this.setState(
                            byPropKey("password", event.target.value)
                          )
                        }
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      <Input
                        onFocus={this.removeApiError}
                        ref={c => {
                          this.userInput = c;
                        }}
                        placeholder="Comfirm Password"
                        name="confirmPassword"
                        type="password"
                        validations={[required]}
                        className="input-field password"
                        id="comfirmPassword"
                        onChange={event =>
                          this.setState(
                            byPropKey("confirmPassword", event.target.value)
                          )
                        }
                      />
                    </label>
                  </div>

                  <div>
                    <label>
                      <Input
                        onChange={event =>
                          this.setState(
                            byPropKey("address", event.target.value)
                          )
                        }
                        onFocus={this.removeApiError}
                        ref={c => {
                          this.userInput = c;
                        }}
                        placeholder="Address"
                        className="input-field address"
                        type="text"
                        name="address"
                        id="address"
                        validations={[required]}
                      />
                    </label>
                  </div>

                  <div>
                    <label>
                      <Input
                        onChange={event =>
                          this.setState(
                            byPropKey("phoneNumber", event.target.value)
                          )
                        }
                        onFocus={this.removeApiError}
                        ref={c => {
                          this.userInput = c;
                        }}
                        placeholder="Phone Number"
                        className="input-field phone"
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        validations={[required]}
                      />
                    </label>
                  </div>
                  <Link to="/login">
                    <button
                      type="submit"
                      // disabled={isInvalid}
                      value="register"
                      className="register"
                      onClick={this.onSubmit}
                      validations={[mesasge]}
                    >
                      Search
                    </button>
                  </Link>
                </Form>
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
