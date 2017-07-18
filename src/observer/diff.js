export default function(a, b) {
  if (!b) {
    return a
  }

  const keysA = Object.keys(a)
  const keysB = Object.keys(b)

  if (keysB.length === keysA.length) {
    for (let i = 0; i < keysA.length; i += 1) {
      const k = keysA[i]
      const ak = JSON.stringify(a[k])
      const bk = JSON.stringify(b[k])

      if (ak.length > bk.length) {
        return a[k]
      }
      if (bk.length > ak.length) {
        return b[k]
      }
    }
  }

  const key = keysB.length > keysA.length ?
  keysB.filter(x => keysA.indexOf(x) < 0) : keysA.filter(x => keysB.indexOf(x) < 0)

  return a[key] || b[key]
}
