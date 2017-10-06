import React from "react";
import ReactDOM from 'react-dom'
const Surface = require("samsarajs").DOM.Surface;
const Transform = require("samsarajs").Core.Transform;

export default class SContext extends React.Component {
  constructor(props) {
    super(props);
    this.state = {deploy: false};
    this.testt = 'something'
    this.surface = new Surface({
      size: [this.props.width, this.props.height],
      content: this.refs.surfaceContent,
      properties: {
        background: this.props.color || "white"
      }
    });

    this.surface.on('deploy', target => {
        this.setState({deploy: true})
    })

    if (this.props.background) {
      this.props.parent
        .add({ transform: Transform.translateZ(-1) })
        .add(this.surface);
    } else {
      this.props.parent.add(this.surface);
    }
  }
    componentDidMount() {
        console.log(this.testt)
    //   this.surface = new Surface({
    //     size: [this.props.width, this.props.height],
    //     content: this.refs.surfaceContent,
    //     properties: {
    //       background: this.props.color || "white"
    //     }
    //   });

    //   if (this.props.background) {
    //     this.props.parent
    //       .add({ transform: Transform.translateZ(-1) })
    //       .add(this.surface);
    //   } else {
    //     this.props.parent.add(this.surface);
    //   }
    }

  componentWillUnmount() {
    console.log("djdjdj");
    this.surface.remove()
  }

  render() {
    if(this.state.deploy) {
        return ReactDOM.createPortal(
            this.props.children,
            this.surface._currentTarget,
          );
    }
    return null
  }
}
