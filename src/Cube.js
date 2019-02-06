import React from 'react'
import Panel from './Panel'
import Text from './Text'
import Change from './Change'
import Set from './Set'
import WhileTrue from './WhileTrue'
import WhileFalse from './WhileFalse'
import { state, signal } from 'cerebral/tags'
import { connect } from '@cerebral/react'

export default connect(
  {
    active: state`activeCube`,
    transitioning: state`transitioning`,
    transitionEnded: signal`transitionEnded`
  },
  class Cube extends React.Component{

    constructor() {
      super()
      this.w = window.innerWidth
      this.h = window.innerHeight

      const cubeSize =  this.w > this.h ? this.h : this.w

      this.state = {
        size: cubeSize
      }
    }

    // updateState(size) {
    //   this.setState({size: 300})
    // }

    componentDidMount() {
      // setTimeout(() => {
      //   this.setState({size: 300})
      // }, 3000)
    }

    render() {
      const [
        front = null,
        left = null,
        right = null,
        back = null,
        top = null,
        bottom = null
      ] = React.Children.toArray(this.props.children)

      let degrees = getTransform(this.props.active)

      return (
        <Panel subscribeTo={this.props.subscribeTo}  alignment='center' z={-(this.state.size / 2)} height={this.state.size} width={this.state.size}>
          <Change
            easing='easeInOutCubic'
            duration={800}
            {...degrees}
            callback={() => this.props.transitionEnded()}
          />
          <WhileTrue value={this.props.transitioning}>
            <Change easing='easeInOutCubic' z={-this.state.size * 2} duration={350} />
          </WhileTrue>

          <Panel x={this.state.size} z={-(this.state.size / 2)}>
            {back}
            <Set degreesY={-180} duration={1} />
          </Panel>
          <Panel z={-(this.state.size / 2)}>
            {top}
            <Set degreesX={90} duration={1} />
          </Panel>
          <Panel z={this.state.size / 2} y={this.state.size}>
            {bottom}
            <Set degreesX={270} duration={1} />
          </Panel>
          <Panel z={this.state.size / 2} x={this.state.size}>
            {right}
            <Set degreesX={360} degreesY={90} duration={1} />
          </Panel>
          <Panel z={this.state.size / 2}>
            {front}
          </Panel>
          <Panel z={-(this.state.size / 2)}>
            {left}
            <Set degreesX={360} degreesY={270} duration={1} />
          </Panel>
        </Panel>
      )
    }
  }
)

function getTransform (active) {
  if (active === 'About') {
    return { degreesY: 90 }
  }

  if (active === 'Portfolio') {
    return { degreesY: -90 }
  }

  if (active === 'Services') {
    return { degreesY: 180 }
  }

  if (active === 'Blog') {
    return { degreesX: 90 }
  }

  if (active === 'Contact') {
    return { degreesX: -90 }
  }

  return { degreesX: 0 }
}
