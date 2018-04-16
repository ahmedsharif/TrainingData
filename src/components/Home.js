import React from 'react';
import PropTypes from 'prop-types';
import { loadNewsFromAPI } from '../actions/index';
import VisibleNewsList from './VisibleNewsList';
import { refreshState, setUser } from '../actions/storeAction';

class Home extends React.Component {
  static isPrivate = false;

  componentWillMount = () => {
    const { store } = this.context;
    store.dispatch(refreshState());
    store.dispatch(setUser(localStorage.username, localStorage.authToken));
    loadNewsFromAPI(store);
  };

  render() {
    return (
      <div>
        <VisibleNewsList />
      </div>
    );
  }
}

Home.contentTypes = {
  store: PropTypes.object,
};

export default Home;
