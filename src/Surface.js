import React from "react";
import ReactDOM from 'react-dom'
const Surface = require("samsarajs").DOM.Surface;
const Transform = require("samsarajs").Core.Transform;

export default class SSurface extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deploy: false, hasError: false };
    this.surface = new Surface({
      size: [props.width, props.height],
      properties: {
        background: this.props.color || "white"
      }
    })

    this.surface.on('deploy', target => {
      setTimeout(() => this.setState({ deploy: true }), 0)
    })

    if (props.background) {
      props.parent
        .add({ transform: Transform.translateZ(-1) })
        .add(this.surface);
    } else {
      props.parent.add(this.surface);
    }
  }

  componentWillUnmount() {
    setTimeout(() => this.surface.remove(), 0)
  }

  render() {
    if (this.state.deploy) {
      return ReactDOM.createPortal(
        this.props.children,
        this.surface._currentTarget,
      )
    }
    return null
  }
}
