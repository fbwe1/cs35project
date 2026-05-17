const express = require('express');
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("UCLAway backend is running");
});

const postRoutes = require("./routes/posts");
app.use("/posts", postRoutes);

app.listen(port, () => {
    console.log('Server is running on port 3001');
});