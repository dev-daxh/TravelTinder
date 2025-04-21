const { model } = require('mongoose');
const db = require('../config/firebase');

const addTrip = async (req, res) => {
    try {
        const { tripData, email } = req.body;

        // Log the incoming request to debug
        console.log('Received tripData:', tripData);
        console.log('Received email:', email);

        if (!tripData || !email) {
            return res.status(400).json({ message: 'Trip data and email are required' });
        }

        // Add email to the trip data
        const tripWithDetails = { 
            ...tripData, 
            hostedBy: email, 
            createdAt: new Date().toISOString(),
            status: 'open',
        };

        // Save to the database
        const newTripRef = db.ref('trips').push();
        await newTripRef.set(tripWithDetails);

        // Send a success response
        return res.status(201).json({ message: 'Trip added successfully', tripId: newTripRef.key });
    } catch (error) {
        console.error('Error adding trip:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const getAllTrips = async (req, res) => {
    try {
        const tripsRef = db.ref('trips');

        tripsRef.once('value', (snapshot) => {
            const data = snapshot.val();

            if (!data) {
                return res.status(200).json({ trips: [] });
            }

            // Convert the data from object to array
            const trips = Object.entries(data).map(([id, trip]) => ({
                id,
                ...trip,
            }));

            return res.status(200).json({ trips });
        });
    } catch (error) {
        console.error('Error fetching trips:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    addTrip,
    getAllTrips
};


