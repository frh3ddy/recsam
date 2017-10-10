import React from "react";

export default class Node extends React.Component {
  constructor(props) {
    super(props);
    this.x = props.x || 0;
    this.y = props.y || 0;
    this.z = props.z || 0;
  }

  componentDidUpdate(prevProps) {
    this.props.position.set([this.x, this.y, this.z]);
  }

  componentDidMount() {
    this.props.position.set([this.x, this.y, this.z]);
  }

  componentWillUnmount() {
    this.props.position.set([0, 0, 0]);
  }

  render() {
    return null;
  }
}
