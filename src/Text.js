import React from 'react'
import PropTypes from 'prop-types'
import TextView from './TextView'
const SequentialLayout = require('samsarajs').Layouts.SequentialLayout
const FlexibleLayout = require('samsarajs').Layouts.FlexibleLayout

export default class Text extends React.Component {
  constructor (props, context) {
    super(props)
    let text = ''
    this.renderChildren = this.renderChildren.bind(this)
    const method = getMethod(context.parent)
    const childrenLenght = React.Children.count(props.children)
    if (childrenLenght < 2) {
      text = props.children
    } else {
      React.Children.forEach(props.children, child => {
        if (typeof child === 'string') {
          text = child
        }
      })
    }
    // let text = typeof props.children === 'string' ? props.children : ''
    // const childrenLenght = React.Children.count(props.children)
    // if (text === '' && childrenLenght > 0) {
    //   React.Children.forEach(props.children, child => {
    //     if (typeof child === 'string') {
    //       text = child
    //     }
    //   })
    // }

    // if (text !== undefined && childrenLenght > 1) {
    //   this.renderChildren = React.Children
    //     .toArray(props.children)
    //     .filter(child => typeof child !== 'string')
    // }

    this.surface = new TextView({
      width: props.width,
      height: props.height,
      content: text,
      padding: props.padding,
      background: props.background,
      color: props.color,
      translation: [props.x, props.y, props.z],
      alignment: props.alignment,
      textAlignment: props.textAlignment,
      fontSize: props.fontSize
    })
    context.parent[method](this.surface)
  }

  renderChildren () {
    return React.Children.map(this.props.children, child => {
      if (typeof child === 'string') return null
      return child
    })
  }

  getChildContext () {
    return { view: this.surface }
  }

  componentDidMount () {}

  // componentWillUpate () {
  //   const childrenLenght = React.Children.count(this.props.children)
  //   // console.log('children', this.props.children)
  //   if (childrenLenght > 1) {
  //     this.renderChildren = React.Children.toArray(this.props.children)
  //   }
  // }

  componentDidUpdate (prevProps) {
    this.surface.updateProperties({
      color: this.props.color
    })
  }

  componentWillUnmount () {
    if (getMethod(this.context.parent) === 'push') {
      this.context.parent.unlink(this.surface)
    }
    setTimeout(() => this.surface.remove(), 0)
  }

  render () {
    return [this.renderChildren()]
  }
}

Text.childContextTypes = {
  view: PropTypes.object
}

Text.contextTypes = {
  parent: PropTypes.object
}

// Text.propTypes = {
//   children: PropTypes.string
// }

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
