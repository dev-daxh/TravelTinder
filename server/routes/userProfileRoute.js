const express = require("express");
const {userCreate,getUsers,uploadProfileImage,uploadAadharImage} = require('../controllers/userController');
const router = express.Router();
const multer = require('multer');

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/create-user', userCreate);
router.get('/get-users', getUsers);
router.post('/upload-aadhar', upload.single('image'), uploadProfileImage); // New Route
router.post('/upload-profile', upload.single('image'), uploadAadharImage); // New Route


module.exports = router;