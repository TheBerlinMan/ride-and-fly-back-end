import { Message } from "../models/message.js"

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

  const { recipient, text, relatedPost } = req.body
  const messageAuthor = req.user.profile 
  

  try {
    const newMessage = new Message({
      messageAuthor: messageAuthor,
      recipient: recipient,
      text: text,
      relatedPost: relatedPost
    })
    await newMessage.save()
    res.json(newMessage)
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