import React from "react";
const Transitionable = require('samsarajs').Core.Transitionable

export default class SContext extends React.Component {
  constructor(props) {
    super(props);
    this.renderChildren = this.renderChildren.bind(this);
    // if(props.align) {
    //     switch
    // }

    this.size = new Transitionable([props.width, props.height])

    const options = {
      size: this.size,
      ...alignment(props.align)
    };
    this.node = props.parent.add(options);
  }

  componentDidUpdate(prevProps) {
      if(prevProps.width) {
        this.size.set([this.props.width, this.props.height])
      }
    //   const width = this.props.width || 
  }

  // componentDidMount() {
  //     this.sContext.mount(this.refs.rootContext)
  // }

  renderChildren() {
    const parent = this.node;
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        parent
      });
    });
  }

  render() {
    return [this.renderChildren()];
  }
}

function alignment(align) {
  if (align === undefined) return {};

  switch (align) {
    case "center":
      return { align: [0.5, 0.5], origin: [0.5, 0.5] };
    case "centerLeft":
      return { align: [0, 0.5], origin: [0, 0.5] };
    case "centerRight":
      return { align: [1, 0.5], origin: [1, 0.5] };
    case "horizontalCenter":
      return { align: [0.5, 0], origin: [0.5, 0] };
    default:
      return {};
  }
}
