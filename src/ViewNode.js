const View = require('samsarajs').Core.View
const Transform = require('samsarajs').Core.Transform
const Surface = require('samsarajs').DOM.Surface

export default View.extend({
  defaults: {
    color: undefined
  },
  initialize ({ color }) {
    if (color) {
      this.background = new Surface({
        properties: {
          background: color
        }
      })
      this.add(this.background)
    }
  },
  setTranslation (vector) {
    const [x = 0, y = 0, z = 0] = vector
    this._layoutNode.set({ transform: Transform.translate([x, y, z]) })
  },
  setClickHandler (handler) {
    const bounds = new Surface()
    setTimeout(() => this.add(bounds), 0)
    bounds.on('click', handler)
  }
})
