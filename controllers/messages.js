import { Message } from "../models/message.js"

async function indexInbox(req, res){

  try {

    const profileId = req.user.profile._id
    const messages = await Message.find({
      // $or is the mongoDB query operator used to perform 'OR'
      // a comma would have performed 'AND'
      $or: [ { messageAuthor: profileId } , { recipient: profileId }]
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
  // still testing in postman - taking a break.
  const recipient = req.body.recipient
  const text = req.body.text
  const messageAuthor = req.user.profile._id
  const originalPost = req.body.postId

  try {
    const newMessage = new Message({
      messageAuthor: messageAuthor,
      recipient: recipient,
      text: text,
      originalPost: originalPost
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