import { Message } from "../models/message.js"
import { Conversation } from "../models/conversation.js"

async function indexInbox(req, res){

  try {

    const profileId = req.user.profile
    const messages = await Message.find({
      // $or is the mongoDB query operator used to perform 'OR'
      // a comma would have performed 'AND'
      $or: [ { messageAuthor: profileId } , { recipient: profileId } ]
    })
    .populate('messageAuthor', 'name') 
    .populate('recipient', 'name') 
    .sort({ createdAt: 'desc' }) 
    res.json(messages)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}


async function sendMessage(req,res){

  try {
    const { recipient, text, relatedPost } = req.body
    const messageAuthor = req.user.profile 
    
    let conversation = await Conversation.findOne({
      participants: { $all: [messageAuthor, recipient] },
      relatedPost
    })
  
    if (!conversation) {
      conversation = new Conversation({
        participants: [messageAuthor, recipient],
        messageAuthor,
        recipient,
        relatedPost
      })
      await conversation.save()
    }
    const newMessage = new Message({
      messageAuthor,
      recipient,
      text,
      relatedPost,
      conversation: conversation._id
    })
    await newMessage.save()

    const updatedConvo = await Conversation.findByIdAndUpdate(
      conversation._id,
      { $push: {messages: newMessage._id} },
      { new: true}
    )
    res.json({newMessage, updatedConvo})
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export {
  indexInbox,
  sendMessage,
}


// click into message, from inbox
// see messages log