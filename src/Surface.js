import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import ViewSuface from './ViewSurface'
const SequentialLayout = require('samsarajs').Layouts.SequentialLayout
const FlexibleLayout = require('samsarajs').Layouts.FlexibleLayout

export default class SSurface extends React.Component {
  constructor (props, context) {
    super(props)
    const method = getMethod(context.parent)
    this.state = { deploy: false, hasError: false }
    this.surface = new ViewSuface({
      textColor: props.textColor,
      color: props.color
    })
    this.fragment = document.createElement('div')
    this.fragment.setAttribute('style', 'width:100%; height: 100%; opacity: 0')

    context.parent[method](this.surface)
  }

  componentDidMount () {
    // setTimeout Temporary Fix to allow the layout to be calculated
    // before the content is dislayed in the wrong place
    // its only for few milliseoncons but noticeable
    this.surface.setContent(this.fragment)
    setTimeout(() => this.setState({ deploy: true }), 0)
  }

  componentDidUpdate (prevProps) {
    this.surface.setContent(this.fragment)
    if (this.props.alignment) {
      this.surface.setAlignment(this.props.alignment)
    } else {
      this.surface.resize([this.props.width, this.props.height])
    }
    if (this.props.color) this.surface.setColor(this.props.color)
    // this.surface.setContent(this.fragment)
    setTimeout(
      () =>
        this.fragment.setAttribute(
          'style',
          'width:100%; height: 100%; opacity: 1'
        ),
      0
    )
  }

  componentWillUnmount () {
    if (getMethod(this.context.parent) === 'push') {
      this.context.parent.unlink(this.surface)
    }
    setTimeout(() => this.surface.remove(), 0)
  }

  render () {
    return ReactDOM.createPortal(this.props.children, this.fragment)
  }
}

SSurface.contextTypes = {
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
