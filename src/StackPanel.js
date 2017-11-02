import React from 'react'
import PropTypes from 'prop-types'
const SequentialLayout = require('samsarajs').Layouts.SequentialLayout
const FlexibleLayout = require('samsarajs').Layouts.FlexibleLayout

const DIRECTION = {
  horizontal: 0,
  vertical: 1
}

export default class StackPanel extends React.Component {
  constructor (props, context) {
    super(props)
    const flex = getFlex(props)
    const method = getMethod(context.parent)

    const orientation = props.orientation || 'horizontal'
    const spacing = props.itemSpacing || 0
    this.node = new SequentialLayout({
      size: [props.width, props.height],
      direction: DIRECTION[orientation],
      spacing
    })

    context.parent[method](this.node, flex)
  }

  getChildContext () {
    return { parent: this.node }
  }

  componentDidUpdate (prevProps) {
    //   this.props.position.set([this.x, this.y, this.z]);
  }

  componentWillUnmount () {
    //   this.props.position.set([0, 0, 0]);
  }

  render () {
    return [this.props.children]
  }
}

StackPanel.childContextTypes = {
  parent: PropTypes.object
}

StackPanel.contextTypes = {
  parent: PropTypes.object,
  view: PropTypes.object
}

function getMethod (parent) {
  switch (true) {
    case parent instanceof SequentialLayout:
      return 'push'
    case parent instanceof FlexibleLayout:
      return 'push'
    default:
      return 'add'
  }
}

function getFlex ({ height, width, minHeight, minWidth }) {
  return isNaN(width || minHeight || minWidth || height) ? 1 : undefined
}
