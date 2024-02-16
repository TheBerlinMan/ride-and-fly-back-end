import { Profile } from "../models/profile.js"
import { Trip } from "../models/trip.js"

async function create(req, res) {
  try {
    req.body.author = req.user.profile
    console.log(req.body);
    const trip = await Trip.create(req.body)
    await Profile.updateMany(
      { _id: { $in: req.body.carPals }},
      { $push: { trips: trip._id }},
      { new: true }
    )
    res.status(201).json(trip)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}

async function index (req,res) {
  try {
    const trips = await Trip.find({})
    .populate(['carPals', 'post'])
    //add review to populate 
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
    .populate(['post', 'carPals'])
    res.status(200).json(trip)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function updateTripStatus(req, res){
  try {
    const trip = await Trip.findById(req.params.tripId)
    trip.isActive = false
    trip.isComplete = true
    await trip.save()
    res.status(200).json(trip)
    console.log("This is trip: ", trip )
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function deleteTrip(req, res) {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.tripId)
    await Profile.updateMany(
      { trips: req.params.tripId },
      { $pull: { trips: req.params.tripId }},
    )
    res.json({ message: "Trip deleted successfully", trip })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}




export {
  create,
  index,
  show,
  updateTripStatus,
  deleteTrip as delete
}

