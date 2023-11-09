const jobsRouter = require('express').Router()
const verifyToken = require('../utils/verify_token')
// const UserModel = require('../models/user_model')

/**
 * Check user's token is valid and then
 * TODO: subscribe a new job to Redis db 
 */
jobsRouter.post('/', async (request, response, next) => {
  try {
    const decodedToken = verifyToken(request)


    // const body = request.body

    // const user = await User.findById(decodedToken.id)
    // const note = new Note({
    //   content: body.content,
    //   important: body.important === undefined ? false : body.important,
    //   user: user._id
    // })

    // const savedNote = await note.save()
    // user.notes = user.notes.concat(savedNote._id)
    // await user.save()

    response.json({
      decodedToken: decodedToken
    })
  } catch (exception) {
    next(exception)
  }
})

module.exports = jobsRouter