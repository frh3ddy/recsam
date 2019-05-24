
import React from 'react'
import { render } from 'react-dom'
import { Container } from '@cerebral/react'
import controller from './controller'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import App from './App'
import WebFont from 'webfontloader'


WebFont.load({
  google: {
    families: ['Teko', 'Rajdhani', 'sans-serif']
  }
})

render(
<Container controller={controller}>
    <App />
  </Container>,
  document.querySelector('#root')
)

registerServiceWorker()

