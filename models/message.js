import mongoose from 'mongoose'

const Schema = mongoose.Schema


const messageSchema = new Schema({
  text: {type: String, required: true},
  messageAuthor: {type: Schema.Types.ObjectId, ref: 'Profile'},
  recipient: {type: Schema.Types.ObjectId, ref: 'Profile'},
  // relatedPost: {type: Schema.Types.ObjectId, ref: 'Post'},
  conversation: {type: Schema.Types.ObjectId, ref: 'Conversation'}
},{
  timestamps: true,
})

const Message = mongoose.model('Message', messageSchema)

export { Message }
