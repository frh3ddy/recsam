import React from 'react'
import PropTypes from 'prop-types'

export default class Change extends React.Component {
  constructor (props, context) {
    super(props)
    const duration = props.duration || 0

    this.delay = props.delay || 0

    if (props.easing) {
      this.transition = getTransition(props)
    } else {
      this.transition = { duration }
    }
  }

  shouldComponentUpdate(nextProps) {
    let shouldUpdate = false
    for(let key in this.props) {
      if(this.props[key] !== nextProps[key]) {
        shouldUpdate = true
        break
      }
    }

    return shouldUpdate
  }

  componentDidUpdate (prevProps) {
    const { updateMethod, payload } = getMethod(this.props)
    if (updateMethod === 'noop') return
    setTimeout(() => {
      this.context.view[updateMethod](
      payload,
      this.transition,
      this.props.callback
    )
    }, this.delay)
  }

  componentDidMount () {
    const { updateMethod, payload } = getMethod(this.props)
    if (updateMethod === 'noop') return
    setTimeout(() => {
      this.context.view[updateMethod](
      payload,
      this.transition,
      this.props.callback
    )
    }, this.delay)
  }

  componentWillUnmount () {
    const props = { ...this.props }
    let transition

    const { updateMethod } = getMethod(props)
    if (updateMethod === 'noop') return

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
      updateOpacity: this.context.view.cachedOpacity || 1,
      updateRotation: [0, 0, 0, 0],
      updateScale: [1,1,1, 0, 0],
      updateTranslation: this.context.view.cachedTranslation || [0, 0, 0]
    }

    this.context.view[updateMethod](defaults[updateMethod], transition)
  }

  render () {
    return null
  }
}

Change.contextTypes = {
  view: PropTypes.object,
}

function getMethod ({
  x,
  y,
  z,
  degrees,
  degreesX,
  degreesY,
  degreesZ,
  opacity,
  scaleX,
  scaleY,
  scaleZ,
  aboutOrigin = [0, 0]
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
    case isAtLeastOneDefined([scaleX, scaleY, scaleZ]):
      return {
        updateMethod: 'updateScale',
        payload: [scaleX, scaleY, scaleZ, aboutOrigin[0], aboutOrigin[1]]
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
    duration = 0,
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