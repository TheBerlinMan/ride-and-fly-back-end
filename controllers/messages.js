import { Message } from "../models/message.js"
import { Conversation } from "../models/conversation.js"

async function indexInbox(req, res){

  try {

    const profileId = req.user.profile
    const messages = await Message.find({
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


async function sendMessage(req, res) {
  try {
    const { recipient, text, relatedPost, conversationId } = req.body
    const messageAuthor = req.user.profile
    
    let conversation

    if (conversationId) {
      conversation = await Conversation.findById(conversationId)
    }

    if (!conversation) {
      
      conversation = new Conversation({
        participants: [messageAuthor, recipient],
        relatedPost,
      });
      await conversation.save()
    }

    const newMessage = new Message({
      messageAuthor,
      recipient,
      text,
      relatedPost,
      conversation: conversation._id, 
    })
    await newMessage.save()

    await Conversation.findByIdAndUpdate(
      conversation._id,
      { $push: { messages: newMessage._id } },
      { new: true }
    );

    res.json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send message", error });
  }
}


export {
  indexInbox,
  sendMessage,
}

