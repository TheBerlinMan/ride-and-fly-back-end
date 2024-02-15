import { Profile } from "../models/profile"
import { Review } from "../models/review"

// async function index (req, res) {
//   try {
//     const reviews = await Review.find({})
//     .populate('author')
//     .sort({createdAt: 'desc'})
//     res.status(200).json(reviews)
//   } catch (error) {
//     console.log(error)
//     res.status(500).json(error)
//   }
// }

// async function show(req, res) {
//   try {
//     const review = await Review.findById(req.params.reviewId)
//     .populate(['author'])
//     res.status(200).json(review)
//   } catch (error) {
//     console.log(error)
//     res.status(500).json(error)
//   }
// }

async function create(req, res) {
  try {
    req.body.author = req.user.profile
    const review = await Review.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { reviews: review } },
      { new: true }
    )
    review.author = profile
    res.status(201).json(review)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export {
  // index,
  // show,
  create
}
