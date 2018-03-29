import React from "react";
import PropTypes from "prop-types";
import "./results.css"

class Result extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.play(this.props.videoId);
  }

  render() {
    return(
      <div className="result" onClick={this.handleClick}>
        <img
          className="thumbnail"
          src={this.props.imgurl}
          alt={this.props.title}
        />
        <div className="detail">
          <h3 className="title">{this.props.title}</h3>
          <p className="description">{this.props.description}</p>
        </div>
      </div>
    );
  }
}

Result.PropTypes = {
    imgurl : PropTypes.string, 
    title : PropTypes.string,
    description : PropTypes.string
};

export default Result;
