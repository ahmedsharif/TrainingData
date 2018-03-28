import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";
import SearchForm from "./SearchForm.js";
import Result from "./Result.js";
import VideoPlayer from "./VideoPlayer.js";

import * as youtube from "./youtubeapi.js";

class App extends Component {
  constructor() {
    super();
    this.searchYoutube = this.searchYoutube.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.state = {
      playVid: false,
      vidId: "",
      results: []
    };
  }

  playVideo(vidId) {
    this.setState({
      playVid: true,
      vidId
    });
  }

  componentDidMount() {
    this.searchYoutube("");
  }

  searchYoutube(query) {
    youtube.search(jsonData => {
      this.setState({
        results: jsonData.items
      });
    }, query);
  }

  render() {
    return (
      <div className="App">
        <Route
          path="/"
          render={() => (
            <div className="App-header">
              <SearchForm searchHandler={this.searchYoutube} />
            </div>
          )}
        />

        <Route
          exact
          path="/video"
          render={() =>
            this.state.playVid && (
              <div className="player-container">
                <VideoPlayer vidId={this.state.vidId} />
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
                      vidId={item.id.videoId}
                      play={this.playVideo}
                    />
                  </Link>
                ))
              ) : (
                <h1>Sorry, There are no results to display</h1>
              )}
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
