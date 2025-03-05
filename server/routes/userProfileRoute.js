const express = require("express");
const {userCreate,getUsers} = require('../controllers/userController');
const router = express.Router();

router.post("/create-user",userCreate)
router.get('/get-user',getUsers)
module.exports = router;
