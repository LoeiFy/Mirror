export dafault function(time) {
  const months = 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(',')
  const data = new Date(time)
  const day = data.getDate()
  const index = data.getMonth()
  const year = data.getFullYear()
  return `${months[index]} ${day}, ${year}`
}