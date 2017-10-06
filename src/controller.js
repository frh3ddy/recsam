import {Controller} from 'cerebral'

function changeTitle({state}) {
    state.toggle('title')
}


export default Controller({
  state: {
    title: true
  },
  signals: {
      titleChanged: changeTitle
  }
})