import {actions} from "../config";

const refreshState = () => {
    return {
        type: actions.REFRESH_STATE,
    };
};

const setUser = (username, password) => {
    return {
        type: actions.SET_USER,
        username,
        password,
    };
};

