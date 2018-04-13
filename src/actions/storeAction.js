import { actions } from '../config';

const refreshState = () => {
  return {
    type: actions.REFRESH_STATE,
  };
};

const setVisibilityFilter = visibilityFilter => {
  return {
    type: actions.SET_VISIBILITY_FILTER,
    visibilityFilter,
  };
};

const setDetailedNewsId = id => {
  return {
    type: actions.SET_DETAILED_NEWS_ID,
    id,
  };
};

const setSearchText = search => {
  return {
    type: actions.SET_SEARCH_TEXT,
    search,
  };
};

const addNews = news => {
  return {
    type: actions.ADD_NEWS,
    ...news,
  };
};

const setUser = (username, password) => {
  return {
    type: actions.SET_USER,
    username,
    password,
  };
};

export {
  refreshState,
  setSearchText,
  addNews,
  setUser,
  setDetailedNewsId,
  setVisibilityFilter,
};
