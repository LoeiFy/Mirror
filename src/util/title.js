export default function(title) {
  return title.split(/\[.*?\]/g).join('')
}