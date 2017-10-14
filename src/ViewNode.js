const View = require('samsarajs').Core.View
const Transform = require('samsarajs').Core.Transform
const Surface = require('samsarajs').DOM.Surface
const Transitionable = require('samsarajs').Core.Transitionable

export default View.extend({
  defaults: {
    color: undefined,
    alignment: 'default',
    translation: [undefined, undefined, undefined]
  },
  initialize ({ color, width, height, alignment, translation }) {
    this.setTranslation(translation)
    const { origin, align } = getAlignment(alignment)
    this.origin = new Transitionable(origin)
    this.align = new Transitionable(align)
    this.node = this.add({
      size: [width, height],
      align: this.align,
      origin: this.origin
    })
    if (color) {
      this.background = new Surface({
        size: [undefined, undefined],
        properties: {
          background: color
        }
      })
      this.node.add(this.background)
    }

    this.size = this.node.size
  },
  setTranslation (vector) {
    const [x = 0, y = 0, z = 0] = vector
    this._layoutNode.set({ transform: Transform.translate([x, y, z]) })
  },
  setClickHandler (handler) {
    const bounds = new Surface()
    setTimeout(() => this.add(bounds), 0)
    bounds.on('click', handler)
  },
  setAlignment (alignment) {
    // this.align.set([0.0, 0.0])
    // this.origin.set([0.0, 0.0])
  }
})

function getAlignment (align) {
  if (align === undefined) return {}

  switch (align) {
    case 'center':
      return { align: [0.5, 0.5], origin: [0.5, 0.5] }
    case 'centerLeft':
      return { align: [0, 0.5], origin: [0, 0.5] }
    case 'centerRight':
      return { align: [1, 0.5], origin: [1, 0.5] }
    case 'horizontalCenter':
      return { align: [0.5, 0], origin: [0.5, 0] }
    case 'right':
      return { align: [1, 0], origin: [1, 0] }
    case 'bottom':
      return { align: [0, 1], origin: [0, 1] }
    default:
      return { align: [0, 0], origin: [0, 0] }
  }
}
