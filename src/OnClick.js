import React from 'react'
import PropTypes from 'prop-types'

export default class OnClick extends React.Component {
  constructor (props, context) {
    super(props)
    context.parent.setClickHandler(props.signal)
  }

  getChildContext () {
    return { parent: this.node }
  }

  componentDidUpdate (prevProps) {}

  componentDidMount () {}

  componentWillUnmount () {}

  render () {
    return null
  }
}

OnClick.childContextTypes = {
  parent: PropTypes.object
}

OnClick.contextTypes = {
  parent: PropTypes.object
}
