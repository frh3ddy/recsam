import React, { Component } from 'react'
import './App.css'
import Context from './Context'
import createNamedComponent from './createNamedComponent'
import Text from './Text'
import On from './OnClick'
import Image from './Image'
import WhileTrue from './WhileTrue'
import Change from './Change'
import Set from './Set'
import { socketConnect } from 'socket.io-react';

import blueteam from './images/blueteam.png'
import pinkteam from './images/teamPink.png'
import strikeBaby from './images/strikeBaby.png'

const Panel = createNamedComponent()
const StackPanel = createNamedComponent('FlexStackPanel')

let awnsers = [
  {
      text:'Hago bien mi trabajo',
      points: '34',
      done: false
  },
  {
      text:'Costo de la vida',
      points: '22',
      done: false
  },
  {
      text:'Me lo merezco ',
      points: '20',
      done: false
  },
  {
      text:'Por favor',
      points: '14',
      done: false
  },
  {
      text:'Ya tengo mucho tiempo trabajando',
      points: '10',
      done: false
  }
]

const initialState = {
  awnsers,
  teamPlaying: undefined,
  strikes: 0
}


class App extends Component {
  constructor(props) {
    super(props)

    this.state = initialState

    props.socket.emit('appRestarted')
    props.socket.on('restartApp', () => {
      this.setState(state => {
        initialState.awnsers = awnsers.map(awnser => {
          awnser.done = false
          return awnser
        })
        return initialState
      })
    })
  }

  sendScore({points, text}, index) {
    let allDone = false
    this.setState((state, props) => {
      state.awnsers[index].done = true
      allDone = state.awnsers.every(item => item.done)

      if(allDone && state.teamPlaying === undefined) {
        state.awnsers[index].done = false
        return null
      }

      return {
        awnsers: state.awnsers
      }
    })

    if(this.state.strikes > 2) {
      this.props.socket.emit('addScoreToTeam', {points, text, index})
      return
    }

    if(allDone === true && this.state.teamPlaying !== undefined) {
      this.props.socket.emit('addScoreToTeam', {points, text, index})
    } else if(allDone === false) {
      this.props.socket.emit('addScore', {points, text, index})
    } else {
      alert('no team selected to give th epoints')
    }
  }

  setTeamPlaying(team) {
    this.setState((state, props) => {
      return {
        teamPlaying: team
      }
    }, () => {
      this.props.socket.emit('teamPlaying', team)
      //posible bug commenting this
      // this.props.socket.emit('strike', this.state.strikes)
    })
  }

  setStrike() {
    this.setState((state, props) => {
      if(state.teamPlaying) {
        this.props.socket.emit('strikeTeam')
      } else {
        this.props.socket.emit('strike')
      }
      return null
    })
  }

