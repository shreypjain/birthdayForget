const express = require('express')
const friendController = require('../controllers/friend.controller')

router = express.Router()

router
    .route("/")
    .get(friendController.getBirthdays)

module.exports = router