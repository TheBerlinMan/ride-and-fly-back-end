import mongoose from "mongoose"

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  rating: {
    type: Number, 
    // required: true
  },
  review: {
    type: String, 
    // required: true
  },
  author: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
  carPals: {type: Schema.Types.ObjectId, ref: 'Profiles'}
},{
  timestamps: true,
})

const Review = mongoose.model('Review', reviewSchema)

export { Review }