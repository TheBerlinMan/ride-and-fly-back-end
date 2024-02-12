import mongoose from 'mongoose'

const Schema = mongoose.Schema

const tripSchema = new Schema({
  messages: {type: Schema.Types.ObjectId, ref: 'Messages'},
  carPals: {type: Schema.Types.ObjectId, ref: 'Profiles'},
  ratings: {type: Schema.Types.ObjectId, ref: 'Reviews'},
  posts: {type: Schema.Types.ObjectId, ref: 'Post'},

},{
  timestamps: true,
})

const Trip = mongoose.model('Trip', messageSchema)

export { Trip }