import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { actions, filters } from '../config';

const news = (state = [], action) => {
  switch (action.type) {
    case action.ADD_NEWS:
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
          content: action.content,
          image_url: action.image_url,
          image: action.image,
          pub_date: action.pub_date,
          publisher: action.publisher,
        },
      ];
    case actions.REFRESH_STATE:
      return [];
    default:
      return state;
  }
};

const detailedNewsId = (state = '', action) => {
  switch (action.type) {
    case actions.SET_DETAILED_NEWS_ID:
      return action.id;
    case actions.REFRESH_STATE:
      return '';
    default:
      return state;
  }
};



const newsApp = combineReducers({
  news,
  form: reduxFormReducer,
});

export default newsApp;
