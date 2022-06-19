const dummy = (blogs) => {
  blogs * 1
  return Number(1)
}

const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, current) => {
    return sum + current.likes
  }, 0)
  return total
}

const mostLikes = (blogs) => {
  const sorted = blogs.sort((a, b) => {
    return b.likes - a.likes
  })
  const temp = {
    author: sorted[0].author,
    likes: sorted[0].likes,
    title: sorted[0].title
  }
  return temp
}

module.exports = {
  dummy,
  totalLikes,
  mostLikes
}