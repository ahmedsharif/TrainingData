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

const setSearchText = searchText => {
  return {
    type: actions.SET_SEARCH_TEXT,
    searchText,
  };
};

const setUser = (username, token) => {
  return {
    type: actions.SET_USER,
    username,
    token,
  };
};

const setDetailedNewsId = id => {
  return {
    type: actions.SET_DETAILED_NEWS_ID,
    id,
  };
};
const addNews = news => {
  return {
    type: actions.ADD_NEWS,
    ...news,
  };
};

export {
  refreshState,
  addNews,
  setVisibilityFilter,
  setSearchText,
  setUser,
  setDetailedNewsId,
};
