import mongoose from 'mongoose'

const Schema = mongoose.Schema

const tripSchema = new Schema({
  messages: {type: Schema.Types.ObjectId, ref: 'Message'},
  carPals: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
  ratings: {type: Schema.Types.ObjectId, ref: 'Review'},
  post: {type: Schema.Types.ObjectId, ref: 'Post'},
  isActive: {type: Boolean, default: true},

},{
  timestamps: true,
})

const Trip = mongoose.model('Trip', tripSchema)

export { Trip }