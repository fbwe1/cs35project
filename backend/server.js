const express = require('express');
const app = express();
const port = 3001;
//similar to the node.js tutorial as a skeleton
app.use(express.json());
app.get("/", (req, res) => {
    res.send("UCLAway backend is running");
  });

//import and mount post routes
const postRoutes = require("./routes/posts");
app.use("/posts", postRoutes);

app.listen(port, () => {
    console.log('Server is running on port 3001'); // testing
});

