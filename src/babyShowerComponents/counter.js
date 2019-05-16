import React from 'react'
import createNamedComponent from '../createNamedComponent'
import Text from '../Text'
import Change from '../Change'
const Panel = createNamedComponent()
const StackPanel = createNamedComponent('FlexStackPanel')

class Counter extends React.Component {
	render() {
		return <Panel width={100} height={80} color='tomato'>
			<StackPanel>
				<Panel>
					<Panel>
						<Text alignment='verticalCenter' textAlignment='center' color='white'>1</Text>
						<Change y={-50} x={50} duration={1000} easing='easeInOut'/>

					</Panel>
					<Panel>
						<Text alignment='verticalCenter' textAlignment='center' color='white'>1</Text>
					</Panel>
				</Panel>
				<Panel>
					<Panel>
						<Text alignment='verticalCenter' textAlignment='center' color='white'>1</Text>
					</Panel>
					<Panel>
						<Text alignment='verticalCenter' textAlignment='center' color='white'>1</Text>
					</Panel>
				</Panel>
				<Panel>
					<Panel>
						<Text alignment='verticalCenter' textAlignment='center' color='white'>1</Text>
					</Panel>
					<Panel>
						<Text alignment='verticalCenter' textAlignment='center' color='white'>1</Text>
					</Panel>
				</Panel>
			</StackPanel>
		</Panel>
	}
}


export default Counter