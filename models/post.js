import mongoose from 'mongoose'

const Schema = mongoose.Schema


const carSchema = new Schema(
  {
    luxury: Boolean,
    oversizedLuggage: Boolean,
    pet: Boolean,
    carType: String,
      
  }
)

const postSchema = new Schema(
  {
    date: {
      type: Date, 
      // required: true
    },
    time: {
      type: Date, 
      // required: true
    },
    airport: {
      type: String, 
      // required: true, 
      enum:['EWR', 'JFK', 'LGA']
    },
    terminal: {
      type: String, 
      // required: true
    },
    dropOff: {
      type: String, 
      // required: true
    },
    partySize: {
      type: Number, 
      // required: true
    },
    car: [carSchema],
    author: {
      type: Schema.Types.ObjectId, 
      ref: 'Profile'
    }
},{
  timestamps: true,
})

const Post = mongoose.model('Post', postSchema)

export { Post }
