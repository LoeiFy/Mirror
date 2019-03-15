export default (tag, params) => {
  const ele = document.createElement(tag)

  Object.keys(params).forEach((key) => {
    ele[key] = params[key]
  })

  return ele
}
