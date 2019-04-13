import React from 'react'
import createNamedComponent from '../createNamedComponent'
import Set from '../Set'
import Image from '../Image'
import Chance from 'chance'

import drawnHeart from '../images/heart.svg'

const Panel = createNamedComponent()
const chance = new Chance()

const Hearts = () => {
  let hearts = []
  let randomY
  let randomX
  let randomDegreeZ

  for(let i = 0; i < 6; i++) {
    randomY = chance.integer({ min: 20, max: 60 })
    randomX = chance.natural({ min: 100, max: 750 })
    randomDegreeZ = chance.integer({ min: -30, max: 35 })

    hearts.push(
      <Panel width={35} height={35} x={randomX} y={randomY} key={i}>
        <Set degreesZ={randomDegreeZ}/>
        <Image file={drawnHeart} />
      </Panel>
      )

  }

  return hearts
}

export default Hearts