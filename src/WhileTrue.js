export default props => {
  if (props.value) {
    return [props.children]
  } else {
    return null
  }
}
