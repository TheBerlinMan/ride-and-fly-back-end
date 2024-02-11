import { Message } from "../models/message.js"

async function indexInbox(req, res){

  try {

    const profileId = req.profile._id
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


export {
  indexInbox,
}