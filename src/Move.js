import React from 'react'

export default class Node extends React.Component {
  constructor (props) {
    super(props)
    this.x = props.x || 0
    this.y = props.y || 0
    this.z = props.z || 0
    const duration = props.duration || 500
    if (props.easing) {
      this.transition = getTransition(props)
    } else {
      this.transition = { duration }
    }
  }

  componentDidUpdate (prevProps) {
    const duration = this.props.duration || 500
    if (this.props.easing) {
      this.transition = getTransition(this.props)
    } else {
      this.transition = { duration }
    }
    this.props.position.set(
      [this.props.x, this.props.y, this.props.z],
      this.transition
    )
  }

  componentDidMount () {
    this.props.position.set([this.x, this.y, this.z], this.transition)
  }

  componentWillUnmount () {
    this.props.position.set([0, 0, 0])
  }

  render () {
    return null
  }
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
