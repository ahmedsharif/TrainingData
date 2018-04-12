import React from "react";
import PropTypes from "prop-types";


class Home extends React.Component {
    isPrivate = false;

    componentWillMount = () => {
        const {store} = this.context;
        store.dispatch(refreshState());
    }
}