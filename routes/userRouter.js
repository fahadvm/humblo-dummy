const express = require('express')
const router = express.Router()
const usercontroller = require("../controllers/user/usercontroller")

router.get('/', usercontroller.loadtemphome)
router.get('/coming', usercontroller.loadcomingsoon)

module.exports = router
