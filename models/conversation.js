import mongoose from 'mongoose'

const Schema = mongoose.Schema

const conversationSchema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
  relatedPost: { type: Schema.Types.ObjectId, ref: 'Post' },
  messageAuthor: {type: Schema.Types.ObjectId, ref: 'Profile'},
  recipient: {type: Schema.Types.ObjectId, ref: 'Profile'},
  messages: [{type: Schema.Types.ObjectId, ref: 'Message'}],
  
}, { 
  timestamps: true
})

const Conversation = mongoose.model('Conversation', conversationSchema)

export { Conversation }