  render() {
    return <Context>
    <Panel color='#3a4050'>
      <Panel margin='20'>
        <StackPanel orientation='vertical' itemSpacing={20}>
          <StackPanel itemSpacing={20}>
            <StackPanel orientation='vertical' width={250} itemSpacing={20}>
              <Panel border='1px solid white'>
                <StackPanel orientation='vertical'>
                  <Text padding='10px 0 0' height={true} fontSize='25px' font='Teko' color='#d1d0d5' textAlignment='center'> 
                    Round
                  </Text>
                  <Text padding='10px 0' height={true} fontSize='30px' font='Teko' color='#d1d0d5' textAlignment='center'> 
                    1
                  </Text>
                </StackPanel>
                <Panel height={60} alignment='bottomCenter' margin='10'>
                  <StackPanel itemSpacing={10}>
                    <Panel color='#355af0'>
                      <Text alignment='center' font='Rajdhani' color='white'>
                        Previous
                      </Text>
                      <On event='click'/>
                    </Panel>
                    <Panel color='#355af0'>
                      <Text alignment='center' font='Rajdhani' color='white'>
                        Next
                      </Text>
                      <On event='click'/>
                    </Panel>
                  </StackPanel>
                </Panel>
              </Panel>
              <Panel border='1px solid white'>
                <StackPanel orientation='vertical'>
                  <Text padding='10px 0 0' height={true} fontSize='25px' font='Teko' color='#d1d0d5' textAlignment='center'> 
                    Question
                  </Text>
                  <Text padding='10px 0' height={true} fontSize='30px' font='Teko' color='#d1d0d5' textAlignment='center'> 
                    4
                  </Text>
                </StackPanel>
                <Panel height={60} alignment='bottomCenter' margin='10'>
                  <StackPanel itemSpacing={10}>
                    <Panel color='#355af0'>
                      <Text alignment='center' font='Rajdhani' color='white'>
                        Previous
                      </Text>
                      <On event='click'/>
                    </Panel>
                    <Panel color='#355af0'>
                      <Text alignment='center' font='Rajdhani' color='white'>
                        Next
                      </Text>
                      <On event='click'/>
                    </Panel>
                  </StackPanel>
                </Panel>
              </Panel>
            </StackPanel>
            <Panel border='1px solid white'>
              <Panel margin='50 20'>
                <StackPanel orientation='vertical' itemSpacing={20}>
                  <Text padding='10px 0 0' height={true} fontSize='25px' font='Teko' color='#d1d0d5' textAlignment='center'> 
                    Most Popular Awnsers
                  </Text>

                  {this.state.awnsers.map((item, index) => {
                    let done = this.state.awnsers[index].done
                    return (
                      <Panel color='#355af0' opacity={done ? .3 : 1} key={index}>
                        <Text padding='0 0 0 20px' alignment='verticalCenter' textAlignment='left' font='Rajdhani' fontSize='18px' color='white'>
                          {item.text}
                        </Text>
                        {this.state.awnsers[index].done ? 
                          null: <On event='click' signal={() => this.sendScore(item, index)}/>
                        }
                      </Panel>
                    )
                  })}
                  
                </StackPanel>
              </Panel>
            </Panel>
          </StackPanel>
          <Panel height={200}>
            <Panel width={500} border='1px solid white'>
              <StackPanel width={500}>
                <Panel margin='30 20'>
                  <Panel height={100} width={85} alignment='horizontalCenter'>
                    <Image file={pinkteam}></Image>
                  </Panel>
                  <Panel color='#355af0' height={40} alignment='bottom'>
                    <Text alignment='center' font='Rajdhani' color='white'>
                      Equipo Rosa
                    </Text>
                    <On event='click' signal={() => this.setTeamPlaying(1)}/>
                  </Panel>
                </Panel>
                <Panel color='white' width={1} margin='0 25'></Panel>
                <Panel margin='30 20'>
                  <Panel height={100} width={85} alignment='horizontalCenter'>
                    <Image file={blueteam}></Image>
                  </Panel>
                  <Panel color='#355af0' height={40} alignment='bottom'>
                    <Text alignment='center' font='Rajdhani' color='white'>
                      Equipo Azul
                    </Text>
                    <On event='click' signal={() => this.setTeamPlaying(2)}/>
                  </Panel>
                </Panel>
              </StackPanel>
            </Panel>
            <Panel width={200} alignment='right' border='1px solid white'>
              <Panel margin='30 20'>
                  <Panel height={100} width={85} alignment='horizontalCenter'>
                    <Image file={strikeBaby}></Image>
                  </Panel>
                  <Panel color='#355af0' height={40} alignment='bottom'>
                    <Text alignment='center' font='Rajdhani' color='white'>
                      Strike
                    </Text>
                    <On event='click' signal={() => this.setStrike()}/>
                  </Panel>
                </Panel>
              </Panel>
          </Panel>
        </StackPanel>
      </Panel>
    </Panel>
    </Context>
  }
}


export default socketConnect(App)
