import mongoose from 'mongoose'

const Schema = mongoose.Schema

const conversationSchema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  relatedPost: { type: Schema.Types.ObjectId, ref: 'Post' },
}, { 
  timestamps: true
})

const Conversation = mongoose.model('Conversation', conversationSchema)

export { Conversation }
