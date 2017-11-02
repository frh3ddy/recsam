import React from 'react'
import PropTypes from 'prop-types'

export default class Set extends React.Component {
  constructor (props) {
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
    // const { opacity, rotation, translation } = this.props
    const { updateMethod, payload } = getMethod(this.props)
    if (updateMethod === 'noop') return
    this.context.view[updateMethod](payload, this.transition, true)

    // if (rotation) {
    //   this.context.view.updateOpacity(this.props.opacity)
    //   return
    // }

    // if (opacity) {
    //   this.context.view.updateOpacity(this.props.opacity)
    //   return
    // }
    // this.context.view.updateOpacity(this.props.opacity)
    // this.props.position.set([this.x, this.y, this.z], this.transition)
  }

  componentWillUnmount () {}

  render () {
    return null
  }
}

Set.contextTypes = {
  view: PropTypes.object
}

function getMethod ({
  x,
  y,
  z,
  degrees,
  degreesX,
  degreesY,
  degreesZ,
  opacity
}) {
  switch (true) {
    case opacity !== undefined:
      return { updateMethod: 'updateOpacity', payload: opacity }
    case isAtLeastOneDefined([degrees, degreesX, degreesY, degreesZ]):
      return {
        updateMethod: 'updateRotation',
        payload: [degrees, degreesX, degreesY, degreesZ]
      }
    case isAtLeastOneDefined([x, y, z]):
      return {
        updateMethod: 'updateTranslation',
        payload: [x, y, z]
      }
    default:
      return { updateMethod: 'noop' }
  }
}

function isAtLeastOneDefined (args) {
  return args.some(arg => arg !== undefined)
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
