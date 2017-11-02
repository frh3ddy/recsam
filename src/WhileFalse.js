export default props => {
  if (props.value === false) {
    return [props.children]
  } else {
    return null
  }
}
