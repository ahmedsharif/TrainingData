import React from 'react';
import AddNewsForm from './AddNewsForm';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { addNewsInAPI } from '../actions/index';
import { withRouter } from 'react-router-dom';

const selector = formValueSelector('addNews');

const mapStateToProps = state => {
  return {
    news: {
      title: selector(state, 'title'),
      content: selector(state, 'content'),
      image: selector(state, 'image'),
    },
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { news } = stateProps;
  return {
    onSubmit: () => {
      addNewsInAPI(news, ownProps.history.push);
    },
  };
};

const AddNewsContainer = withRouter(
  connect(mapStateToProps, null, mergeProps)(AddNewsForm)
);

class AddNews extends React.Component {
  static isPrivate = true;

  render() {
    return <AddNewsContainer />;
  }
}

export default AddNews;
