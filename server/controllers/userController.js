const db = require('../config/firebase');

const cloudinary = require('../config/img');
const multer = require('multer');


// Configure Multer to store file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });


// const userCreate = (req, res) => {
//     console.log('Request body:', req.body);  // Check if the body is coming through

//     // Destructure the required fields from the request body
//     const { firstName, lastName, age, dob, gender, bio } = req.body;

//     // Validate required fields
//     if (!firstName || !lastName || !age || !dob || !gender) {
//         return res.status(400).json({ message: "All fields are required (firstName, lastName, age, dob, gender)" });
//     }

//     // Insert the user data into the database
//     db.execute(
//         'INSERT INTO users (firstName, lastName, age, dob, gender, bio) VALUES (?, ?, ?, ?, ?, ?)',
//         [firstName, lastName, age, dob, gender, bio || null], // Bio is optional
//         (error, result) => {
//             if (error) {
//                 console.error('Error inserting user:', error.message);  // Log detailed error message
//                 return res.status(500).json({
//                     message: 'Error creating user',
//                     error: error.message || 'Unknown error'
//                 });
//             }

//             console.log('Database result:', result);  // Check if insertion is successful
//             const insertId = result?.insertId || null;

//             res.status(201).json({
//                 message: 'User created successfully',
//                 userId: insertId, // Return the ID of the newly created user
//             });
//         }
//     );
// };

// const userCreate = (req, res) => {
//     console.log('Request body:', req.body);

//     const { firstName, lastName, age, dob, gender, bio } = req.body;

//     if (!firstName || !lastName || !age || !dob || !gender) {
//         return res.status(400).json({ message: "All fields are required (firstName, lastName, age, dob, gender)" });
//     }

//     const usersRef = db.ref('users');  // This should now work

//     const newUser = {
//         firstName,
//         lastName,
//         age,
//         dob,
//         gender,
//         bio: bio || null
//     };

//     const newUserRef = usersRef.push(newUser, (error) => {
//         if (error) {
//             console.error('Error creating user:', error.message);
//             return res.status(500).json({
//                 message: 'Error creating user',
//                 error: error.message || 'Unknown error'
//             });
//         }

//         const emailId = newUserRef.key;  // This is the unique identifier generated by Firebase
        
//         // Update the user's email_id field with the generated key
//         newUserRef.update({
//             email_id: "daksh@gmail.com"
//         });

//         console.log('User created successfully');
//         res.status(201).json({
//             message: 'User created successfully',
//             userId: newUserRef.key  // This returns the generated ID from Firebase
//         });
//     });
// };

const userCreate = (req, res) => {
    console.log('Request body:', req.body);

    const {
        firstName,
        lastName,
        dob,
        gender,
        bio,
        aadharNumber,
        phone,
        profilePicture, // Already uploaded image URL (Profile)
        aadharFile,      // Already uploaded image URL (Aadhar)
        emergencyContacts,
        travelPreferencesv1,
        travelPreferencesv2,
        email // User's email for document reference
    } = req.body;

    // Basic Validation for Required Fields
    if (!firstName || !lastName || !dob || !gender || !bio || !aadharNumber || !email) {
        return res.status(400).json({
            message: "All fields are required (firstName, lastName, dob, gender, bio, aadharNumber, email)"
        });
    }

    // Construct user data object
    const newUser = {
        firstName,
        lastName,
        dob,
        gender,
        bio,
        aadharNumber,
        phone,
        profilePicture, // Store profile picture URL from Cloudinary
        aadharFile,     // Store Aadhar file URL from Cloudinary
        emergencyContacts: emergencyContacts || [],
        travelPreferencesv1: travelPreferencesv1 || {},
        travelPreferencesv2: travelPreferencesv2 || {},
        email, // Store email as part of the user data
    };

    // Firebase reference using email as the document ID
    const userId = req.body.email.replace(/\./g, '_');  // Fix invalid characters in email for Firebase paths

    const usersRef = db.ref('users');
    const userRef = usersRef.child(userId); // Using email as the unique key/document ID
    
    // Set the new user data in Firebase under the user's email ID
    userRef.set(newUser, (error) => {
        if (error) {
            console.error('Error creating user:', error.message);
            return res.status(500).json({
                message: 'Error creating user',
                error: error.message || 'Unknown error'
            });
        }

        console.log('User created successfully');
        return res.status(201).json({
            message: 'User created successfully',
            userId: email  // Returning the user's email as the ID
        });
    });
};







