import React from 'react'
import createNamedComponent from '../createNamedComponent'
import Text from '../Text'
import Change from '../Change'
import Set from '../Set'
import On from '../OnClick'
import WhileTrue from '../WhileTrue'
const Panel = createNamedComponent()
const StackPanel = createNamedComponent('FlexStackPanel')

//Caviat:::: on Change Callback should never be an arrow or anonymous function otherwise will trigger an infinite loop

class Counter extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			start: false,
			done: false,
			number: 1,
			placeholder: 2,
			y: 0,
			placeholderY: 50
		}

		this.countUp = this.countUp.bind(this)
		this.resetPos = this.resetPos.bind(this)
	}

	countUp() {
		this.setState((state) => {
			return {number: state.number += 1}
		})
	}

	resetPos() {
		this.setState(state => {
			return {
				done: true,
				number: state.number += 1, 
				placeholder: state.placeholder += 1,
				start: false
			}
		})
	}

	render() {
		return <Panel>
		<Panel y={100} width={100} height={30} color='blue'>
			<On event='click' signal={this.countUp}/>
		</Panel>
		<Panel width={100} height={25} color='tomato'>
			<StackPanel>
				<AnimatedNumber number={this.state.number}/>
			</StackPanel>
		</Panel>
		</Panel>
	}
}

class AnimatedNumber extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			start: false,
			prevNumber: props.number,
			y: 0,
			placeholderY: 50
		}

		this.resetPos = this.resetPos.bind(this)
	}

	resetPos() {
		this.setState(state => {
			return {
				prevNumber: state.prevNumber + 1,
				start: false
			}
		})
	}

	componentDidUpdate() {
		this.setState((state, props) => {
			if(state.start === true) return null

			return {
				start: true,
				y: -50,
				placeholderY: 0
			}
		}, () => {
			setTimeout(() => {
				this.setState((state, props) => {
			return {
				prevNumber: props.number,
				start: true
			}
		})

			}, 200)
		})
	}

	render() {
		return <Panel>
					<Panel>
						<Text alignment='verticalCenter' textAlignment='center' color='white'>{this.state.prevNumber}</Text>
						<WhileTrue value={this.state.start}>
							<Change debug y={this.state.y} easing='spring' damping={.4} period={135} delay={50}/>
						</WhileTrue>
						<WhileTrue value={!this.state.start}>
							<Set y={0}/>
						</WhileTrue>
					</Panel>
					<Panel y={50}>
						<Text alignment='verticalCenter' textAlignment='center' color='white'>{this.props.number}</Text>
						<WhileTrue value={this.state.start}>
							<Change y={this.state.placeholderY}  easing='spring' damping={.4} period={135} delay={50}/>
						</WhileTrue>
						<WhileTrue value={!this.state.start}>
							<Set y={50}/>
						</WhileTrue>
					</Panel>
				</Panel>
	}	
}


export default Counter