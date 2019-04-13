import React, { Component } from 'react'
import './App.css'
import Context from './Context'
import createNamedComponent from './createNamedComponent'
import Text from './Text'
import Image from './Image'
import WhileTrue from './WhileTrue'
import Change from './Change'
import Set from './Set'
import { socketConnect } from 'socket.io-react';

//Components
import Background from './babyShowerComponents/background'
import Hearts from './babyShowerComponents/hearts'
import Awnsers from './babyShowerComponents/awnsers'

//Data
import awnsersData from './babyShowerComponents/awnsersData'

//Images
import bear from './images/bear.png'
import pinkBear from './images/bearPink.png'
import strikeBaby from './images/strikeBaby.png'
import bebita from './images/bebita.png'
import polosita from './images/polosita.png'
import flores from './images/flores.png'
import heart from './images/noun_Heart_1724390.svg'

const Panel = createNamedComponent()
const StackPanel = createNamedComponent('FlexStackPanel')

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      strikeTeam: false,
      currentTop: undefined,
      wrongAwnser: false,
      topAwnser: 1,
      score: 0,
      teamPlaying: undefined,
      teamOneTotalScore: 0,
      teamTwoTotalScore: 0,
      showStrike: false,
      strikes: 0,
      revealAnswers: false,
      awnsers: awnsersData
    }
  }

  hideStrike() {
    this.setState((state, props) => {
      return {showStrike: false}
    })
  }

  setStrike() {
    this.setState((state, _) => {
      if(state.strikes >= 3) {
        const scoreTeamPlaying = state.teamPlaying === 1 ? 'teamTwoTotalScore' : 'teamOneTotalScore'
        return {
          strikeTeam: false,
          revealAnswers: true,
          score: 0,
          [scoreTeamPlaying]: state.score
        }
      }

      return {
        strikes: state.strikes += 1,
        strikeTeam: false
      }
    })
  }

  componentDidMount() {
    this.props.socket.on('score', payload => {
      this.setState((state, props) => {
        state.awnsers[payload.index].text = payload.text
        state.awnsers[payload.index].points = payload.points

        //Game is over, but thres awnser left, just reveal them
        if(state.revealAnswers) {
          return {
            awnsers: state.awnsers
          }
        }

        if(state.strikes >= 3) {
          const scoreTeamPlaying = state.teamPlaying === 1 ? 'teamOneTotalScore' : 'teamTwoTotalScore'

          return {
            awnsers: state.awnsers,
            [scoreTeamPlaying]: state.score + parseInt(payload.points, 10),
            score: 0,
            revealAnswers: true
          }
        }

        return {
            awnsers: state.awnsers,
            score: state.score + parseInt(payload.points, 10)
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
          [teamPlaying]: state.score += parseInt(payload.points, 10),
          score: 0
        }
      })
    })

    this.props.socket.on('strikeTeam', () => {
      this.setState((state, props) => {
        if(state.strikes >= 3) {
          const scoreTeamPlaying = state.teamPlaying === 1 ? 'teamTwoTotalScore' : 'teamOneTotalScore'
          const teamPlaying = state.teamPlaying === 1 ? 2 : 1

          return {
            showStrike: true,
            [scoreTeamPlaying]: state.score,
            score: 0,
            teamPlaying: teamPlaying,
            revealAnswers: true
          }
        }

        return {
          strikeTeam: true
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

    this.props.socket.on('setStrike', () => {
      this.setState((state, props) => {
        return {
          showStrike: true
        }
      })
    })
  }

  render() {
    return <Context>
      <Panel color="black">
        <Panel margin='25' width='10%' height='25%'>
          <Image file={pinkBear}/>
          <Panel height={130} alignment='bottom'>
            <Text alignment='verticalCenter' textAlignment='center' color='#ef5fa7' font='Teko' fontSize='75px'>
                {this.state.teamOneTotalScore}
            </Text>
          </Panel>
          <WhileTrue value={this.state.teamPlaying === 2}>
            <Change scaleX={.5} scaleY={.5} easing='easeOutBounce' duration={300} testunmpunt={true}/>
            <Change opacity={.3} duration={300}/>
          </WhileTrue>
        </Panel>
        <Panel width='10%' height='25%' alignment='horizontalCenter' >
          <Image file={heart}/>
          <Panel height={50} alignment='center'  y={-30}>
            <Text alignment='verticalCenter' fontSize='75px' textAlignment='center' color='white' font='Teko'>
                {this.state.score}
            </Text>
          </Panel>
        </Panel>
        <Panel margin='25' width='10%' height='25%' alignment='right'>
          <Image file={bear}/>
          <Panel height={130} alignment='bottom' >
            <Text alignment='verticalCenter' textAlignment='center' color='#ef5fa7' font='Teko' fontSize='75px'>
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
          <Panel width='83%' height='70%' color='#f3f7fa' alignment='center' border='2px solid #6d6c6d' y={40}>
            <Panel margin='65 30'>
              <StackPanel orientation='vertical' itemSpacing={20}>
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
              <Set degreesZ={60}/>
              <Image file={polosita}/>
            </Panel>
            <Panel width={100} height={70} x={-40} y={20} alignment='bottom'>
              <Image file={flores}/>
            </Panel>
            <Panel width={100} height={70} x={40} y={-10} alignment='right'>
              <Set degreesZ={18}/>
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
        <WhileTrue value={this.state.strikeTeam}>
          <Panel width={300} height={340} alignment='center' z={10} opacity={0}>
            <Image file={strikeBaby}/>
            <Change scaleX={5} scaleY={(4.5)}/>
            <Change scaleX={1} scaleY={(1)} easing='easeOutCubic' duration={500} />
            <Change opacity={1} duration={500} />
            <Change scaleX='{strike1.w} / 300' scaleY='{strike1.h} / 340 )' aboutOrigin={[-.5, -.5]} delay={1000} easing='easeInCubic' duration={300}/>
            <Change x={`strike${this.state.strikes + 1}.x`} y={`strike${this.state.strikes + 1}.y`} z={10} delay={1000} easing='easeOutWall' duration={800} callback={() => this.setStrike()}/>
          </Panel>
        </WhileTrue>

        <WhileTrue value={this.state.showStrike}>
          <Panel width={300} height={340} alignment='center' z={10} opacity={0}>
            <Image file={strikeBaby}/>
            <Change scaleX={5} scaleY={(4.5)}/>
            <Change scaleX={1} scaleY={(1)} easing='easeOutCubic' duration={500} durationBack={500}/>
            <Change opacity={1} duration={500}/>
            <Change scaleX={5} scaleY={(4.5)} easing='easeInCubic' duration={300} delay={1500}/>
            <Change opacity={0} duration={300} delay={1500} callback={() => this.hideStrike()}/>
          </Panel>
        </WhileTrue>
      </Panel>
    </Context>
  }
}

export default socketConnect(App)