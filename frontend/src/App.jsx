import React, { useState, useEffect } from 'react';
import RideCard from './RideCard';

function App() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUserId = 1;

  const fetchRides = () => {
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
  };

  useEffect(() => { fetchRides(); }, []);

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
            ride={ride} 
            currentUserId={currentUserId}
            onUpdate={fetchRides}
          />
        ))
      ) : (
        <p style={{color: 'red'}}>No rides found.</p>
      )}
    </div>
  );
}

export default App;