const express = require("express");
const {userCreate,getUsers,uploadImage} = require('../controllers/userController');
const router = express.Router();
const multer = require('multer');

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/create', userCreate);
router.get('/get-users', getUsers);
router.post('/upload-img', upload.single('image'), uploadImage); // New Route

module.exports = router;