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
import { socketConnect } from 'socket.io-react';

import Chance from 'chance'
import anime from 'animejs'

// import Cube from './Cube'

import user from './images/user.svg'
import clock from './images/clock.svg'
import alert from './images/alert-circle.svg'
import star from './images/star.svg'
import ribbon from './images/ribbon.png'
import recipe from './images/recipe.png'
import recipeSlice from './images/recipeSlice.png'
import bear from './images/bear.png'
import pinkBear from './images/bearPink.png'
import strikeBaby from './images/strikeBaby.png'
import bebita from './images/bebita.png'
import polosita from './images/polosita.png'
import flores from './images/flores.png'
import heart from './images/noun_Heart_1724390.svg'
import drawnHeart from './images/heart.svg'

const chance = new Chance()
const Panel = createNamedComponent()
// const MainContainer = createNamedComponent('FlexStackPanel')
const StackPanel = createNamedComponent('FlexStackPanel')
// const SideNav = createNamedComponent()
// const Content = createNamedComponent()

// const t = {
//   easingBack: 'easeInOutCubic',
//   easing: 'easeOutCubic',
//   durationBack: 300,
//   duration: 400
// }

// const MenuLink = connect(
//   {
//     navLink: state`navLinks.${props`text`}`,
//     pageChanged: signal`pageChanged`
//   },
//   class MenuLink extends Component {
//     state = {
//       hovered: false
//     }

//     // clicked () {
//     //   this.setState({ active: true })
//     // }

//     mouseleave () {
//       this.setState({ hovered: false })
//     }

//     mouseenter () {
//       this.setState({ hovered: true })
//     }

//     render () {
//       const { hovered } = this.state
//       const { text, navLink, pageChanged } = this.props
//       return (
//         <Panel margin='25 0 25' height={35}>
//           <On event='click' signal={() => pageChanged({ link: text })} />
//           <On event='mouseleave' signal={this.mouseleave.bind(this)} />
//           <On event='mouseenter' signal={this.mouseenter.bind(this)} />
//           <StackPanel itemSpacing={10}>
//             <Text alignment='centerLeft' color='white'>
//               <WhileTrue value={navLink.active}>
//                 <Change x={45} z={45} {...t} />
//                 <Change degreesY={35} {...t} />
//               </WhileTrue>
//               {text}
//             </Text>
//             <Image opacity={0} padding='5px' width={30} file={arrowRight}>
//               <WhileTrue value={navLink.active}>
//                 <Set opacity={1} />
//                 <Change x={50} easing='easeOutCubic' />
//               </WhileTrue>

//               <WhileFalse value={navLink.active}>
//                 <Set opacity={0} />
//               </WhileFalse>

//               <WhileTrue value={hovered}>
//                 <Change opacity={1} duration={100} />
//               </WhileTrue>
//             </Image>
//           </StackPanel>
//         </Panel>
//       )
//     }
//   }
// )

// const SearchBar = () => (
//   <Panel margin='25 5' border='1px solid white' cornerRadius='5px' height={30}>
//     <Text
//       color='white'
//       alignment='centerLeft'
//       padding='0 0 0 10px'
//       fontSize='12px'
//     >
//       Search
//     </Text>
//     <Image alignment='right' padding='7px 10px 7px 0' file={search} />
//   </Panel>
// )

// const Divider = () => (
//   <Panel opacity={0.5} margin='0 20' height={0.5} color='white' />
// )

// const IngridientText = ({children}) => (
//     <Text color="#727171" fontSize="14px" height={15}>
//       {children}
//     </Text>
//   )


const strikeTransition = {
  easing: 'easeOutCubic',
  duration: 400
}

const Hearts = () => {
  let hearts = []
  let randomY
  let randomX
  let randomDegreeZ

  for(let i = 0; i < 6; i++) {
    randomY = chance.integer({ min: 20, max: 60 })
    randomX = chance.natural({ min: 100, max: 750 })
    randomDegreeZ = chance.integer({ min: -30, max: 35 })

    hearts.push(
      <Panel width={35} height={35} x={randomX} y={randomY} key={i}>
        <Set degreesZ={randomDegreeZ}/>
        <Image file={drawnHeart} />
      </Panel>
      )

  }

  return hearts
}


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

