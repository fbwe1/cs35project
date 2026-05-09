import React, { useState } from 'react';

const RideCard = ({ ride, currentUserId, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const hasJoined = ride.passengers && ride.passengers.includes(currentUserId);
  const isDisabled = loading || (!hasJoined && ride.available_seats <= 0);

  const handleJoinLeave = async () => {
    setLoading(true);
    setErrorMsg("");
    const action = hasJoined ? 'leave' : 'join';
    
    try {
      const response = await fetch(`http://localhost:3001/api/rides/${ride.id}/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUserId })
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.error || "Something went wrong on the server");
      } else {
        onUpdate(); // Re-fetch all rides to update UI instantly
      }

    } catch (err) {
      setErrorMsg("Failed to connect to the backend server.");
    } finally {
      setLoading(false);
    }
  };

  let buttonColor = '#4CAF50';
  if (hasJoined) buttonColor = '#ff4d4d';
  else if (isDisabled) buttonColor = '#cccccc';

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', margin: '10px 0', borderRadius: '8px', maxWidth: '400px' }}>
      <h3>{ride.pickup_location} ➡️ {ride.destination}</h3>
      <p><strong>Riders:</strong> {(ride.passengers || []).length} / {ride.total_seats}</p>
      
      {errorMsg && <p style={{ color: 'red', fontSize: '14px' }}>{errorMsg}</p>}

      <button 
        onClick={handleJoinLeave} 
        disabled={isDisabled}
        style={{
          backgroundColor: buttonColor,
          color: isDisabled && !hasJoined ? '#666' : 'white',
          padding: '10px 15px',
          border: 'none',
          borderRadius: '4px',
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          fontWeight: 'bold',
          width: '100%'
        }}
      >
        {loading ? "Processing..." : 
         hasJoined ? "Leave Ride" : 
         ride.available_seats <= 0 ? "Ride Full" : "Join Ride"}
      </button>
    </div>
  );
};

export default RideCard;