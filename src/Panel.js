import React from 'react'
import PropTypes from 'prop-types'
import ViewNode from './ViewNode'
import deepEqual from 'deep-equal'
const SequentialLayout = require('samsarajs').Layouts.SequentialLayout

export default class Panel extends React.Component {
  constructor (props, context) {
    super(props)
    let method = 'add'

    if (context.parent instanceof SequentialLayout) {
      method = 'push'
    }

    this.node = new ViewNode({
      color: props.color,
      size: [props.width, props.height]
    })

    this.node.setTranslation([props.x, props.y, props.z])
    context.parent[method](this.node)
  }

  getChildContext () {
    return { parent: this.node }
  }

  componentDidUpdate (prevProps) {
    const props = { ...this.props }
    const oldProps = { ...prevProps }
    if (!props.children || !props.children.length) {
      delete props.children
    }
    if (!oldProps.children || !oldProps.children.length) {
      delete oldProps.children
    }

    if (deepEqual(oldProps, props)) return
    // console.log(this.node._cachedSpec.size[0] * 50 / 100);
    this.node.setTranslation([this.props.x, this.props.y, this.props.z])
    this.node.setSize([this.props.width, this.props.height])
  }

  componentWillUnmount () {
    setTimeout(() => this.node.remove(), 0)
  }

  render () {
    return [this.props.children]
  }
}

Panel.childContextTypes = {
  parent: PropTypes.object
}

Panel.contextTypes = {
  parent: PropTypes.object
}

// import React from "react";
// const Transitionable = require("samsarajs").Core.Transitionable;
// const SequentialLayout = require("samsarajs").Layouts.SequentialLayout;
// const Transform = require("samsarajs").Core.Transform;
// import ViewNode from './ViewNode'

// export default class Node extends React.Component {
//   constructor(props) {
//     super(props);
//     this.renderChildren = this.renderChildren.bind(this);
//     // if(props.align) {
//     //     switch
//     // }
//     const xPos = props.x || 0;
//     const yPos = props.y || 0;
//     const zPos = props.z || 0;
//     this.position = new Transitionable([xPos, yPos, zPos]);
//     const transform = this.position.map(value => Transform.translate(value));
//     this.size = new Transitionable([props.width, props.height]);

//     const options = {
//       size: this.size,
//       transform,
//       ...alignment(props.align)
//     };
//     this.node = props.parent.add(options);

//     if (props.parent instanceof SequentialLayout) {
//       console.log("yes instance");
//     }
//   }

//   componentDidUpdate(prevProps) {
//     const xPos = this.props.x || 0;
//     const yPos = this.props.y || 0;
//     const zPos = this.props.z || 0;
//     // console.log(this.node._cachedSpec.size[0] * 50 / 100);
//     if (this.props.animateSize) {
//       this.size.set(
//         [this.props.width, this.props.height],
//         this.props.animateSize
//       );
//     } else {
//       this.size.set([this.props.width, this.props.height]);
//     }

//     if (this.props.animatePosition) {
//       this.position.set([xPos, yPos, zPos], this.props.animatePosition);
//     } else {
//       if (this.props.x) this.position.set([xPos, yPos, zPos]);
//     }
//   }

//   componentWillUnmount() {
//     setTimeout(() => this.node.remove(), 0);
//   }

//   renderChildren() {
//     const parent = this.node;
//     const position = this.position;
//     return React.Children.map(this.props.children, child => {
//       return React.cloneElement(child, {
//         parent,
//         position
//       });
//     });
//   }

//   render() {
//     return [this.renderChildren()];
//   }
// }

// function alignment(align) {
//   if (align === undefined) return {};

//   switch (align) {
//     case "center":
//       return { align: [0.5, 0.5], origin: [0.5, 0.5] };
//     case "centerLeft":
//       return { align: [0, 0.5], origin: [0, 0.5] };
//     case "centerRight":
//       return { align: [1, 0.5], origin: [1, 0.5] };
//     case "horizontalCenter":
//       return { align: [0.5, 0], origin: [0.5, 0] };
//     case "right":
//       return { align: [1, 0], origin: [1, 0] };
//     case "bottom":
//       return { align: [0, 1], origin: [0, 1] };
//     default:
//       return {};
//   }
// }
