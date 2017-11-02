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
    _opacity,
    color,
    width,
    height,
    alignment,
    translation,
    minHeight,
    margin,
    cornerRadius,
    border
  }) {
    let ancestor
    this.setTranslation(translation)
    const { origin, align } = getAlignment(alignment)
    this.origin = new Transitionable(origin)
    this.align = new Transitionable(align)
    this.zise = new Transitionable([width, height])
    this.opacity = new Transitionable(_opacity)

    ancestor = this.add({
      opacity: this.opacity,
      size: this.zise,
      align: this.align,
      origin: this.origin
    })

    this.ancestor = ancestor

    const marginsNode = createMarginNode(margin, ancestor)

    if (color || border) {
      this.background = new Surface({
        size: [undefined, undefined],
        properties: {
          background: color,
          'border-radius': cornerRadius,
          border
        }
      })
      marginsNode.add(this.background)
    }

    this.node = marginsNode

    this.size = ancestor.size.map(size => {
      if (!size) return false
      let marginsArray = []
      let topAndBottomMargin = 0
      let leftAndRightMargin = 0
      if (margin) {
        marginsArray = parseStringMargin(margin)

        if (marginsArray.length === 1) {
          topAndBottomMargin = marginsArray[0] * 2
          leftAndRightMargin = marginsArray[0] * 2
        }
        if (marginsArray.length === 2) {
          topAndBottomMargin = marginsArray[1] * 2
          leftAndRightMargin = marginsArray[0] * 2
        }
        if (marginsArray.length === 3) {
          topAndBottomMargin = marginsArray[1] * 2
          leftAndRightMargin = marginsArray[0] + marginsArray[2]
          // console.log(marginsArray, leftAndRightMargin)
        }
        if (marginsArray.length === 4) {
          topAndBottomMargin = marginsArray[1] + marginsArray[3]
          leftAndRightMargin = marginsArray[0] + marginsArray[2]
        }
      }
      if (minHeight && size[1] < minHeight) {
        size[1] = minHeight
      }

      if (width) {
        size[0] = size[0] + leftAndRightMargin
      }
      if (height) {
        size[1] = size[1] + topAndBottomMargin
      }

      return size
    })
  },
  setTranslation (vector) {
    const [x = 0, y = 0, z = 0] = vector
    this._layoutNode.set({ transform: Transform.translate([x, y, z]) })
  },
  updateOpacity (opacity) {
    this.opacity.set(opacity, { duration: 300 })
  },
  setEventHandler (event, handler) {
    if (this.bounds) {
      this.bounds.on(event, handler)
    } else {
      this.bounds = new Surface({ properties: { cursor: 'pointer' } })
      // TODO: decide if hitTest includes margin, if not then add to margin node
      setTimeout(() => this.ancestor.add(this.bounds), 0)
      this.bounds.on(event, handler)
    }
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

function parseStringMargin (string) {
  return string
    .split(' ')
    .filter(substr => substr.length > 0)
    .map(str => parseFloat(str))
    .filter(number => !isNaN(number))
}

function createMarginNode (margins, node) {
  if (!margins) return node
  const marginsArray = parseStringMargin(margins)

  const length = marginsArray.length
  let leftTop
  switch (length) {
    case 4:
      leftTop = node.add({
        margins: [marginsArray[0] / 2, marginsArray[1] / 2],
        origin: [1, 1],
        align: [1, 1]
      })
      return leftTop.add({
        size: [undefined, undefined],
        margins: [marginsArray[2] / 2, marginsArray[3] / 2]
      })
    case 3:
      leftTop = node.add({
        margins: [marginsArray[0] / 2, marginsArray[1]],
        origin: [1, 0.5],
        align: [1, 0.5]
      })

      return leftTop.add({
        margins: [marginsArray[2] / 2, 0]
      })
    case 2:
      return node.add({
        margins: [marginsArray[0], marginsArray[1]],
        origin: [0.5, 0.5],
        align: [0.5, 0.5]
      })
    case 1:
      return node.add({
        margins: [marginsArray[0], marginsArray[0]],
        origin: [0.5, 0.5],
        align: [0.5, 0.5]
      })
    default:
      return node
  }
}
