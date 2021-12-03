const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const commentRoute = require("./routes/comment");
const playlistRoute = require("./routes/playlist");
const favoritesRoute = require("./routes/favorites");
require("dotenv").config();
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')

//Customers
const customerRouter = require('./routes/customer.routes');
const authRouter = require('./routes/auth.routes');

//Contact Us
const ContactUs = require('./routes/contactUs');
const ViewMsg = require('./routes/viewMsg');

//movie
const movieRoutes = require('./routes/movies');
const listRouts = require('./routes/lists');



const port = process.env.PORT || 8070;


const app = express(); 
app.use(cors({
    origin: [
    'http://localhost:3000'
  ],
  credentials: true
    }));
app.use(express.json());
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles:true
}))

//Advertisement
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/trailerRouter'))


const urlEncodedParser = express.urlencoded({ extended: false });
app.listen(port, (error) => {
    if(error) console.log(error);
    console.log('Server listening to PORT '+ port);
});

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false,
    useCreateIndex: true})
    .then(() => {
    console.log('MongoDB connected');})
    .catch((error) => {
    console.log(error);})



//customers
app.use('/customers',urlEncodedParser,customerRouter);
app.use('/customer', authRouter);


//Contact Us
app.use('/', ContactUs);
app.use('/admin',ViewMsg);

//Comments
app.use("/api/comments", commentRoute);

//playlists
app.use("/api/playlists", playlistRoute);

//favorites
app.use("/api/favorites", favoritesRoute);

// movie
app.use("/api/movies", movieRoutes);
app.use("/api/lists", listRouts);

