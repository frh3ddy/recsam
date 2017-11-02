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

function changeActive ({ state, props }) {
  const links = state.get('navLinks')
  Object.keys(links).forEach(link => {
    if (link === props.link) {
      links[link] = { active: true }
    } else {
      links[link] = { active: false }
    }
  })

  state.set('navLinks', links)
}

export default Controller({
  state: {
    navLinks: {
      Home: { active: false },
      Portfolio: { active: false },
      About: { active: false },
      Services: { active: false },
      Blog: { active: false },
      Contact: { active: false }
    },
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
    itemAdded: addItem,
    navLinkClicked: changeActive
  }
})
