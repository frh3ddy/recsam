import React, { Component } from 'react'
import './App.css'
import Context from './Context'
import OnClick from './OnClick'
import createNamedComponent from './createNamedComponent'
import { state, signal } from 'cerebral/tags'

import { connect } from '@cerebral/react'

const ActionButtons = createNamedComponent('StackPanel')
const Button = createNamedComponent()
const Text = createNamedComponent('Surface')
const NavBar = createNamedComponent()
const AlbumList = createNamedComponent()
const Albums = createNamedComponent('StackPanel')
const Album = createNamedComponent('Surface')

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
          <NavBar height={60}>
            <ActionButtons itemSpacing={10}>
              <Button width={100} color='#ffad02'>
                <OnClick signal={itemAdded} />
                <Text>ADD</Text>
              </Button>
              <Button width={100} color='#ffad02'>
                <OnClick signal={itemRemoved} />
                <Text>REMOVED</Text>
              </Button>
              <Button width={100} color='#ffad02'>
                <OnClick signal={itemAdded} />
                <Text>Add</Text>
              </Button>
            </ActionButtons>
          </NavBar>
          <AlbumList width={size.width} height={size.height} y={60} x={400}>
            <Albums orientation='vertical' itemSpacing={10}>
              {this.props.items.map(({ color, text }, index) => (
                <Album height={100} color={color} key={index}>
                  {text}
                </Album>
              ))}
            </Albums>
          </AlbumList>
        </Context>
      )
    }
  }
)

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
