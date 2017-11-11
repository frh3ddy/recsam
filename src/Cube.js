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
  ({ active, size, children, transitioning, transitionEnded }) => {
    const [
      front = null,
      left = null,
      right = null,
      back = null,
      top = null,
      bottom = null
    ] = React.Children.toArray(children)
    let degrees = getTransform(active)
    return (
      <Panel alignment='center' z={-(size / 2)} height={size} width={size}>
        <Change
          easing='easeInOutCubic'
          duration={800}
          {...degrees}
          callback={() => transitionEnded()}
        />
        <WhileTrue value={transitioning}>
          <Change easing='easeInOutCubic' z={-size * 2} duration={350} />
        </WhileTrue>
        <Panel x={size} z={-(size / 2)}>
          {back}
          <Set degreesY={-180} duration={1} />
        </Panel>
        <Panel z={-(size / 2)}>
          {top}
          <Set degreesX={90} duration={1} />
        </Panel>
        <Panel z={size / 2} y={size}>
          {bottom}
          <Set degreesX={90} degreesX={270} duration={1} />
        </Panel>
        <Panel z={size / 2} x={size}>
          {right}
          <Set degreesX={360} degreesY={90} duration={1} />
        </Panel>
        <Panel z={size / 2}>
          {front}
        </Panel>
        <Panel z={-(size / 2)}>
          {left}
          <Set degreesX={360} degreesY={270} duration={1} />
        </Panel>
      </Panel>
    )
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
