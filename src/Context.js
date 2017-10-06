import React from "react";
const Context = require("samsarajs").DOM.Context;

export default class SContext extends React.Component {
  constructor(props) {
    super(props);
    this.sContext = new Context();
    this.renderChildren = this.renderChildren.bind(this);
  }

  componentDidMount() {
    this.sContext.mount(this.refs.rootContext);
  }

  renderChildren() {
    const parent = this.sContext;
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        parent
      });
    });
  }

  render() {
    return (
      <div ref="rootContext">
        {this.renderChildren()}
      </div>
    );
  }
}
