const View = require('samsarajs').Core.View
const Transform = require('samsarajs').Core.Transform
const Surface = require('samsarajs').DOM.Surface
const Transitionable = require('samsarajs').Core.Transitionable
const Stream = require('samsarajs').Streams.Stream

export default View.extend({
  defaults: {
    alignment: 'default'
  },
  initialize ({
    color,
    width,
    height,
    textAlignment,
    translation,
    fontSize,
    font,
    background,
    alignment,
    margin,
    content,
    padding
  }) {
    const [x = 0, y = 0, z = 0] = translation
    this.translation = new Transitionable([x, y, z])
    const translateTransform = this.translation.map(vector =>
      Transform.compose(Transform.translate(vector), Transform.inFront)
    )

    this.rotation = new Transitionable([0, 0, 0])
    const rotateTransform = this.rotation.map(vector => {
      return Transform.composeMany(
        Transform.rotateX(vector[0]),
        Transform.rotateY(vector[1]),
        Transform.rotateZ(vector[2]),
        Transform.inFront
      )
    })

    const transform = Stream.lift((t, r) => Transform.compose(t, r), [
      translateTransform,
      rotateTransform
    ])

    this._layoutNode.set({ transform })

    let { origin, align, size } = getAlignment(alignment)
    this.origin = new Transitionable(origin)
    this.align = new Transitionable(align)
    // this.surfaceSize = Stream.lift(
    //   (origin, align) => {
    //     if (isDefaultAlignment(origin, align)) return [width, height]
    //     return [true, true]
    //   },
    //   [this.origin, this.align]
    // )

    if (width) {
      size[0] = width
    }

    if (height) {
      size[1] = height
    }

    this.csize = size

    this.testsize = new Transitionable(size)

    this.surface = new Surface({
      properties: {
        color,
        'font-family': font,
        background,
        padding,
        'text-align': textAlignment,
        'font-size': fontSize,
        'pointer-events': 'none'
      },
      size: this.testsize,
      origin: this.origin,
      content
    })

    this.add({ align: this.align }).add(this.surface)

    this.size = this.surface.size
  },
  updateTranslation (vector, transition) {
    const [x = 0, y = 0, z = 0] = vector
    this.translation.set([x, y, z], transition)
  },
  updateRotation (rotation, transition) {
    let [degrees, x = 0, y = 0, z = 0] = rotation
    if (degrees) {
      z = degrees
    }

    this.rotation.set(
      [x * (Math.PI / 180), y * (Math.PI / 180), z * (Math.PI / 180)],
      transition
    )
  },
  updateProperties (props) {
    this.surface.setProperties(props)
  },
  setContent(content) {
    this.surface.setContent(content)    
  }
})

// function isDefaultAlignment (origin, align) {
//   return !([...origin, ...align].reduce((a, b) => a + b, 0) > 0)
// }

function getAlignment (alignment) {
  const defaults = { align: [0, 0], origin: [0, 0] }

  switch (alignment) {
    case 'topLeft':
      return { ...defaults, size: [true, true] }
    case 'topRight':
      return { align: [1, 0], origin: [1, 0], size: [true, true] }
    case 'topCenter':
      return { align: [0.5, 0], origin: [0.5, 0], size: [true, true] }
    case 'centerLeft':
      return { align: [0, 0.5], origin: [0, 0.5], size: [true, true] }
    case 'centerRight':
      return { align: [1, 0.5], origin: [1, 0.5], size: [true, true] }
    case 'center':
      return { align: [0.5, 0.5], origin: [0.5, 0.5], size: [true, true] }
    case 'bottomLeft':
      return { align: [0, 1], origin: [0, 1], size: [true, true] }
    case 'bottomRight':
      return { align: [1, 1], origin: [1, 1], size: [true, true] }
    case 'bottomCenter':
      return { align: [0.5, 1], origin: [0.5, 1], size: [true, true] }
    case 'top':
      return { ...defaults, size: [undefined, true] }
    case 'bottom':
      return { align: [0, 1], origin: [0, 1], size: [undefined, true] }
    case 'left':
      return { ...defaults, size: [true, undefined] }
    case 'right':
      return { align: [1, 0], origin: [1, 0], size: [true, undefined] }
    case 'horizontalCenter':
      return { align: [0.5, 0], origin: [0.5, 0], size: [true, undefined] }
    case 'verticalCenter':
      return { align: [0, 0.5], origin: [0, 0.5], size: [undefined, true] }
    default:
      return { ...defaults, size: [undefined, undefined] }
  }
}
