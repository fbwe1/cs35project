import { useEffect, useState } from "react"
import { mockRides } from "./data/mockRides"

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
    return <p className="page">{error}</p>
  }

  if (!user) {
    return <p className="page">Loading profile...</p>
  }

  const userRides = mockRides.filter(
    (ride) => ride.creator_user_id === user.id
  )

  return (
    <main className="page">
      <section className="profile-card">
        <div className="avatar">
          {user.username.charAt(0).toUpperCase()}
        </div>

        <div>
          <h1>{user.username}</h1>
          <p className="muted">{user.email}</p>
          <p className="muted">{user.phone}</p>
        </div>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <h2>{user.completedRides}</h2>
          <p>Completed Rides</p>
        </div>

        <div className="stat-card">
          <h2>{userRides.length}</h2>
          <p>Total Rides Posted</p>
        </div>

        <div className="stat-card">
          <h2>
            {userRides.filter((ride) => ride.available_seats > 0).length}
          </h2>
          <p>Open Rides</p>
        </div>
      </section>

      <section>
        <h2 className="section-title">My Rides</h2>

        {userRides.length === 0 ? (
          <p className="empty-message">You have not posted any rides yet.</p>
        ) : (
          <div className="post-list">
            {userRides.map((ride) => (
              <article className="post-card" key={ride.id}>
                <div className="post-top">
                  <div>
                    <h2>{ride.title}</h2>
                    <p className="muted">
                      {ride.pickup_location} → {ride.destination}
                    </p>
                    <p className="muted">
                      {ride.date} · {ride.timeRange}
                    </p>
                  </div>

                  <span
                    className={`status ${
                      ride.available_seats > 0 ? "open" : "full"
                    }`}
                  >
                    {ride.available_seats > 0 ? "Open" : "Full/Past"}
                  </span>
                </div>

                <div className="post-details">
                  <p>
                    <strong>Total Seats:</strong> {ride.total_seats}
                  </p>
                  <p>
                    <strong>Available Seats:</strong> {ride.available_seats}
                  </p>
                </div>

                <p className="post-note">{ride.content}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default Profile