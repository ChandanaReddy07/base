const express= require("express");
const app = express();
require('dotenv').config()
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var userRoutes = require('./routes/users');
var cors = require('cors')

//db connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("DB CONNECTED")
}).catch(
    console.log("DB NOT CONNECTED")
);

const PORT = process.env.PORT || 8080;

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
//routes
app.use("/api",userRoutes);


app.listen(PORT,()=>console.log(`haloo running in port${PORT}..`))
