import mongoose from "mongoose"

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  rating: {
    type: Number, 
    // required: true
    enum:['1', '2', '3', '4', '5']
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