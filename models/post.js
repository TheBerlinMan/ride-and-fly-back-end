import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  review: {
    type: String, 
    required: true
  },
  rating: {
    type: String,
  },
  author: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
},{
  timestamps: true,
})

const postSchema = new Schema(
  {
    date: {
      type: Date, 
      required: true
    },
    time: {
      type: String, 
      required: true
    },
    airport: {
      type: String, 
      required: true, 
      enum:['EWR', 'JFK', 'LGA']
    },
    terminal: {
      type: String, 
      required: true
    },
    dropOff: {
      type: String, 
      required: true
    },
    partySize: {
      type: Number, 
      required: true
    },
    reviews: [reviewSchema],
    author: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
    luxuryCar: { type: Boolean},
    oversizedLuggage: { type: Boolean},
    travelingWithPet: {type: Boolean},
    carType: {type: String},


    
},{
  timestamps: true,
})

const Post = mongoose.model('Post', postSchema)

export { Post }
