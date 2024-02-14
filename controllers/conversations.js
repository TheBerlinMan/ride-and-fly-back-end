import { Conversation } from "../models/conversation.js"
import { Message } from "../models/message.js";


async function showConvo(req,res){
  const { conversationId } = req.params;
  try {
    const messages = await Message.find({ conversation: conversationId})
    .populate('messageAuthor', 'name')
    .populate('recipient', 'name')
    .sort({ createdAt: 1 })
    res.json(messages)
    // this seems to be the code because I am pulling messages into the inbox, not conversations. might have to adjust later.
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}


export {
  showConvo,
}