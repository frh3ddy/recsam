import React, { Component } from 'react'
import './App.css'
import Context from './Context'
import OnClick from './OnClick'
import createNamedComponent from './createNamedComponent'
import { state, signal } from 'cerebral/tags'

import { connect } from '@cerebral/react'

const ActionButtons = createNamedComponent('StackPanel')
const Button = createNamedComponent()
const Panel = createNamedComponent()
const Text = createNamedComponent('Surface')
const NavBar = createNamedComponent('StackPanel')
const StackPanel = createNamedComponent('FlexStackPanel')
const Content = createNamedComponent('StackPanel')
const AlbumList = createNamedComponent()
const Albums = createNamedComponent('StackPanel')
const Album = createNamedComponent()
const Line = createNamedComponent()
const Rest = createNamedComponent()

export default connect(
  {
    items: state`items`,
    size: state`size`,
    titleChanged: signal`titleChanged`,
    itemRemoved: signal`removedItem`,
    itemAdded: signal`itemAdded`
  },
  class App extends Component {
    render () {
      const { size, itemAdded, itemRemoved } = this.props
      return (
        <Context>
          <StackPanel orientation='vertical'>
            <Panel height={60} color='yellow'>
              <Panel width={250} color='tomato'>
                <Text alignment='center'>MENU</Text>
              </Panel>
            </Panel>
            <StackPanel>
              <Panel width={200} color='purple'>
                <Panel color='white' height={50} alignment='bottom' />
              </Panel>
              <Panel color='green' />
              <Panel width={250} color='black' />
            </StackPanel>
          </StackPanel>
        </Context>
      )
    }
  }
)

// <ActionButtons itemSpacing={10}>
// <Button width={100} color='#ffad02'>
//   <OnClick signal={itemAdded} />
//   <Text color='red' alignment='center'>ADD</Text>
// </Button>
// <Button width={100} color='#ffad02'>
//   <OnClick signal={itemRemoved} />
//   <Text alignment='center'>REMOVED</Text>
// </Button>
// <Button width={100} color='#ffad02'>
//   <OnClick signal={itemAdded} />
//   <Text alignment='center'>Add</Text>
// </Button>
// </ActionButtons>

// API ideas
// Event Handlers
// <OnClick signnal={someSignal} args={{prop: 'test'}}>
//   <Argument value={someValue}/>
//   <Argument value={someValue}/>
// </OnClick>

// Each UX Helper
// <Each itmesORState='some.state.path'>
//   <template prop propWidthDefaulValue='default'></template>
// </Each>

// MAP UX Helper
// <Map itmesORState='some.state.path'>
//  {items =>
//    items.map((item, key) => <Template someProp={item.someProp} key={key} />)}
// </Map>

// <Node height={50}>
// <Surface>
//   <div
//     style={{
//       height: "100%",
//       display: "flex"
//     }}
//   >
//     <div
//       onClick={() => this.props.removedItem()}
//       style={{
//         cursor: "pointer",
//         width: 100,
//         color: "#3a1f11",
//         background: "#ffad02",
//         height: "100%",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center"
//       }}
//     >
//       REMOVE
//     </div>
//     <div
//       onClick={() => this.props.itemAdded()}
//       style={{
//         cursor: "pointer",
//         width: 100,
//         color: "#3a1f11",
//         background: "#ffad02",
//         height: "100%",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center"
//       }}
//     >
//       ADD
//     </div>
//   </div>
// </Surface>
// <Node height={0.5} align="bottom">
//   <Surface color="black" />
// </Node>
// </Node>
// <Node y={50} width={200} />
// <Node y={50} x={200}>
// <Surface color="#ded6d4" />
// </Node>
// <Node y={50} width={250} align="right">
// <StackPanel orientation="vertical" itemSpacing={20}>
//   {this.props.items.map((item, index) => (
//     <Surface height={100} key={index} color={item.color}>
//       {item.text}
//     </Surface>
//   ))}
// </StackPanel>
// </Node>

// const buttonStyle = {
//   display: 'flex'
// }
