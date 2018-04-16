import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { domain } from '../config';
import { setUser } from '../actions/storeAction';
import { getRequestHeader } from '../actions/index';

class LoginForm extends React.Component {
  static isPrivate = false;

  componentDidMount = () => {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  };

  componentWillUnmount = () => {
    this.unsubscribe();
  };

  tryLogin = (username, token) => {
    const { store } = this.context;

    if (token) {
      localStorage.setItem('username', username);
      localStorage.setItem('authToken', token);
      store.dispatch(setUser(username, token));
      this.props.history.push('/');
    } else {
      alert('username and password is incorrect');
    }
  };

  handleSubmit = event => {
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;
    fetch(domain + '/news/auth', {
      method: 'POST',
      headers: getRequestHeader(),
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(repsonse => response.json())
      .then(responseJson => {
        this.tryLogin(username, responseJson.token);
      })
      .catch(error => {
        console.log(error);
      });

    event.preventDefault();
  };

  render() {
    return (
      <div name="LoginForm" className="loginForm">
        <h2> Please Login </h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="username" placeholder="enter username" />
          <br />
          <input type="password" name="password" placeholder="enter password" />
          <br />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

LoginForm.contextTypes = {
  store: PropTypes.object,
};

export default withRouter(LoginForm);
