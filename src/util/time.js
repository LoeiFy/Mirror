export default function(time) {
  const months = 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(',')
  const date = new Date(time)
  const day = date.getDate()
  const index = date.getMonth()
  const year = date.getFullYear()
  return `${months[index]} ${day}, ${year}`
}