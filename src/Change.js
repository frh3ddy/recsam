import React from 'react'
import PropTypes from 'prop-types'

export default class Change extends React.Component {
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
    const { updateMethod, payload } = getMethod(this.props)
    if (updateMethod === 'noop') return
    this.context.view[updateMethod](
      payload,
      this.transition,
      this.props.callback
    )
  }

  componentDidMount () {
    // const { opacity, rotation, translation } = this.props
    const { updateMethod, payload } = getMethod(this.props)
    if (updateMethod === 'noop') return
    this.context.view[updateMethod](
      payload,
      this.transition,
      this.props.callback
    )
  }

  componentWillUnmount () {
    const props = { ...this.props }
    let transition
    const { updateMethod } = getMethod(props)
    if (updateMethod === 'noop') return
    const duration = props.durationBack || props.duration || 500
    if (props.easingBack) {
      props.easing = props.easingBack
      if (props.durationBack) {
        props.duration = props.durationBack
      }
      transition = getTransition(props)
    } else {
      transition = getTransition(props)
    }

    const defaults = {
      updateOpacity: this.context.view.cachedOpacity || 0,
      updateRotation: [0, 0, 0, 0],
      updateTranslation: this.context.view.cachedTranslation || [0, 0, 0]
    }
    this.context.view[updateMethod](defaults[updateMethod], transition)
  }

  render () {
    return null
  }
}

Change.contextTypes = {
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