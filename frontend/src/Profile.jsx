import { useEffect, useState } from "react"

function Profile() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState("")

  // For now, hardcode user id = 1
  const userId = 1

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch(
          `http://localhost:3001/api/profile/${userId}`
        )

        if (!response.ok) {
          throw new Error("Failed to load profile")
        }

        const data = await response.json()
        setUser(data)
      } catch (err) {
        setError(err.message)
      }
    }

    fetchProfile()
  }, [])

  if (error) {
    return <p>{error}</p>
  }

  if (!user) {
    return <p>Loading profile...</p>
  }

  return (
    <div>
      <h1>{user.username}'s Profile</h1>

      <section>
        <h2>Contact Information</h2>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
      </section>

      <section>
        <h2>Ride Stats</h2>
        <p>Completed Rides: {user.completedRides}</p>
      </section>

      <section>
        <h2>Ride History</h2>

        {user.rideHistory.length === 0 ? (
          <p>No rides completed yet.</p>
        ) : (
          <ul>
            {user.rideHistory.map((ride) => (
              <li key={ride.id}>
                {ride.pickup} → {ride.destination} on {ride.date}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default Profile