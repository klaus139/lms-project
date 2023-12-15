import { app } from "./app";
import connectDB from "./utils/db";
require("dotenv").config();
//cloudinary config
import {v2 as cloudinary} from 'cloudinary'
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_SECRET_KEY
});

const port = 8000;

//create server
app.listen(port, () => {
    console.log(`Server is connected with port ${port}`);
connectDB();
})
