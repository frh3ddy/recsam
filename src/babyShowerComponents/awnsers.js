import React from 'react'
import Panel from '../Panel'
import Text from '../Text'
import StackPanel from '../FlexStackPanel'
import WhileTrue from '../WhileTrue'
import Change from '../Change'


const Awnsers = ({a}) => {
    return a.map((item, index) => {
    	let numberOpacity = parseInt(item.points, 10) > 0 ? 0 : 1

    	return (<Panel key={index}>
	    <Panel color='#ef5fa7' cornerRadius='5px'/>
	    <Panel color='white' cornerRadius='5px'>
	    	<WhileTrue value={parseInt(item.points, 10) > 0}>
	    		<Change scaleX={0} duration={500} aboutOrigin={[1, 0]} easing='easeInOutCubic'/>
	    	</WhileTrue>
	    </Panel>
	    <StackPanel>
	     	<Panel width={60}>
	     		<Text font='Teko' alignment='verticalCenter' textAlignment='center' fontSize='50px' color='white'>{`${index + 1}`}</Text>
	     	</Panel>
	     	<Panel width={4} margin='0 8' opacity={0}>
	     		<WhileTrue value={!numberOpacity}>
	     			<Change opacity={1} delay={100}/>
	     		</WhileTrue> 
	     		<Panel width={2} color='#CB297B'/>
	     		<Panel width={2} color='#FF8DC6' x={2}/>
	     	</Panel>
	     	<Panel margin='20 0 0 0'>
	     		<Text font='Rajdhani' alignment='verticalCenter' textAlignment='left' fontSize='50px' color='white'>{item.text}</Text>
	     	</Panel>
	     	<Panel width={4} margin='0 8' opacity={0}>
	     		<WhileTrue value={!numberOpacity}>
	     			<Change opacity={1} delay={400}/>
	     		</WhileTrue>
	     		<Panel width={2} color='#CB297B'/>
	     		<Panel width={2} color='#FF8DC6' x={2}/>
	     	</Panel>
	     	<Panel width={80}>
	     		<Text alignment='verticalCenter' textAlignment='center' fontSize='50px' font='Teko' color='white'>{item.points}</Text>
	     	</Panel>
	     </StackPanel>
	     <Panel opacity={numberOpacity}>
	     	<Text alignment='verticalCenter' textAlignment='center' fontSize='45px'  font='Teko' color='#7566f4'>{`${index + 1}`}</Text>
	     </Panel>
	  </Panel>)
    })
}

export default Awnsers
