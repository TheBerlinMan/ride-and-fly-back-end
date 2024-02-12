import { Profile } from "../models/profile.js"
import { Trip } from "../models/trip.js"

async function create(req, res) {
  try {
    req.body.author = req.user.profile
    const trip = await Trip.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { trips: trip } },
      { new: true }
    )
    trip.author = profile
    res.status(201).json(trip)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function index (req,res) {
  try {
    const trips = await Trip.find({})
    .populate('author')
    .sort({createdAt: 'desc'})
    res.status(200).json(trips)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function show(req, res) {
  try {
    const trip = await Trip.findById(req.params.tripId)
    .populate(['author'])
    res.status(200).json(trip)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function update(req, res){
  try {
    const trip = await Trip.findByIdAndUpdate(
      req.params.tripId,
      req.body,
      { new: true }
    ).populate('author')
    res.status(200).json(trip)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function deleteTrip(req, res) {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.tripId)
    const profile = await Profile.findById(req.user.profile)
    profile.trip.remove({ _id: req.params.tripId })
    await profile.save()
    res.json(trip)
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
  deleteTrip as delete
}

