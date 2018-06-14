import React from "react";
// import { Link, withRouter } from "react-router-dom";
// import { connect } from "react-redux";
// import { compose } from "recompose";

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

  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: JSON.stringify({
      "username": username,
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


const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  userName: "",
  password: "",
  error: null
};

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { userName, password } = this.state;
  
    return getUserData(this.state).then(response => {
      console.log("fetched", response);
    });

    

    // if (
    //   username == verifyData["username"] &&
    //   password == verifyData["password"]
    // ) {
    // } else {
    //   this.state.error = "username or password is not correct";
    // }
  };

  // componentDidMount() {
  //     if (this.props.authUser) {
  //         this.props.history.push(routes.PROFILE);
  //     }
  // }

  render() {
    const { userName, password, error } = this.state;

    return (
      <div className="cover-banner">
        <div className="tabels">
          <div className="tabel-cell">
            <div className="container">
              <div className="form-holder">
                <form method="">
                  <input
                    type="text"
                    name="userName"
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