const Awnsers = ({a}) => {
    return a.map((item, index) => <Panel key={index}>
      <Text alignment='verticalCenter'>{`${index + 1} ${item.text} ${item.points}`}</Text>
  </Panel>)
}


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      score: 0,
      teamPlaying: undefined,
      teamOneTotalScore: 0,
      teamTwoTotalScore: 0,
      showStrike: false,
      strikes: 0,
      revealAnswers: false,
      awnsers: [
        {
          text:'_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _',
          points: ''
        },
        {
          text:'_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ ',
          points: ''
        },
        {
          text:'_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ ',
          points: ''
        },
        {
          text:'_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ ',
          points: ''
        },
        {
          text:'_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ ',
          points: ''
        }
      ]
      
    }
  }

  hideStrike() {
    this.setState((state, _) => null)
  }

  setStrike() {
    this.setState((state, _) => {
      const teamPlaying = state.teamPlaying === 1 ? 'teamOneTotalScore' : 'teamTwoTotalScore'

      if(state.strikes > 3) {
        return {
          showStrike: false,
          revealAnswers: true,
          score: 0,
          [teamPlaying]: state.score
        }
      }

      return {
        strikes: state.strikes += 1,
        showStrike: false
      }
    })
  }

  componentDidMount() {
    this.props.socket.on('score', payload => {
      this.setState((state, props) => {
        state.awnsers[payload.index].text = payload.text
        state.awnsers[payload.index].points = payload.points
        return {
            awnsers: state.awnsers,
            score: state.score + parseInt(payload.points)
          }
      })
    })

    this.props.socket.on('setTeamScore', payload => {
      this.setState((state, props) => {
        state.awnsers[payload.index].text = payload.text
        state.awnsers[payload.index].points = payload.points
        const teamPlaying = state.teamPlaying === 1 ? 'teamOneTotalScore' : 'teamTwoTotalScore'

        if(state.revealAnswers) {
          return {
            awnsers: state.awnsers
          }
        }

        return {
          revealAnswers: true,
          awnsers: state.awnsers,
          [teamPlaying]: state.score += parseInt(payload.points),
          score: 0
        }
      })
    })

    this.props.socket.on('setTeamPlaying', team => {
      this.setState((state, props) => {
        return {
          teamPlaying: team
        }
      })
    })

    this.props.socket.on('setStrike', strike => {
      this.setState((state, props) => {
        if(state.showStrike === false) {
          return {
            showStrike: true
          }
        } else {
          this.setStrike()
          return null
        }
      })
    })

  }

  render() {
    return <Context>
      <Panel color="black">
        <Panel margin='25' width='15%' height='30%'>
          <Image file={pinkBear}/>
          <Panel height={70} alignment='bottom' >
            <Text alignment='verticalCenter' textAlignment='center'>
                {this.state.teamOneTotalScore}
            </Text>
          </Panel>
          <WhileTrue value={this.state.teamPlaying === 2}>
            <Change scaleX={.5} scaleY={.5} easing='easeOutBounce' duration={300}/>
            <Change opacity={.3} duration={300}/>
          </WhileTrue>
        </Panel>
        <Panel width='10%' height='25%' alignment='horizontalCenter' >
          <Image file={heart}/>
          <Panel height={50} alignment='center'  y={-20} >
            <Text alignment='verticalCenter' fontSize='30px' textAlignment='center' color='white'>
                {this.state.score}
            </Text>
          </Panel>
        </Panel>
        <Panel margin='25' width='15%' height='30%' alignment='right'>
          <Image file={bear}/>
          <Panel height={70} alignment='bottom' >
            <Text alignment='verticalCenter' textAlignment='center'>
                {this.state.teamTwoTotalScore}
            </Text>
          </Panel>
          <WhileTrue value={this.state.teamPlaying === 1}>
            <Change scaleX={.5} scaleY={.5} easing='easeOutBounce' duration={300}/>
            <Change opacity={.3} duration={300}/>
          </WhileTrue>
        </Panel>
        <Panel width='70%' height='65%' alignment='center' y={25}>
          <Background/>
          <Hearts/>
          <Panel width='83%' height='70%' color='white' alignment='center' border='2px solid #6d6c6d' y={40}>
            <Panel margin='70 20'>
              <StackPanel orientation='vertical'>
                <Awnsers a={this.state.awnsers}/>
              </StackPanel>
            </Panel>
            <Panel width={125} height={150} alignment='horizontalCenter' y={-130}>
              <Image file={bebita}/>
            </Panel>
            <Panel width={70} height={55} x={-27} y={-20}>
              <Image file={polosita}/>
            </Panel>
            <Panel width={70} height={55} alignment='bottomRight' x={-27} y={25} >
              <Set degreesZ={60} duration={1} />
              <Image file={polosita}/>
            </Panel>
            <Panel width={100} height={70} x={-40} y={20} alignment='bottom'>
              <Image file={flores}/>
            </Panel>
            <Panel width={100} height={70} x={40} y={-10} alignment='right'>
              <Set degreesZ={18} duration={1} />
              <Image file={flores}/>
            </Panel>
          </Panel>
        </Panel>
        <Panel width='20%' height='10%' alignment='bottomCenter' y={-25}>
          <StackPanel itemSpacing={50}>
            <Panel nodeName='strike1' opacity={0}>
              <Image file={strikeBaby}/>
              <WhileTrue value={this.state.strikes > 0}>
                <Change opacity={1} />
              </WhileTrue>
            </Panel>
            <Panel nodeName='strike2' opacity={0}>
              <Image file={strikeBaby}/>
              <WhileTrue value={this.state.strikes > 1}>
                <Change opacity={1}/>
              </WhileTrue>
            </Panel>
            <Panel nodeName='strike3' opacity={0}>
              <Image file={strikeBaby}/>
              <WhileTrue value={this.state.strikes > 2}>
                <Change opacity={1} />
              </WhileTrue>
            </Panel>
          </StackPanel>
        </Panel>
        <WhileTrue value={this.state.showStrike === true}>
          <Panel width={300} height={340} alignment='center' z={10} opacity={0}>
            <Image file={strikeBaby}/>
            <Change scaleX={5} scaleY={(4.5)}/>
            <Change scaleX={1} scaleY={(1)} easing='easeOutCubic' duration={500} />
            <Change opacity={1} duration={500} />
            <Change scaleX='{strike1.w} / 300' scaleY='{strike1.h} / 340 )' aboutOrigin={[-.5, -.5]} delay={1000} easing='easeInCubic' duration={300}/>
            <Change x={`strike${this.state.strikes + 1}.x`} y={`strike${this.state.strikes + 1}.y`} z={10} delay={1000} easing='easeOutWall' duration={800} callback={() => this.setStrike()}/>
          </Panel>
        </WhileTrue>
      </Panel>
    </Context>
  }
}

