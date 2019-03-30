
import React from 'react'
import { render } from 'react-dom'
import { Container } from '@cerebral/react'
import controller from './controller'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import io from 'socket.io-client'
import App from './App'
import { SocketProvider } from 'socket.io-react'


// find local ip 
// ip address terminal comman ---->    ifconfig | grep broadcast
var socket = io(`http://192.168.1.83:3050`)


render(
<SocketProvider socket={socket}>
  <Container controller={controller}>
    <App />
  </Container>
  </SocketProvider>,
  document.querySelector('#root')
)

registerServiceWorker()

