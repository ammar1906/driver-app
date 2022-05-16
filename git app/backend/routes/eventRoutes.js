const express = require('express')
const router = express.Router()
const {
  getEvent,
  setEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getEvent).post(protect, setEvent)
router.route('/:id').delete(protect, deleteEvent).put(protect, updateEvent)

module.exports = router
