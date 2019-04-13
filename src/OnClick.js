import React from 'react'
import PropTypes from 'prop-types'

export default class OnClick extends React.Component {
  constructor (props, context) {
    super(props)
    context.view.setEventHandler(props.event, props.signal)
  }

  getChildContext () {
    return { parent: this.node }
  }

  componentDidUpdate (prevProps) {}

  componentDidMount () {}

  componentWillUnmount () {
    this.context.view.removeEventHandler(this.props.event, this.props.signal)
  }

  render () {
    return null
  }
}

OnClick.childContextTypes = {
  parent: PropTypes.object
}

OnClick.contextTypes = {
  parent: PropTypes.object,
  view: PropTypes.object
}
