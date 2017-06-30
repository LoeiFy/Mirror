export default function(a, b) {
  const keysA = Object.keys(a)
  const keysB = Object.keys(b)
  const key = keysB.length > keysA.length ?
  keysB.filter(x => keysA.indexOf(x) < 0) : keysA.filter(x => keysB.indexOf(x) < 0)

  return a[key] || b[key]
}