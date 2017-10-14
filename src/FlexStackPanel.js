import React from 'react'
import PropTypes from 'prop-types'
const FlexibleLayout = require('samsarajs').Layouts.FlexibleLayout
const SequentialLayout = require('samsarajs').Layouts.SequentialLayout

const DIRECTION = {
  horizontal: 0,
  vertical: 1
}

export default class FlexStackPanel extends React.Component {
  constructor (props, context) {
    super(props)
    const flex = props.height || props.width ? undefined : 1
    const method = getMethod(context.parent)
    const orientation = props.orientation || 'horizontal'
    const spacing = props.itemSpacing || 0
    this.node = new FlexibleLayout({
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

FlexStackPanel.childContextTypes = {
  parent: PropTypes.object
}

FlexStackPanel.contextTypes = {
  parent: PropTypes.object
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
