function ShowingComponent({ children, show = false }) {
  return show ? children : null
}

export default ShowingComponent