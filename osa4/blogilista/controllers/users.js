const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1 })

  response.json(users)
})


usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (password === undefined || password.length < 3) {
    return response.status(400).json({ error: 'password is either missing or too short' })

  } else {
    if ( username === undefined || username.length < 3 ) {
      return response.status(400).json({ error: 'username is either missing or too short' })

    } else {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)

      const user = new User({
        username,
        name,
        passwordHash,
        blogs: []
      })

      const savedUser = await user.save()

      response.status(201).json(savedUser)
    }
  }
})



module.exports = usersRouter