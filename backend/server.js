const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

//We need to use a mysql data base for this probably the same one as the passwords. 
let ridesDB = [
  { id: 1, pickup_location: "Test_1", destination: "Location 1", total_seats: 4, available_seats: 2, passengers: [99, 100] },
  { id: 2, pickup_location: "Test_2", destination: "Location 2", total_seats: 3, available_seats: 0, passengers: [10, 11, 12] }
];

//Simulating database time. 
const simulateDbDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

//Get rides from the database
app.get('/api/rides', async (req, res) => {
  try {
    await simulateDbDelay(300); // Fake 300ms database read time
    res.json(ridesDB);
  } catch (error) {
    res.status(500).json({ error: "Database connection failed" });
  }
});

//Join a ride
app.post('/api/rides/:rideId/join', async (req, res) => {
  try {
    const rideId = parseInt(req.params.rideId);
    const { userId } = req.body; 

    //Remove this for simulation purposes for databases.
    await simulateDbDelay(600); 

    const ride = ridesDB.find(r => r.id === rideId);
    
    if (!ride){
      return res.status(404).json({ error: "Ride not found" });
    }
    if (ride.available_seats <= 0){
      return res.status(400).json({ error: "Ride is full" });
    }
    if (ride.passengers.includes(userId)){
      return res.status(400).json({ error: "Already joined" });
    }

    // Update our mock database
    ride.available_seats -= 1;
    ride.passengers.push(userId);

    res.json({ success: true, message: "Joined successfully", ride });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// 3. POST ROUTE: Leave a ride (Async)
app.post('/api/rides/:rideId/leave', async (req, res) => {
  try {
    const rideId = parseInt(req.params.rideId);
    const { userId } = req.body;

    await simulateDbDelay(600); 

    const ride = ridesDB.find(r => r.id === rideId);
    
    if (!ride){
      return res.status(404).json({ error: "Ride not found" });
    }
    if (!ride.passengers.includes(userId)){
      return res.status(400).json({ error: "Not a passenger" });
    }

    // Update our mock database
    ride.available_seats += 1;
    ride.passengers = ride.passengers.filter(id => id !== userId);

    res.json({ success: true, message: "Left successfully", ride });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});