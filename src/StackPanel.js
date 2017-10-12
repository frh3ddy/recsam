import React from 'react'
import PropTypes from 'prop-types'
const SequentialLayout = require('samsarajs').Layouts.SequentialLayout

const DIRECTION = {
  horizontal: 0,
  vertical: 1
}

export default class StackPanel extends React.Component {
  constructor (props, context) {
    super(props)
    const orientation = props.orientation || 'horizontal'
    const spacing = props.itemSpacing || 0
    this.node = new SequentialLayout({
      direction: DIRECTION[orientation],
      spacing
    })

    context.parent.add(this.node)
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
  parent: PropTypes.object
}
