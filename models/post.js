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

const postSchema = new Schema({
  arrivalDate: {type: Date, required: true},
  arrivalTime: {type: Date, required: true},
  arrivalAirport: {type: String, required: true, enum:['EWR', 'JFK', 'LGA']},
  arrivalTerminal: {type: String, required: true},
  dropOff: {type: String, required: true},
  partySize: {type: Number, required: true},
  car: [carSchema],
  postOwner: {type: Schema.Types.ObjectId, ref: 'Profile'}
},{
  timestamps: true,
})

const Post = mongoose.model('Post', postSchema)

export { Post }
