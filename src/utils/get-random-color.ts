export default function getRandomColor() {
    const colors = ['yellow', 'red', 'blue', 'green']
    const colorIndex = Math.floor(Math.random() * colors.length)
    return colors[colorIndex]
  }