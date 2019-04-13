import React from 'react'
import createNamedComponent from '../createNamedComponent'
import Set from '../Set'
import Image from '../Image'
import Chance from 'chance'

import drawnHeart from '../images/heart.svg'

const Panel = createNamedComponent()
const chance = new Chance()

const Hearts = () => {
  let hearts = [
    {x: 105, y: 45, rotation: -15},
    {x: 343, y: 75, rotation: 25},
    {x: 561, y: 23, rotation: -18},
    {x: 781, y: 60, rotation: 25},
    {x: 911, y: 85, rotation: -30},
    {x: 1177, y: 28, rotation: 20}
  ]

  return hearts.map((heart, i) => (
    <Panel width={50} height={50} x={heart.x} y={heart.y} key={i}>
      <Set degreesZ={heart.rotation}/>
      <Image file={drawnHeart} />
    </Panel>
    ))
}

export default Hearts