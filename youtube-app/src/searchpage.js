import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./searchpage.css";

class Search extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      query: ""
    };
  }

  static propTypes = {
    searchHandler: PropTypes.func
  };

  handleChange(query) {
    this.setState({
      query
    });
  }

  handleSubmit(query) {
    this.props.searchHandler(this.state.query);
  }

  render() {
    return (
      <div className="search-container">
        <form id="search-form" className="search-form">
          <Route
            exact
            path="/video"
            render={() => (
              <Link to="/search">
                <button className="search-button">Go Back</button>
              </Link>
            )}
          />
          <input
            onChange={query => this.handleChange(query.target.value)}
            className="search-input"
            placeholder="search...."
            type="text"
          />
          <Link to="/search">
            <button
              type="submit"
              onClick={this.handleSubmit}
              className="search-button"
            >
              Search
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

export default Search;


