import mongoose from 'mongoose'

const Schema = mongoose.Schema

const messageSchema = new Schema({
  messageAuthor: {type: Schema.Types.ObjectId, ref: 'Profile'},
  recipient: {type: Schema.Types.ObjectId, ref: 'Profile'},
  refPost: {type: Schema.Types.ObjectId, ref: 'Post'},
  text: {type: String, required: true},
},{
  timestamps: true,
})

const Message = mongoose.model('Message', messageSchema)

export { Message }
