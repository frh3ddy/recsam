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
    {x: 105, y: 45, rotation: 90},
    {x: 315, y: 75, rotation: 90}
  ]

  return hearts.map((heart, i) => (
    <Panel width={35} height={35} x={heart.x} y={heart.y} key={i}>
      <Set degreesZ={heart.rotation}/>
      <Image file={drawnHeart} />
    </Panel>
    ))
}

export default Hearts