const express = require("express");


const router = express.Router();
const multer = require('multer');

const { getProfile,getMatchingData,addChat,getChatData } = require("../controllers/homeContoller");

// Set up multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/getProfile",getProfile);
router.post('/getmatchdata',getMatchingData);
router.post('/addchat',addChat);
router.post('/getchatdata',getChatData);
module.exports = router;
