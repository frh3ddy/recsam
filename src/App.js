import React, { Component } from 'react'
import './App.css'
import Context from './Context'
import OnClick from './OnClick'
import createNamedComponent from './createNamedComponent'
import { state, signal } from 'cerebral/tags'
import heart from './images/heart.svg'
import share from './images/share-2.svg'
import bookmark from './images/bookmarking.svg'
import { connect } from '@cerebral/react'
import NewText from './Text'

const ActionButtons = createNamedComponent('StackPanel')
const Button = createNamedComponent()
const Logo = createNamedComponent()
const Panel = createNamedComponent()
const SearchBar = createNamedComponent()
const Text = createNamedComponent('Surface')
const Surface = createNamedComponent('Surface')
const NavBar = createNamedComponent('StackPanel')
const FlexStackPanel = createNamedComponent('FlexStackPanel')
const StackPanel = createNamedComponent('StackPanel')
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
          <FlexStackPanel orientation='vertical'>
            <FlexStackPanel height={60}>
              <Logo width={120} color='#ffad02'>
                <Text alignment='center' textColor='#3e1b0a'>CINEPLEX</Text>
              </Logo>
              <Button width={120}>
                <Text alignment='center'>Movies</Text>
              </Button>
              <Button width={120}>
                <Text alignment='center'>TV Shows</Text>
              </Button>
              <Button width={120}>
                <Text alignment='center'>News</Text>
              </Button>
              <SearchBar flex={1}>
                <Surface>
                  <input
                    placeholder='Search title'
                    style={{
                      padding: '0 10px',
                      fontSize: 22,
                      height: '100%',
                      width: '100%'
                    }}
                  />
                </Surface>
              </SearchBar>
              <Panel width={120}>
                <Text alignment='center'>Profile</Text>
              </Panel>
            </FlexStackPanel>
            <Panel color='black' height={0.5} />
            <FlexStackPanel flex={1}>
              <FlexStackPanel width={200} orientation='vertical'>
                <FlexStackPanel orientation='vertical' flex={1}>
                  <Panel height={260}>
                    <Panel margin='25 40 25 40' color='#282223' />
                  </Panel>
                  <Panel alignment='horizontalCenter' width={150} height={60}>
                    <Surface height>
                      <h2 style={{ margin: 0 }}>The Martian</h2>
                      <span style={{ color: '#ffad02', fontSize: 12 }}>
                        The Martian
                      </span>
                    </Surface>
                  </Panel>
                  <Panel width={150} height={70} alignment='horizontalCenter'>
                    <Surface>
                      <h6 style={{ margin: '0 0 5px', color: '#bbb' }}>
                        category
                      </h6>
                      <div style={{ marginTop: 10, display: 'flex' }}>
                        <div
                          style={{
                            marginRight: 10,
                            padding: 5,
                            fontSize: 12,
                            border: '1px solid #c3c3c3'
                          }}
                        >
                          Adventure
                        </div>
                        <div
                          style={{
                            marginRight: 10,
                            padding: 5,
                            fontSize: 12,
                            border: '1px solid #c3c3c3'
                          }}
                        >
                          Action
                        </div>
                      </div>
                    </Surface>
                  </Panel>
                  <Panel width={150} height={60} alignment='horizontalCenter'>
                    <Surface>
                      <h6 style={{ margin: '0 0 5px', color: '#bbb' }}>
                        Relese date
                      </h6>
                      <span style={{ fontSize: 12 }}>
                        2 Octuber 2015 (USA)
                      </span>
                    </Surface>
                  </Panel>
                  <Panel width={150} height={60} alignment='horizontalCenter'>
                    <Surface>
                      <h6 style={{ margin: '0 0 5px', color: '#bbb' }}>
                        Length
                      </h6>
                      <span style={{ fontSize: 12 }}>
                        2hr 40min
                      </span>
                    </Surface>
                  </Panel>
                  <Panel width={150} height={60} alignment='horizontalCenter'>
                    <Surface>
                      <h6 style={{ margin: '0 0 5px', color: '#bbb' }}>
                        Director
                      </h6>
                      <span style={{ fontSize: 12 }}>
                        Ridely Scott
                      </span>
                    </Surface>
                  </Panel>
                </FlexStackPanel>
                <Panel height={40}>
                  <Surface color='white'>
                    <div
                      style={{
                        height: '100%',
                        display: 'flex',
                        borderTop: '1px solid #ccc'
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexGrow: 1,
                          borderRight: '1px solid #ccc'
                        }}
                      >
                        <img height='15' src={share} />
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexGrow: 1,
                          borderRight: '1px solid #ccc'
                        }}
                      >
                        <img height='15' src={heart} />
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexGrow: 1
                        }}
                      >
                        <img height='15' src={bookmark} />
                      </div>
                    </div>
                  </Surface>
                </Panel>
              </FlexStackPanel>
              <Panel color='#ded6d4' flex={1} />
              <Panel width={250} color='#726a71' />
            </FlexStackPanel>
          </FlexStackPanel>
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

// MAP UX Helpe
// <Map itmesORState='some.state.path'>
//  {items =>
//    items.map((item, key) => <Template someProp={item.someProp} key={key} />)}
// </Map>
