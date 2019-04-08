import React from 'react'
import PropTypes from 'prop-types'

export default class Move extends React.Component {
  constructor (props, context) {
    super(props)
    const duration = props.duration || 500
    if (props.easing) {
      this.transition = getTransition(props)
    } else {
      this.transition = { duration }
    }
  }

  componentDidUpdate (prevProps) {
    // const duration = this.props.duration || 500
    // if (this.props.easing) {
    //   this.transition = getTransition(this.props)
    // } else {
    //   this.transition = { duration }
    // }
    // this.props.position.set(
    //   [this.props.x, this.props.y, this.props.z],
    //   this.transition
    // )
  }

  componentDidMount () {
    this.context.view.updateTranslation([
      this.props.x,
      this.props.y,
      this.props.z
    ])
    // this.props.position.set([this.x, this.y, this.z], this.transition)
  }

  componentWillUnmount () {
    this.context.view.updateTranslation([0, 0, 0])
  }

  render () {
    return null
  }
}

Move.contextTypes = {
  view: PropTypes.object,
  namesNodes: PropTypes.array
}

function getTransition (props) {
  const {
    duration = 500,
    easing,
    damping = 0.5,
    velocity = 0,
    drag = 0.1,
    period = 100
  } = props

  switch (easing) {
    case 'spring':
      return { curve: easing, velocity, damping, period }
    case 'inertia':
      return { curve: easing, velocity, drag }
    case 'damp':
      return { curve: easing, damping }
    default:
      return { curve: easing, duration }
  }
}

// export default class OnClick extends React.Component {
//   constructor (props, context) {
//     super(props)
//     context.view.setEventHandler(props.event, props.signal)
//   }

//   getChildContext () {
//     return { parent: this.node }
//   }

//   componentDidUpdate (prevProps) {}

//   componentDidMount () {}

//   componentWillUnmount () {}

//   render () {
//     return null
//   }
// }

// OnClick.childContextTypes = {
//   parent: PropTypes.object
// }

// OnClick.contextTypes = {
//   parent: PropTypes.object,
//   view: PropTypes.object
// }