// const getUsers = (req,res) => {
//     console.log('Request fetched');

//     // Execute the query to fetch all users
//     db.execute(
//         'SELECT * FROM tempusers', // SQL query to fetch all users
//         (error, results) => {
//             if (error) {
//                 // If an error occurs during query execution, log the error
//                 console.error('Error fetching users:', error.message);
//                 return;
//             }

//             // Log the results to see the data returned from the query
//             console.log('Fetched users:', results);
//             // You can return or process the results as needed
//             res.status(201).json({
//                 message: 'fetched successfully',
//                 results
//             });
//         }
//     );
// };

const getUsers = (req, res) => {
    console.log('Request fetched');

    // Get a reference to the Firebase Realtime Database
    const usersRef = db.ref('users');  // This refers to the "users" node in your Realtime Database

    // Fetch all users
    usersRef.once('value', (snapshot) => {
        if (!snapshot.exists()) {
            console.log('No users found');
            return res.status(404).json({ message: 'No users found' });
        }

        // Get the data from the snapshot
        const users = snapshot.val();
        console.log('Fetched users:', users);

        // Return the users as a JSON response
        res.status(200).json({
            message: 'Fetched successfully',
            users
        });
    }, (error) => {
        console.error('Error fetching users:', error.message);
        res.status(500).json({
            message: 'Error fetching users',
            error: error.message || 'Unknown error'
        });
    });
};

// Upload Image to Cloudinary
// Cloudinary upload function

const uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Get the original file extension
        const fileExtension = req.file.originalname.split('.').pop();

        // Create a unique filename without extension to use as the public_id
        const newFileName = `${req.body.userEmail}_profile`;  // Remove file extension

        // Create a stream to upload the file to Cloudinary
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'uploads', // Define Cloudinary folder
                public_id: newFileName, // Use the unique file name as the public_id
                resource_type: 'auto' // Let Cloudinary auto-detect the resource type
            },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    return res.status(500).json({ error: 'Upload failed' });
                }
                console.log('asset id: '+result.asset_id);

                // Return the image URL from Cloudinary
                res.json({
                    success: true,
                    imageUrl: result.secure_url, // Image URL from Cloudinary
                    assetId: result.asset_id      // Asset ID from Cloudinary
                });

            }
        );

        // Stream the file buffer to Cloudinary
        uploadStream.end(req.file.buffer);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Upload failed' });
    }
};



const uploadAadharImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Get the original file extension
        const fileExtension = req.file.originalname.split('.').pop();

        // Create a unique filename without extension to use as the public_id
        const newFileName = `${req.body.userEmail}_profile`;  // Remove file extension

        // Create a stream to upload the file to Cloudinary
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'uploads', // Define Cloudinary folder
                public_id: newFileName, // Use the unique file name as the public_id
                resource_type: 'auto' // Let Cloudinary auto-detect the resource type
            },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    return res.status(500).json({ error: 'Upload failed' });
                }
                console.log('asset id: '+result.asset_id);
                // Return the image URL from Cloudinary
                res.json({
                    success: true,
                    imageUrl: result.secure_url, // Image URL from Cloudinary
                    assetId: result.asset_id      // Asset ID from Cloudinary
                });            
            }
        );

        // Stream the file buffer to Cloudinary
        uploadStream.end(req.file.buffer);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Upload failed' });
    }
};



module.exports = {userCreate, getUsers, uploadProfileImage, uploadAadharImage };
