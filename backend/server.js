require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(express.json());
app.use(cors());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.get('/api/rides', async (req, res) => {
  try {
    const { data: rides, error } = await supabase
      .from('rides')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      // THIS IS THE IMPORTANT LINE:
      console.error("SUPABASE ERROR DETAILS:", error.message, error.details, error.hint);
      throw error;
    }
    res.json(rides);
  } catch (error) {
    res.status(500).json({ error: "Database connection failed", details: error.message });
  }
});

app.post('/api/rides/:rideId/join', async (req, res) => {
  try {
    const rideId = parseInt(req.params.rideId);
    const { userId } = req.body; 

    // 1. Fetch current ride
    const { data: ride, error: fetchError } = await supabase.from('rides').select('*').eq('id', rideId).single();
    if (fetchError || !ride) return res.status(404).json({ error: "Ride not found" });
    if (ride.available_seats <= 0) return res.status(400).json({ error: "Ride is full" });
    if (ride.passengers && ride.passengers.includes(userId)) return res.status(400).json({ error: "Already joined" });

    const updatedSeats = ride.available_seats - 1;
    const updatedPassengers = [...(ride.passengers || []), userId];

    const { data: updatedRide, error: updateError } = await supabase
      .from('rides')
      .update({ available_seats: updatedSeats, passengers: updatedPassengers })
      .eq('id', rideId)
      .select()
      .single();

    if (updateError) throw updateError;
    res.json({ success: true, ride: updatedRide });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/api/rides/:rideId/leave', async (req, res) => {
  try {
    const rideId = parseInt(req.params.rideId);
    const { userId } = req.body;

    const { data: ride, error: fetchError } = await supabase.from('rides').select('*').eq('id', rideId).single();
    if (fetchError || !ride) return res.status(404).json({ error: "Ride not found" });
    if (!ride.passengers || !ride.passengers.includes(userId)) return res.status(400).json({ error: "Not a passenger" });

    const updatedSeats = ride.available_seats + 1;
    const updatedPassengers = ride.passengers.filter(id => id !== userId);

    const { data: updatedRide, error: updateError } = await supabase
      .from('rides')
      .update({ available_seats: updatedSeats, passengers: updatedPassengers })
      .eq('id', rideId)
      .select()
      .single();

    if (updateError) throw updateError;
    res.json({ success: true, ride: updatedRide });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT} (Connected to Supabase)`);
});