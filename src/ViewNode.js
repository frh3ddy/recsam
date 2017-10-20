const View = require('samsarajs').Core.View
const Transform = require('samsarajs').Core.Transform
const Surface = require('samsarajs').DOM.Surface
const Transitionable = require('samsarajs').Core.Transitionable

export default View.extend({
  defaults: {
    color: undefined,
    margin: undefined,
    minHeight: undefined,
    alignment: 'default',
    translation: [undefined, undefined, undefined]
  },
  initialize ({
    color,
    width,
    height,
    alignment,
    translation,
    minHeight,
    margin
  }) {
    // this.marginLeft = new Transitionable(0)
    // this.marginTop = new Transitionable(0)
    // this.marginRight = new Transitionable(0)
    // this.marginBottom = new Transitionable(0)
    // console.log(getMargins(margin, this))

    let ancestor
    this.setTranslation(translation)
    const { origin, align } = getAlignment(alignment)
    this.origin = new Transitionable(origin)
    this.align = new Transitionable(align)
    this.zise = new Transitionable([width, height])

    ancestor = this.add({
      size: this.zise,
      align: this.align,
      origin: this.origin
    })

    const marind = getMargins(margin, ancestor)

    if (color) {
      this.background = new Surface({
        size: [undefined, undefined],
        properties: {
          background: color
        }
      })
      marind.add(this.background)
    }

    this.node = marind

    this.size = ancestor.size.map(size => {
      if (!size) return
      if (minHeight && size[1] < minHeight) {
        size[1] = minHeight
      }
      return size
    })
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

function getMargins (margins, node) {
  if (!margins) return node
  const marginsArray = margins.split(' ')
  const marginsNumber = marginsArray
    .filter(margin => margin.length > 0)
    .map(m => parseFloat(m))
    .filter(n => !isNaN(n))

  switch (true) {
    case marginsNumber.length === 4:
      return convertMargin(marginsNumber, node)
    case marginsNumber.length === 3:
      return convertMargin(marginsNumber, node)
    case marginsNumber.length === 2:
      return convertMargin(marginsNumber, node)
    case marginsNumber.length === 1:
      return convertMargin(marginsNumber, node)
    default:
      return node
  }
}

function convertMargin (margins, node) {
  const length = margins.length
  let leftTop
  switch (length) {
    case 4:
      leftTop = node.add({
        margins: [margins[0] / 2, margins[1] / 2],
        origin: [1, 1],
        align: [1, 1]
      })
      return leftTop.add({
        size: [undefined, undefined],
        margins: [margins[2] / 2, margins[3] / 2]
      })
    case 3:
      leftTop = node.add({
        margins: [margins[0] / 2, margins[1]],
        origin: [1, 0.5],
        align: [1, 0.5]
      })

      return leftTop.add({
        margins: [margins[2] / 2, 0]
      })
    case 2:
      return node.add({
        margins: [margins[0], margins[1]],
        origin: [0.5, 0.5],
        align: [0.5, 0.5]
      })
    case 1:
      return node.add({
        margins: [margins[0], margins[0]],
        origin: [0.5, 0.5],
        align: [0.5, 0.5]
      })
    default:
      return node
  }
  // const letfRight = margins[0] + margins[2]
  // const topBottom = margins[1] + margins[3]
  // return [letfRight, topBottom]
}

// if (!margins) {
//   return [0, 0, 0, 0];
// }
// else if (!Array.isArray(margins)) {
//   return [margins, margins, margins, margins];
// }
// else if (margins.length === 0) {
//   return [0, 0, 0, 0];
// }
// else if (margins.length === 1) {
//   return [margins[0], margins[0], margins[0], margins[0]];
// }
// else if (margins.length === 2) {
//   return [margins[0], margins[1], margins[0], margins[1]];
// }
// else {
//   return margins;
// }
