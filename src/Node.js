import React from "react";
const Transitionable = require("samsarajs").Core.Transitionable;
const Transform = require("samsarajs").Core.Transform;

export default class Node extends React.Component {
  constructor(props) {
    super(props);
    this.renderChildren = this.renderChildren.bind(this);
    // if(props.align) {
    //     switch
    // }
    const xPos = props.x || 0;
    const yPos = props.y || 0;
    const zPos = props.z || 0;
    this.position = new Transitionable([xPos, yPos, zPos]);
    const transform = this.position.map(value => Transform.translate(value));
    this.size = new Transitionable([props.width, props.height]);

    const options = {
      size: this.size,
      transform,
      ...alignment(props.align)
    };
    this.node = props.parent.add(options);
  }

  componentDidUpdate(prevProps) {
    const xPos = this.props.x || 0;
    const yPos = this.props.y || 0;
    const zPos = this.props.z || 0;
    // console.log(this.node._cachedSpec.size[0] * 50 / 100);
    if (this.props.animateSize) {
      this.size.set(
        [this.props.width, this.props.height],
        this.props.animateSize
      );
    } else {
      this.size.set([this.props.width, this.props.height]);
    }

    if (this.props.animatePosition) {
      this.position.set([xPos, yPos, zPos], this.props.animatePosition);
    } else {
      if (this.props.x) this.position.set([xPos, yPos, zPos]);
    }
  }

  componentWillUnmount() {
    setTimeout(() => this.node.remove(), 0);
  }

  renderChildren() {
    const parent = this.node;
    const position = this.position;
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        parent,
        position
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
