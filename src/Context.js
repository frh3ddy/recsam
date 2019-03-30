import React from 'react'
import PropTypes from 'prop-types'
const Context = require('samsarajs').DOM.Context

export default class SamsaraContext extends React.Component {
  constructor (props) {
    super(props)
    this.sContext = new Context()
    this.sContext.setPerspective(1000)
    this.sContext.setPerspectiveOrigin(20)
  }

  getChildContext (test) {
    const namesNodes = this.props.nodeName ? [{name: this.props.nodeName, view: this.sContext}] : []
    return { parent: this.sContext, namesNodes }
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
  parent: PropTypes.object,
  namesNodes: PropTypes.array
}
