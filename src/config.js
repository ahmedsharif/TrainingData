const domain = "http://127.0.0.1:8000/index"

const actions = {
    ADD_NEWS: "ADD_NEWS",
    SET_VISIBILITY_FILTER: "SET_VISIBILITY_FILTER",
    USER_LOGOUT: "USER_LOGOUT",
    REFRESH_STATE: "REFRESH_STATE",
    SET_DETAILED_NEWS_ID: "SET_DETAILED_NEWS_ID",
    SET_SEARCH_TEXT: 'SET_SEARCH_TEXT',
    SET_USER: 'SET_USER', 
}

const filters = {
    SHOW_ALL: "SHOW_ALL",
    SHOW_BY_SEARCH: "SHOW_BY_SEARCH",
    SHOW_BY_ID: "SHOW_BY_ID",
}

const events = {
    LOGIN: 1,
    ADD_NEWS: 2,
    LOGOUT: 2.3,
};

export {domain, actions, filters, events};