import { useState } from 'react'
import Profile from "./Profile"
import Feed from "./Feed"
import "./App.css"

function App() {
  const [page, setPage] = useState("feed")
  return (
    <div className="app-shell">
      {page === "feed" && <Feed />}
      {page === "profile" && <Profile />}

      <nav className="bottom-nav">
        <button
          className={page === "feed" ? "active" : ""}
          onClick={() => setPage("feed")}
        >
          Feed
        </button>

        <button
          className={page === "profile" ? "active" : ""}
          onClick={() => setPage("profile")}
        >
          Profile
        </button>
      </nav>
    </div>
  )
}

export default App
