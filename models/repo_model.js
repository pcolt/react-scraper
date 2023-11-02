import mongoose from 'mongoose'

const mongo_url = process.env.MONGO_URL
  // `mongodb+srv://fullstack:${password}@cluster0.o1opl.mongodb.net/?retryWrites=true&w=majority`


mongoose.set('strictQuery',false)
mongoose.connect(mongo_url)
  .then(() => {    
    console.log('connected to MongoDB')  
  })  
  .catch((error) => {    
    console.log('error connecting to MongoDB:', error.message)  
  })

const repoMongooseSchema = new mongoose.Schema({
  id: Number,
  user: String,
  repo: String,
  url: String,
  stars: Number,
  description: String,
  topics: [],
  repoLink: String,
  commits: Number
})
repoMongooseSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const RepoMongooseModel = mongoose.model('Repo', repoMongooseSchema)

export default RepoMongooseModel