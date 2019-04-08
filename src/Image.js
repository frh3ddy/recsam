import React from 'react'
import PropTypes from 'prop-types'
import ImageView from './ImageView'
const SequentialLayout = require('samsarajs').Layouts.SequentialLayout
const FlexibleLayout = require('samsarajs').Layouts.FlexibleLayout

export default class Image extends React.Component {
  constructor (props, context) {
    super(props)
    const method = getMethod(context.parent)
    this.surface = new ImageView({
      _opacity: props.opacity,
      width: props.width,
      height: props.height,
      file: props.file,
      padding: props.padding,
      color: props.color,
      translation: [props.x, props.y, props.z],
      alignment: props.alignment,
      contentAlignment: props.contentAlignment
    })
    context.parent[method](this.surface)
  }

  getChildContext () {
    return { view: this.surface }
  }

  componentDidMount () {}

  componentDidUpdate (prevProps) {
    // this.surface.updateTranslation([this.props.x, this.props.y, this.props.z])
    if(this.props.opacity !== prevProps.opacity){
      this.surface.updateOpacity()
    }
  }

  componentWillUnmount () {
    if (getMethod(this.context.parent) === 'push') {
      this.context.parent.unlink(this.surface)
    }
    setTimeout(() => this.surface.remove(), 0)
  }

  render () {
    return [this.props.children]
  }
}

Image.childContextTypes = {
  view: PropTypes.object
}

Image.contextTypes = {
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
