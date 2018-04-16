import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { actions, filters } from '../config';

const news = (state = [], action) => {
  switch (action.type) {
    case actions.ADD_NEWS:
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

const searchText = (state = '', action) => {
  switch (action.type) {
    case actions.SET_SEARCH_TEXT:
      return action.searchText;
    case actions.REFRESH_STATE:
      return '';
    default:
      return state;
  }
};

const visibilityFilter = (state = filters.SHOW_ALL, action) => {
  switch (action.type) {
    case actions.SET_VISIBILITY_FILTER:
      return action.visibilityFilter;
    case actions.REFRESH_STATE:
      return filters.SHOW_ALL;
    default:
      return state;
  }
};

const user = (state = {}, action) => {
  switch (action.type) {
    case actions.SET_USER:
      return {
        username: action.username,
        token: action.token,
      };
    default:
      return state;
  }
};

const newsApp = combineReducers({
  news,
  visibilityFilter,
  user,
  searchText,
  detailedNewsId,
  form: reduxFormReducer,
});

export default newsApp;
