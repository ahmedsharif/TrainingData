import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./Login.js";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { byPropKey } from "./Base.js";
import * as validation from "./Validation.js";

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
      phoneNumber
    } = this.state;

    const isInvalid =
      password !== confirmPassword ||
      password === "" ||
      userName === "" ||
      dateOfBirth === "" ||
      phoneNumber === "" ||
      address === "";

    return this.state.redirect ? (
      <Redirect to="/companysignup" />
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
                      <Input
                        required="required"
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
                        validations={[validation.required]}
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
                        validations={[validation.required]}
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
                        validations={[validation.required, validation.EMAIL]}
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
                        validations={[validation.required, validation.PASSWORD]}
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
                        validations={[validation.required]}
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
                        validations={[validation.required]}
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
                        validations={[validation.required]}
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isInvalid}
                    value="register"
                    className="register"
                    onClick={this.onSubmit}
                  >
                    Search
                  </button>
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
