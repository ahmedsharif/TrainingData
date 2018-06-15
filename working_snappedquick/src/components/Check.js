import React, { Component } from "react";

class Check extends Component {
  constructor() {
    super();
    this.state = { color: "black" };

    this.handle = this.handle.bind(this);
  }

  handle = function(status) {
    this.setState({
      color: status
    });
    console.log(this.state);
  };

  render() {
    return <CheckChild color={this.state.color} handle={this.handle} />;
  }
}

class CheckChild extends Component {
  render() {
    return (
      <CheckGrandChild color={this.props.color} handle={this.props.handle} />
    );
  }
}

class CheckGrandChild extends Component {
  render() {
    return (
      <h1
        style={{ color: this.props.color, cursor: "pointer" }}
        onClick={() => {
          this.props.handle("red");
        }}
      >
        Hello
      </h1>
    );
  }
}

export default Check;
