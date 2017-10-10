import React, { Component } from "react";
import "./App.css";
import Context from "./Context";
import Surface from "./Surface";
import Node from "./Node";
// import Translation from "./Translation";
import Move from "./Move";
import { state, signal } from "cerebral/tags";

import { connect } from "@cerebral/react";

export default connect(
  {
    title: state`title`,
    titleChanged: signal`titleChanged`
  },
  class App extends Component {
    render() {
      let title = (
        <Node width={150} height={150} align="horizontalCenter">
          <Move y={0} x={0} easing="easeOutWall" />
          <Node width={50} height={50} align="horizontalCenter">
            <Surface color="blue">no title</Surface>
          </Node>
        </Node>
      );
      if (this.props.title) {
        title = (
          <Node width={150} height={150} align="horizontalCenter">
            <Move y={50} x={300} easing="easeInOutCubic" />
            <Surface color="red">there is some title</Surface>
          </Node>
        );
      }
      return (
        <Context>
          <Node>
            <Surface color="green" background>
              <button onClick={() => this.props.titleChanged()}>
                click me
              </button>
              hello
            </Surface>
            {title}
          </Node>
        </Context>
      );
    }
  }
);
