import { Controller } from 'cerebral'

function changeTitle ({ state }) {
  state.set('size', { width: 200, height: 150 })
}

function removeItem ({ state }) {
  state.shift('items')
}

function addItem ({ state }) {
  state.push('items', { text: 'new panel', color: 'red' })
}

export default Controller({
  state: {
    size: { width: 500, height: 400 },
    location: { x: 0, y: 0 },
    items: [
      { text: 'panel1', color: 'green' },
      { text: 'panel2', color: 'purple' }
    ]
  },
  signals: {
    titleChanged: changeTitle,
    removedItem: removeItem,
    itemAdded: addItem
  }
})
