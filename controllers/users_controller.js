const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const UserModel = require('../models/user_model')
// const logger = require('../utils/logger')

usersRouter.post('/', async (request, response) => {
  // console.log('request.body:', request.body)
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new UserModel({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
  // response.status(201).json({
  // hello: 'hello'
  // })
})

// export { usersRouter }
module.exports = usersRouter