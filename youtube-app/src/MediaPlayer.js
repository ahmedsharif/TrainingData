import React,{Component} from "react";
import PropTypes from "prop-types";
import "./MediaPlayer.css"; 


class MediaPlayer extends Component {

  static propTypes = {
    videoId: PropTypes.string
  }
  render() {
    return (
      <iframe
        title="mediaplayer"
        className="player"
        src={
          "https://www.youtube.com/embed/" + this.props.videoId + "?autoplay=1"
        }
        frameBorder="0"
        allowFullScreen
      />
    );
  }
}

export default MediaPlayer;

