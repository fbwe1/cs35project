import { useState } from "react"
import { mockRides } from "./data/mockRides"

function Feed() {
  const [search, setSearch] = useState("")
  
   const today = new Date()
   today.setHours(0, 0, 0, 0)

  const filteredRides = mockRides.filter((ride) => {
    const rideDate = new Date(ride.date)
    rideDate.setHours(0, 0, 0, 0)

    const isActiveRide =
      ride.status === "open" &&
      ride.available_seats > 0 &&
      rideDate >= today
    
    const matchesSearch =
      ride.pickup_location.toLowerCase().includes(search.toLowerCase()) ||
      ride.destination.toLowerCase().includes(search.toLowerCase()) ||
      ride.title.toLowerCase().includes(search.toLowerCase())

    return isActiveRide && matchesSearch
  })

  return (
    <main className="page">
      <section className="page-header">
        <h1>Ride Feed</h1>
        <p>Find available rides from UCLA students.</p>
      </section>

      <section className="feed-controls">
        <input
          type="text"
          placeholder="Search pickup, destination, or title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      <section className="post-list">
        {filteredRides.length === 0 ? (
          <p className="empty-message">No available rides found.</p>
        ) : (
          filteredRides.map((ride) => (
            <article className="post-card" key={ride.id}>
              <div className="post-top">
                <div>
                  <h2>{ride.title}</h2>
                  <p className="muted">
                    {ride.pickup_location} → {ride.destination}
                  </p>
                </div>

                <span className="status open">Open</span>
              </div>

              <div className="post-details">
                <p>
                  <strong>Date:</strong> {ride.date}
                </p>
                <p>
                  <strong>Time:</strong> {ride.timeRange}
                </p>
                <p>
                  <strong>Total Seats:</strong> {ride.total_seats}
                </p>
                <p>
                  <strong>Available Seats:</strong> {ride.available_seats}
                </p>
              </div>

              <p className="post-note">{ride.content}</p>

              <button className="join-button">Join Ride</button>
            </article>
          ))
        )}
      </section>
    </main>
  )
}

export default Feed