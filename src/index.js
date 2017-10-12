import React from 'react'
import { render } from 'react-dom'
import { Container } from '@cerebral/react'
import controller from './controller'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

import App from './App'

render(
  <Container controller={controller}>
    <App />
  </Container>,
  document.querySelector('#root')
)

registerServiceWorker()
