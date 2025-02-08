import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import router from "./routes/api.js"
import fileUpload from "express-fileupload";
import {MONGODB_CONNECTION,PORT,MAX_JASON_SIZE,URL_ENCODED,WEB_CACHE,REQUEST_LIMIT_NUMBER,REQUEST_LIMIT_TIME} from "./src/config/config.js"



const app = express();

// Global Application Middleware
app.use(cors());
app.use(express.json({limit:MAX_JASON_SIZE}));
app.use(express.urlencoded({ extended: URL_ENCODED }));
app.use(hpp())
app.use(helmet())
app.use(cookieParser())


// Rate Limiter
const limiter=rateLimit({windowMs:REQUEST_LIMIT_TIME,max:REQUEST_LIMIT_NUMBER})
app.use(limiter)

/////file upload
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

// Web Caching
app.set('etag',WEB_CACHE)




// MongoDB connection
mongoose.connect(MONGODB_CONNECTION,{autoIndex:true}).then(()=>{
    console.log('MongoDB Connected');
}).catch(err=>{
    console.log("err connecting to MongoDB");
})







// Set API Routes
app.use("/api",router)


// Run Your Express Back End Project

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})

