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

export {
  create,
  index,
  show,
}

