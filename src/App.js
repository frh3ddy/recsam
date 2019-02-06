import React, { Component } from 'react'
import './App.css'
import Context from './Context'
import createNamedComponent from './createNamedComponent'
import { state, signal, props } from 'cerebral/tags'
import { connect } from '@cerebral/react'
import Text from './Text'
import Image from './Image'
import On from './OnClick'
import WhileTrue from './WhileTrue'
import WhileFalse from './WhileFalse'
import Move from './Move'
import Change from './Change'
import Set from './Set'

import Cube from './Cube'

import arrowRight from './images/arrow-right.svg'
import search from './images/search.svg'

const Panel = createNamedComponent()
const MainContainer = createNamedComponent('FlexStackPanel')
const StackPanel = createNamedComponent('StackPanel')
const SideNav = createNamedComponent()
const Content = createNamedComponent()

const t = {
  easingBack: 'easeInOutCubic',
  easing: 'easeOutCubic',
  durationBack: 300,
  duration: 400
}

const MenuLink = connect(
  {
    navLink: state`navLinks.${props`text`}`,
    pageChanged: signal`pageChanged`
  },
  class MenuLink extends Component {
    state = {
      hovered: false
    }

    // clicked () {
    //   this.setState({ active: true })
    // }

    mouseleave () {
      this.setState({ hovered: false })
    }

    mouseenter () {
      this.setState({ hovered: true })
    }

    render () {
      const { hovered } = this.state
      const { text, navLink, pageChanged } = this.props
      return (
        <Panel margin='25 0 25' height={35}>
          <On event='click' signal={() => pageChanged({ link: text })} />
          <On event='mouseleave' signal={this.mouseleave.bind(this)} />
          <On event='mouseenter' signal={this.mouseenter.bind(this)} />
          <StackPanel itemSpacing={10}>
            <Text alignment='centerLeft' color='white'>
              <WhileTrue value={navLink.active}>
                <Change x={45} z={45} {...t} />
                <Change degreesY={35} {...t} />
              </WhileTrue>
              {text}
            </Text>
            <Image opacity={0} padding='5px' width={30} file={arrowRight}>
              <WhileTrue value={navLink.active}>
                <Set opacity={1} />
                <Change x={50} easing='easeOutCubic' />
              </WhileTrue>

              <WhileFalse value={navLink.active}>
                <Set opacity={0} />
              </WhileFalse>

              <WhileTrue value={hovered}>
                <Change opacity={1} duration={100} />
              </WhileTrue>
            </Image>
          </StackPanel>
        </Panel>
      )
    }
  }
)

const SearchBar = () => (
  <Panel margin='25 5' border='1px solid white' cornerRadius='5px' height={30}>
    <Text
      color='white'
      alignment='centerLeft'
      padding='0 0 0 10px'
      fontSize='12px'
    >
      Search
    </Text>
    <Image alignment='right' padding='7px 10px 7px 0' file={search} />
  </Panel>
)

const Divider = () => (
  <Panel opacity={0.5} margin='0 20' height={0.5} color='white' />
)

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
      return (
        <Context nodeName="Context">
          
            <Panel alignment='center' >
                <SideNav width={260} color='#4f76fb' nodeName='SideNav'>
                  <StackPanel orientation='vertical'>
                    <Panel height={200}>
                      <Text fontSize='22px' alignment='center' color='white'>
                        FREDY
                      </Text>
                    </Panel>
                    <Divider />
                    <MenuLink text='Home' />
                    <MenuLink text='About' />
                    <MenuLink text='Portfolio' />
                    <MenuLink text='Services' />
                    <MenuLink text='Blog' />
                    <MenuLink text='Contact' />
                    <Divider />
                    <SearchBar />
                  </StackPanel>
                </SideNav>
                <Content >
                  <Cube subscribeTo='Context'>
                    <Panel color='lightBlue' opacity={.7}>
                      <Text alignment='center'>Home</Text>
                    </Panel>
                    <Panel color='#67d5b5' opacity={.7}>
                      <Text alignment='center'>About</Text>
                    </Panel>
                    <Panel color='#f9d423' opacity={.7}>
                      <Text alignment='center'>Portfolio</Text>
                    </Panel>
                    <Panel color='#353866' opacity={.7}>
                      <Text alignment='center' color='white'>Services</Text>
                    </Panel>
                    <Panel color='#f1404b' opacity={.7}>
                      <Text alignment='center' color='white'>Contact</Text>
                    </Panel>
                    <Panel color='#0080ff' opacity={.7}>
                      <Text alignment='center' color='white'>Blog</Text>
                    </Panel>
                  </Cube>
                </Content>
              
            </Panel>

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
