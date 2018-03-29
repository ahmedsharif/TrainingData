import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import PropTypes from "prop-types";
import { Route, Link } from "react-router-dom";
import * as youtube from "./youtubeapi.js";
import Search from "./searchpage.js";
import MediaPlayer from "./MediaPlayer.js";
import Result from "./results.js";

registerServiceWorker();

class Main extends Component {
  constructor() {
    super();
    this.searchVideo = this.searchVideo.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.state = {
      videoPlayFlag: false,
      videoId: "",
      results: []
    };
  }

  playVideo(videoId) {
    this.setState({
      videoPlayFlag: true,
      videoId
    });
  }

  componentDidMount() {
    this.searchVideo("");
  }

  searchVideo(query) {
    youtube.search(jsonData => {
      this.setState({
        results: jsonData.items
      });
    }, query);
  }

  render() {
    return (
      <div className="Main">
        <Route
          path="/"
          render={() => (
            <div className="App-header">
              <Search searchHandler={this.searchVideo} />
            </div>
          )}
        />
        <Route
          exact
          path="/video"
          render={() =>
            this.state.videoPlayFlag && (
              <div className="player-container">
                <MediaPlayer videoId={this.state.videoId} />
              </div>
            )
          }
        />

        <Route
          exact
          path="/search"
          render={() => (
            <div className="result-container">
              {this.state.results.length !== 0 ? (
                this.state.results.map(item => (
                  <Link key={item.etag} to="/video">
                    <Result
                      imgurl={item.snippet.thumbnails.medium.url}
                      title={item.snippet.title}
                      description={item.snippet.description}
                      videoId={item.id.videoId}
                      play={this.playVideo}
                    />
                  </Link>
                ))
              ) : (
                <h1> Sorry, There are no results to display </h1>
              )}
            </div>
          )}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <BrowserRouter>
    <Main />
  </BrowserRouter>,
  document.getElementById("root")
);

export default Main;
