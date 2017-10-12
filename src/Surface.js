import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
const Surface = require('samsarajs').DOM.Surface
const SequentialLayout = require('samsarajs').Layouts.SequentialLayout
// const Transform = require('samsarajs').Core.Transform

export default class SSurface extends React.Component {
  constructor (props, context) {
    super(props)
    let method = 'add'
    this.state = { deploy: false, hasError: false }
    this.surface = new Surface()

    // this.surface.on('deploy', target => {
    //   setTimeout(() => this.setState({ deploy: true }), 0)
    // })

    if (context.parent instanceof SequentialLayout) {
      method = 'push'
    }

    context.parent[method](this.surface)
  }

  componentDidMount () {
    // setTimeout Temporary Fix to allow the layout to be calculated
    // before the content is dislayed in the wrong place
    // its only for few milliseoncons but noticeable
    setTimeout(() => this.setState({ deploy: true }), 10)
  }

  componentDidUpdate (prevProps) {
    this.surface.setOptions({
      size: [this.props.width, this.props.height],
      properties: {
        background: this.props.color || 'rgba(255,255,255,0)'
      }
    })
  }

  componentWillUnmount () {
    if (this.context.parent instanceof SequentialLayout) {
      this.context.parent.unlink(this.surface)
    }
    setTimeout(() => this.surface.remove(), 0)
  }

  render () {
    if (this.state.deploy) {
      return ReactDOM.createPortal(
        this.props.children,
        this.surface._currentTarget
      )
    }
    return null
  }
}

SSurface.contextTypes = {
  parent: PropTypes.object
}
