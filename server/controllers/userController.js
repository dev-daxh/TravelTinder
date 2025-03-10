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
        profilePicture,
        emergencyContacts,
        travelPreferencesv1,
        travelPreferencesv2
    } = req.body;

    // Basic Validation for Required Fields
    if (!firstName || !lastName || !dob || !gender || !bio || !aadharNumber) {
        return res.status(400).json({
            message: "All fields are required (firstName, lastName, dob, gender, bio, aadharNumber)"
        });
    }

    const usersRef = db.ref('users'); // Firebase path to store user data

    const newUser = {
        firstName,
        lastName,
        dob,
        gender,
        bio,
        aadharNumber,
        phone,
        profilePicture: profilePicture || null,
        emergencyContacts: emergencyContacts || [],
        travelPreferencesv1: travelPreferencesv1 || {},
        travelPreferencesv2: travelPreferencesv2 || {},
    };

    // Push new user data to Firebase
    const newUserRef = usersRef.push(newUser, (error) => {
        if (error) {
            console.error('Error creating user:', error.message);
            return res.status(500).json({
                message: 'Error creating user',
                error: error.message || 'Unknown error'
            });
        }

        const userId = newUserRef.key;  // This is the unique identifier generated by Firebase

        // You can update the user's data with a unique email or any other additional information
        newUserRef.update({
            email_id: "daksh@gmail.com",  // Update email or any additional data if needed
        });

        console.log('User created successfully');
        return res.status(201).json({
            message: 'User created successfully',
            userId: userId  // This returns the generated user ID from Firebase
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
const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

        const result = await cloudinary.uploader.upload(base64Image, {
            folder: 'uploads',
            public_id: `image_${Date.now()}`,
            resource_type: 'auto'
        });

        res.json({ success: true, imageUrl: result.secure_url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Upload failed' });
    }
};


module.exports = {userCreate, getUsers, uploadImage, upload };
