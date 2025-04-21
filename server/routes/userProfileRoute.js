const express = require("express");
const {userCreate,getUsers,checkUserByEmail,uploadProfileImage,updateImage} = require('../controllers/userController');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
// Set up multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/create-user', userCreate);
router.get('/get-users', getUsers);
router.post('/upload-img', upload.single('image'), uploadProfileImage); // New Route
router.post('/search-user', checkUserByEmail); // New Route
router.post('/update-img', upload.single('image'), updateImage);
module.exports = router;