import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
// const loginRouter = require('express').Router()
import express from 'express'
const loginRouter = express.Router()
import UserModel from '../models/user_model'

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await UserModel.findOne({ username })          // search user in db
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)       // check password

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(           // generate token if login succesfull with expire time 1h
    userForToken,
    process.env.SECRET,
    { expiresIn: 60*60 }
  )

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

// module.exports = loginRouter
export default loginRouter