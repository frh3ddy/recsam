import React from 'react'
import PropTypes from 'prop-types'
const Context = require('samsarajs').DOM.Context

export default class SamsaraContext extends React.Component {
  constructor (props) {
    super(props)
    this.sContext = new Context()
  }

  getChildContext () {
    return { parent: this.sContext }
  }

  componentDidMount () {
    this.sContext.mount(this.refs.rootContext)
  }

  render () {
    return (
      <div ref='rootContext'>
        {this.props.children}
      </div>
    )
  }
}

SamsaraContext.childContextTypes = {
  parent: PropTypes.object
}
