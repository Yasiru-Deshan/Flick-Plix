const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/database");
const cors = require("cors");
require("dotenv").config();

//Routes
const commentRoute = require("./routes/comment");
const playlistRoute = require("./routes/playlist");
const movieRoutes = require("./routes/movie-route");
const userRoutes = require("./routes/user-route");

const app = express();
app.use(cors());
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

app.use("/api/auth", userRoutes);
app.use("/api/comments", commentRoute);
app.use("/api/playlists", playlistRoute);
app.use("/api/movies", movieRoutes);

const PORT = process.env.PORT || 8070;

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static('./../Frontend/build'));
// }

app.listen(PORT, () => console.log(`server started on port ${8070}`));