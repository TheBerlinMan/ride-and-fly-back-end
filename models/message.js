import mongoose from 'mongoose'

const Schema = mongoose.Schema

const conversationSchema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  relatedPost: { type: Schema.Types.ObjectId, ref: 'Post' },
}, { 
  timestamps: true
})


const messageSchema = new Schema({
  text: {type: String, required: true},
  messageAuthor: {type: Schema.Types.ObjectId, ref: 'Profile'},
  recipient: {type: Schema.Types.ObjectId, ref: 'Profile'},
  relatedPost: {type: Schema.Types.ObjectId, ref: 'Post'},
  conversation: conversationSchema
},{
  timestamps: true,
})

const Message = mongoose.model('Message', messageSchema)

export { Message }
