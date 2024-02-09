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
    blog.author = profile
    res.status(201).json(blog)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export {
  create,
}

