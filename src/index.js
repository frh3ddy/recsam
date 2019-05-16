
import React from 'react'
import { render } from 'react-dom'
import { Container } from '@cerebral/react'
import controller from './controller'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import io from 'socket.io-client'
import App from './App'
import { SocketProvider } from 'socket.io-react'
import WebFont from 'webfontloader'


// find local ip 
// ip address terminal comman ---->    ifconfig | grep broadcast
var socket = io(`http://192.168.0.15:3050`)

WebFont.load({
  google: {
    families: ['Teko', 'Rajdhani', 'sans-serif']
  }
})

render(
<SocketProvider socket={socket}>
  <Container controller={controller}>
    <App />
  </Container>
  </SocketProvider>,
  document.querySelector('#root')
)

registerServiceWorker()

