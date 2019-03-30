const View = require('samsarajs').Core.View
const Transform = require('samsarajs').Core.Transform
const Surface = require('samsarajs').DOM.Surface
const Transitionable = require('samsarajs').Core.Transitionable
const Stream = require('samsarajs').Streams.Stream
const GenericInput = require('samsarajs').Inputs.GenericInput

export default View.extend({
  defaults: {
    color: undefined,
    margin: undefined,
    minHeight: undefined,
    alignment: 'default',
    translation: [undefined, undefined, undefined],
    needsOutput: false,
  },
  initialize (options) {
    const {
      _opacity,
      color,
      width,
      height,
      alignment,
      translation,
      minHeight,
      margin,
      cornerRadius,
      zIndex,
      border,
      subs,
      _proportions,
      needsOutput,
    } = options

    let ancestor
    this.cachedTranslation = translation
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
        Transform.rotateZ(vector[2])
      )
    })

    const transform = Stream.lift((t, r) => Transform.compose(t, r), [
      translateTransform,
      rotateTransform
    ])

    // this._layoutNode.set({ transform })

    const { origin, align } = getAlignment(alignment)
    this.origin = new Transitionable(origin)
    this.align = new Transitionable(align)
    this.zise = new Transitionable([width, height])
    this.opacity = new Transitionable(_opacity)

    let transProps

    if(_proportions) {
      this.proportions = new Transitionable(_proportions)
      transProps = {
        transform,
        align: this.align,
        origin: this.origin,
        proportions: this.proportions
      }

    } else {
      transProps = {
        transform,
        align: this.align,
        origin: this.origin,
        size: this.zise,
      }
    }

    const trans = this.add(transProps)

    const reset = trans.add({
      origin: [0, 0],
      align: [0, 0]
    })

    ancestor = reset.add({
      opacity: this.opacity

      // align: this.align,
      // origin: this.origin
    })


    this.ancestor = ancestor

    const marginsNode = createMarginNode(margin, ancestor)

    if(subs) {
      subs.size.on('update', size => {
        if(!size) return

        this.zise.set([size[1] - 50, size[1] - 50])
      })
      // const ff = new Transitionable()

      // ff.subscribe(subs)
      // ff.on('update', g => {
      //   // console.log(g)
      //   this.rotation.set(
      //   [g.cumulate[0] * (Math.PI / 180),  g.cumulate[1]* (Math.PI / 180), 0 * (Math.PI / 180)])
      // })
    }

    if (color || border) {
      this.background = new Surface({
        size: [undefined, undefined],
        properties: {
          'z-index': zIndex,
          background: color,
          'border-radius': cornerRadius,
          border
        }
      })
      marginsNode.add(this.background)

      if(needsOutput) {
        var gestureInput = new GenericInput(
                ['mouse', 'touch']
            );
        gestureInput.subscribe(this.background);
        this.output.subscribe(gestureInput)
      }
    }

    //Total Size of the node including margins
    this.node = marginsNode

    //Size of the node without the margings
    this.size = getNodeSize(ancestor, options)
  },
  updateTranslation (vector, transition, callback) {
    if(callback) {
      console.log(vector, transition, callback)
    }
    const [x = 0, y = 0, z = 0] = vector
    this.translation.set([x, y, z], transition, callback)
  },
  setTranslation (vector) {
    const [x = 0, y = 0, z = 0] = vector
    this._layoutNode.set({ transform: Transform.translate([x, y, z]) })
  },
  updateOpacity (opacity) {
    this.opacity.set(opacity, { duration: 300 })
  },
  setEventHandler (event, handler) {
    if (this.background) {
      this.background.on(event, handler)
      this.background.setProperties({ cursor: 'pointer' })
    } else {
      this.bounds = new Surface({ properties: { cursor: 'pointer' } })
      // TODO: decide if hitTest includes margin, if not then add to margin node
      setTimeout(() => this.ancestor.add(this.bounds), 0)
      this.bounds.on(event, handler)
    }
  },
  updateRotation (rotation, transition, cb) {
    let callback = cb
    let [degrees, x = 0, y = 0, z = 0] = rotation
    
    if (degrees) {
      z = degrees
    }

    if (cb === true) {
      callback = undefined
    }

    this.rotation.set(
      [x * (Math.PI / 180), y * (Math.PI / 180), z * (Math.PI / 180)],
      transition,
      callback
    )
  },
  setAlignment (alignment) {
    // this.align.set([0.0, 0.0])
    // this.origin.set([0.0, 0.0])
  },
  updateSize(size) {
    this.zise.set(size)
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
    case 'bottomRight':
      return { align: [1, 1], origin: [1, 1] }
    case 'bottomCenter':
      return { align: [.5, 1], origin: [.5, 1] }
    default:
      return { align: [0, 0], origin: [0, 0] }
  }
}



function getNodeSize(node, options) {
  const {width, height, minHeight, margin} = options

  return node.size.map(size => {
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
