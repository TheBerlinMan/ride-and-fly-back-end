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


// async function sendMessage(req,res){

//   try {
//     const { recipient, text, relatedPost, conversationId } = req.body
//     const messageAuthor = req.user.profile 
    
    
//     let conversation = await Conversation.findOne({
//       participants: { $all: [messageAuthor, recipient] },
//       relatedPost,
//       conversationId
//     })

//     // let conversation = await Conversation.findById(conversationId)

//     console.log(conversation);
//     if (!conversation) {
//       conversation = new Conversation({
//         participants: [messageAuthor, recipient],
//         messageAuthor,
//         recipient,
//         relatedPost
//       })
//       await conversation.save()
//     }
//     const newMessage = new Message({
//       messageAuthor,
//       recipient,
//       text,
//       relatedPost,
//       conversation: conversation._id
//     })
//     await newMessage.save()

//     const updatedConvo = await Conversation.findByIdAndUpdate(
//       conversation._id,
//       { $push: {messages: newMessage._id} },
//       { new: true}
//     )
//     res.json({newMessage, updatedConvo})
//   } catch (error) {
//     console.log(error)
//     res.status(500).json(error)
//   }
// }

async function sendMessage(req, res) {
  try {
    const { recipient, text, relatedPost, conversationId } = req.body;
    const messageAuthor = req.user.profile;
    
    // Initialize conversation variable
    let conversation;

    // If conversationId is provided, try to find the existing conversation
    if (conversationId) {
      conversation = await Conversation.findById(conversationId);
    }

    // If no existing conversation, optionally create a new one (or handle as error)
    if (!conversation) {
      // Depending on your application logic, you might want to return an error instead
      // return res.status(404).json({ message: "Conversation not found" });
      
      // Or create a new conversation if that's the intended behavior
      conversation = new Conversation({
        participants: [messageAuthor, recipient],
        relatedPost,
        // Not including messageAuthor and recipient if using participants array
      });
      await conversation.save();
    }

    // Create the new message linked to the found or newly created conversation
    const newMessage = new Message({
      messageAuthor,
      recipient,
      text,
      relatedPost,
      conversation: conversation._id, // Ensure this uses the found or new conversation's ID
    });
    await newMessage.save();

    // Optionally, update the conversation with the new message's ID
    // Assuming your Conversation model has a messages field to store message IDs
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


// click into message, from inbox
// see messages log