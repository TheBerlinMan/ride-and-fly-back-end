import { Profile } from "../models/profile.js"
import { Post } from "../models/post.js"

async function create(req, res) {
  try {
    req.body.author = req.user.profile
    const post = await Post.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { posts: post } },
      { new: true }
    )
    post.author = profile
    res.status(201).json(post)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function index (req,res) {
  try {
    const posts = await Post.find({})
    .populate('author')
    .sort({createdAt: 'desc'})
    res.status(200).json(posts)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function show(req, res) {
  try {
    const post = await Post.findById(req.params.postId)
    .populate(['author'])
    res.status(200).json(post)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function update(req, res){
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.postId,
      req.body,
      { new: true }
    ).populate('author')
    res.status(200).json(post)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function deletePost(req, res) {
  try {
    const post = await Post.findByIdAndDelete(req.params.postId)
    const profile = await Profile.findById(req.user.profile)
    profile.post.remove({ _id: req.params.postId })
    await profile.save()
    res.json(post)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}


async function sendMessage(req,res){

  try {
    req.body.author = req.user.profile
    const post = await Post.findById(req.params.postId)
    post.messages.push(req.body)
    await post.save()

    const newMessage = post.messages[post.messages.length - 1]
    const profile = await Profile.findById(req.user.profile)
    newMessage.messageAuthor = profile
    res.status(201).json(newMessage)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}


async function sendMessage2(req,res){

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
  create,
  index,
  show,
  update,
  deletePost as delete,
  sendMessage
}