// <Change scaleX={(46.5/ 300)} scaleY={(63.5/ 340 )}/>


export default socketConnect(App)

// export default socketConnect(connect(
//   {
//     items: state`items`,
//     size: state`size`,
//     titleChanged: signal`titleChanged`,
//     itemRemoved: signal`removedItem`,
//     itemAdded: signal`itemAdded`
//   },
//   class App extends Component {
//     constructor(props) {
//       super(props)
//       this.socket = props.socket
//     }
//     render () {
//       const stars = 5
//       const starComponent = []
//       for(let i = 0; i < stars; i++) {
//         starComponent.push(<Image width={12} key={i} file={star}/>)
//       }

//       return (
//         <Context>
//           <Panel color="#ffdeb9"/>
//           <Panel width={575} height={480} alignment='center' color="white" cornerRadius='2px'>
//             <On event='click' signal={() => this.socket.emit('chat', 'Hello world!')}/>
//             <Panel width={125} color="#23212a" height={200} x={-40} y={20} cornerRadius='2px'>
//               <Image width={15} height={20} alignment="right" x={-15}  y={-1} file={ribbon}/>
//               <Panel margin='20 40 20 30'>
//                 <StackPanel orientation="vertical" itemSpacing={20}>
//                   <StackPanel height={20} itemSpacing={15}>
//                     <Image width={16} file={user}/>
//                     <Text color="white"  fontSize="12px" alignment='verticalCenter'>
//                       4.5
//                     </Text>
//                   </StackPanel>
//                   <StackPanel height={20} itemSpacing={15}>
//                     <Image width={16}  file={clock}/>
//                     <Text color="white" fontSize="12px" alignment='verticalCenter'>
//                       12 mins
//                     </Text>
//                   </StackPanel>
//                   <StackPanel height={20} itemSpacing={15}>
//                     <Image width={16} file={alert}/>
//                     <Text color="white" fontSize="12px" alignment='verticalCenter'>
//                       Easy
//                     </Text>
//                   </StackPanel>
//                   <StackPanel height={20} itemSpacing={5}>
//                     {starComponent}
//                   </StackPanel>
//                 </StackPanel>
//               </Panel> 
//             </Panel>
//             <StackPanel>
//               <Panel margin="120 50 0 0">
//                 <StackPanel orientation='vertical' itemSpacing={20}>
//                   <Text height={15} fontSize="20px">
//                     TOMATO SOUP WITH CHICKEN
//                   </Text>
//                   <Panel margin="110 0" color="#e3e3e3" height={1} width={80} />
//                   <Panel margin="25">
//                     <StackPanel orientation="vertical" itemSpacing={15}>
//                       <IngridientText>
//                         2 stalks celery, diced
//                       </IngridientText>
//                       <IngridientText>
//                         2 bondless skinless chicken breasts
//                       </IngridientText>
//                       <IngridientText>
//                         1 (14 ounce) can fat free chicken broth
//                       </IngridientText>
//                       <IngridientText>
//                         2 (24 ounce) can diced Tomatos
//                       </IngridientText>
//                       <IngridientText>
//                         2 teaspoon garlic salt
//                       </IngridientText>
//                       <IngridientText>
//                         2 teaspoon papper
//                       </IngridientText>
//                       <IngridientText>
//                         2 teaspoon thyme
//                       </IngridientText>
//                       <IngridientText>
//                         2 teaspoon tomato basil garlic
//                       </IngridientText>
//                       <IngridientText>
//                         2 tablespoon parsley
//                       </IngridientText>
//                     </StackPanel>
//                   </Panel>
//                 </StackPanel>
//               </Panel>
//               <Panel width={115} color="#23212a" cornerRadius="0 2px 0 0">
//                 <Panel margin="0 30 0 0">
//                   <Image file={recipe}/>
//                 </Panel>
//                 <Panel width={80} height={180} y={248} x={-79.5}>
//                   <Image file={recipeSlice}/>
//                 </Panel>
//               </Panel>
//             </StackPanel>
//           </Panel>
//         </Context>
//       )
//     }
//   }
// ))

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

