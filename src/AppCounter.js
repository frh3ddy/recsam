import React, { Component } from 'react'
import './App.css'
import Context from './Context'
import createNamedComponent from './createNamedComponent'
import Text from './Text'
import Image from './Image'
import WhileTrue from './WhileTrue'
import Change from './Change'
import Set from './Set'

//Components
import Counter from './babyShowerComponents/counter'

const Panel = createNamedComponent()
const StackPanel = createNamedComponent('FlexStackPanel')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <Context>
      <Counter/>
    </Context>
  }
}

export default App















