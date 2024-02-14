import { Conversation } from "../models/conversation.js"
import { Message } from "../models/message.js";


async function showConvo(req,res){
  const { conversationId } = req.params;
  try {
    const conversation = await Conversation.findById(conversationId)
    .populate('messageAuthor', 'name')
    .populate('recipient', 'name')
    .populate('messages', 'text')
    .sort({ createdAt: 1 })
    res.json(conversation)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function allConvos(req,res){
  try {
    const convos = await Conversation.find({})
    .populate('messageAuthor', 'name')
    .populate('recipient', 'name')
    .sort({createdAt: 'desc'})
    res.status(200).json(convos)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}


export {
  showConvo,
  allConvos,
}