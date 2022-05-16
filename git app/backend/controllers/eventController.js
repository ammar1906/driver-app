const asyncHandler = require('express-async-handler')

const Event = require('../models/eventModel')
const User = require('../models/userModel')

// @desc    Get event
// @route   GET /api/event

// @access  Private
const getEvent = asyncHandler(async (req, res) => {
  const events = await Event.find({ user: req.user.id })

  res.status(200).json(events)
})

// @desc    Set EVENT
// @route   POST /api/goals
// @access  Private
const setEvent = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const event = await Event.create({
    text: req.body.text,
    user: req.user.id,
  })

  res.status(200).json(event)
})

// @desc    Update EVENT
// @route   PUT /api/goals/:id
// @access  Private
const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)

  if (!event) {
    res.status(400)
    throw new Error('event not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (event.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedEvent)
})

// @desc    Delete EVENT
// @route   DELETE /api/goals/:id
// @access  Private
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)

  if (!event) {
    res.status(400)
    throw new Error('event not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (event.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await event.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getEvent,
  setEvent,
  updateEvent,
  deleteEvent,
}
