import React, { Component } from "react";
import "./App.css";
import Context from "./Context";
import Surface from "./Surface";
import Node from "./Node";
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
          <Surface color="white">no title</Surface>
          <Surface color="white">no title</Surface>
        </Node>
      );
      if (this.props.title) {
        title = (
          <Node width={150} height={150} align="horizontalCenter">
            <Surface color="red">there is some title</Surface>
          </Node>
        );
      }
      return (
        <Context>
          <Node>
            <Surface color="green" background>
              <button onClick={() => this.props.titleChanged()}>
                click me{" "}
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
