import React from 'react'
import Panel from './Panel'

import StackPanel from './StackPanel'
import FlexStackPanel from './FlexStackPanel'
import Surface from './Surface'

const component = {
  StackPanel,
  Surface,
  FlexStackPanel
}

export default type => props => {
  if (type) {
    const Component = component[type]
    return (
      <Component {...props}>
        {props.children}
      </Component>
    )
  }

  return (
    <Panel {...props}>
      {props.children}
    </Panel>
  )
}
