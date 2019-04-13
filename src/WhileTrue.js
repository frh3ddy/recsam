// export default props => {
//   if (props.value) {
//     return [props.children]
//   } else {
//     return null
//   }
// }


import React from 'react'
import PropTypes from 'prop-types'

export default class WhileTrue extends React.Component {
  constructor (props, context) {
    super(props)
    this.namesNodes = context.namesNodes
  }

  getChildContext () {
    return {namesNodes: this.namesNodes}
  }

  componentDidUpdate (prevProps) {
  }

  componentDidMount () {
  }

  componentWillUnmount () {
  }

  render () {
    if (this.props.value) {
    	return [this.props.children]
  	} else {
    	return null
  	}	
  }
}

WhileTrue.childContextTypes = {
  namesNodes: PropTypes.array
}

WhileTrue.contextTypes = {
  view: PropTypes.object,
  namesNodes: PropTypes.array
}
