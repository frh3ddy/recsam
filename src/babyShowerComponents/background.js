import React from 'react'
import createNamedComponent from '../createNamedComponent'
const Panel = createNamedComponent()
const StackPanel = createNamedComponent('FlexStackPanel')

const Background = () => ( <StackPanel>
            <Panel color='#fe9bcd' cornerRadius='50px 0 0 50px'/>
            <Panel color='#fec8ee'/>
            <Panel color='#fe9bcd'/>
            <Panel color='#fec8ee'/>
            <Panel color='#fe9bcd'/>
            <Panel color='#fec8ee'/>
            <Panel color='#fe9bcd'/>
            <Panel color='#fec8ee'/>
            <Panel color='#fe9bcd'/>
            <Panel color='#fec8ee'/>
            <Panel color='#fe9bcd'/>
            <Panel color='#fec8ee'/>
            <Panel color='#fe9bcd'/>
            <Panel color='#fec8ee'/>
            <Panel color='#fe9bcd'/>
            <Panel color='#fec8ee'/>
            <Panel color='#fe9bcd'/>
            <Panel color='#fec8ee'/>
            <Panel color='#fe9bcd'/>
            <Panel color='#fec8ee'/>
            <Panel color='#fe9bcd'/>
            <Panel color='#fec8ee'/>
            <Panel color='#fe9bcd'/>
            <Panel color='#fec8ee' cornerRadius='0 50px 50px 0'/>
          </StackPanel>
  )

export default Background
