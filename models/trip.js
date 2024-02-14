import mongoose from 'mongoose'

const Schema = mongoose.Schema

const tripSchema = new Schema({
  messages: {type: Schema.Types.ObjectId, ref: 'Messages'},
  carPals: [{type: Schema.Types.ObjectId, ref: 'Profiles'}],
  ratings: {type: Schema.Types.ObjectId, ref: 'Reviews'},
  post: {type: Schema.Types.ObjectId, ref: 'Post'},

},{
  timestamps: true,
})

const Trip = mongoose.model('Trip', tripSchema)

export { Trip }