export default function(time = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}