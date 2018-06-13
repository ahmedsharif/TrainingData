import React from "react";
// import { Link, withRouter } from "react-router-dom";
// import { connect } from "react-redux";
// import { compose } from "recompose";

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

  // onSubmit = event => {
  //     const { userName, password } = this.state;

  //     const { history } = this.props;

  //     auth
  //         .doSignInWithEmailAndPassword(userName, password)
  //         .then(user => {
  //             this.props.setUserInStore(user);
  //             this.setState(() => ({ ...INITIAL_STATE }));
  //             history.push(routes.HOME);
  //         })
  //         .catch(error => {
  //             this.setState(byPropKey("error", error));
  //         });

  //     event.preventDefault();
  // };

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
