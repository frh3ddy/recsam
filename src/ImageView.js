const View = require('samsarajs').Core.View
const Transform = require('samsarajs').Core.Transform
const Surface = require('samsarajs').DOM.Surface
const Transitionable = require('samsarajs').Core.Transitionable
// const Timer = require('samsarajs').Core.Timer

// const Stream = require('samsarajs').Streams.Stream

export default View.extend({
  defaults: {
    alignment: 'default'
  },
  initialize ({
    _opacity,
    color,
    width,
    height,
    contentAlignment,
    translation,
    alignment,
    file,
    padding
  }) {
    this.cachedOpacity = _opacity
    // let deployed = false
    const [x = 0, y = 0, z = 0] = translation
    this.translation = new Transitionable([x, y, z])
    const translate = this.translation.map(vector =>
      Transform.compose(Transform.translate(vector), Transform.inFront)
    )
    this._layoutNode.set({ transform: translate })
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

    this.opacity = new Transitionable(_opacity)

    if (width) {
      size[0] = width
    }

    if (height) {
      size[1] = height
    }

    this.surface = new Surface({
      opacity: this.opacity,
      tagName: 'img',
      properties: {
        background: color,
        padding,
        'text-align': contentAlignment
      },
      attributes: {
        src: file
      },
      size: size,
      origin: this.origin
    })

    // const hhh = Timer.debounce(() => {
    //   deployed = true
    //   this.opacity.set(_opacity)
    // }, 99)

    // this.surface.layout.on('end', () => {
    //   if (deployed) return
    //   hhh()
    // })

    this.add({ align: this.align }).add(this.surface)

    this.size = this.surface.size
  },
  updateProperties (props) {
    this.surface.setProperties(props)
  },
  updateCachedOpacity (opacity) {
    this.cachedOpacity = opacity
  },
  updateOpacity (opacity, transition, setPermament) {
    if (setPermament) this.updateCachedOpacity(opacity)
    this.opacity.set(opacity, transition)
  },
  updateAttributes (props) {
    this.surface.setAttributes(props)
  },
  updateTranslation (vector, transition) {
    const [x = 0, y = 0, z = 0] = vector
    this.translation.set([x, y, z], transition)
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
