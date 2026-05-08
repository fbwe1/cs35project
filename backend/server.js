const express = require('express');
const app = express();
const profileRotes = require("./routes/profileRoutes")
const cors = require("cors")

// Middleware
app.use(cors());
app.use(express.json());

//since we haven't officially started building, I just made this similar to the node.js tutorial as a skeleton
app.get("/", (req, res) => {
    res.send("UCLAway backend is running");
  });

// Profile routes
app.use("/api/profile", profileRotes) 

app.listen(3001, () => {
    console.log('Server is running on port 3001'); // testing
});

