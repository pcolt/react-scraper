import bcrypt from 'bcrypt'
const usersRouter = require('express').Router()
import UserModel from '../models/user_model'
import logger from '../utils/logger'

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

  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch(e) {
    logger.info('error:', e)
    response.status(400).json({
      error: e.message
    })
  }
})

usersRouter.get('/', (request, response) => {        // backend root to retrieve all users from mongoDB
  UserModel.find({}).then(users => {
    logger.info('Users retrieved')
    response.json(users)
  })
})

export default usersRouter
// module.exports = usersRouter