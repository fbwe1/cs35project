import React, { useState, useEffect } from 'react';
import RideCard from './RideCard';

function App() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  //Will be detirmined from the loginin database.
  const currentUserId = 1; 

  // Fetch initial data from our Node backend when the app loads
  useEffect(() => {
    fetch('http://localhost:3001/api/rides')
      .then(res => res.json())
      .then(data => {
        setRides(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching rides:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Carpool Join/Leave Full-Stack Test</h1>
      <p>Simulating as User ID: {currentUserId}</p>
      
      {loading ? (
        <p>Loading...</p>
      ) : rides.length > 0 ? (
        rides.map(ride => (
          <RideCard 
            key={ride.id} 
            initialRideData={ride} 
            currentUserId={currentUserId} 
          />
        ))
      ) : (
        <p style={{color: 'red'}}>No rides found.</p>
      )}
    </div>
  );
}

export default App;