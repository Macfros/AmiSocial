import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";             //it helps to make requests to other web applicatoins or APIs and avoiding the security issues and blocking done by the browser by default
import dotenv from "dotenv";        //It is used to import the variables from .env file. we store critical variables in our dotenv file such as API keys etc so that we dont have to share them with anyone else in our source code
import multer from "multer";       //It helps handling file uploads. it has various features such as handling the file size etc.
import helmet from "helmet";       //It is used for improving the security of our web application by adding various HTTP headers.
import morgan from "morgan";       //It is used for logging in various HTTP requests.
import path from "path";            //It helps with playing with paths i.e. image paths etc.
import { fileURLToPath } from "url";    //It is used to modify and play with the urls
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import eventRoutes from "./routes/events.js";
import { register } from "./controllers/auth.js";
import {createPost} from "./controllers/posts.js";
import {createEvent} from "./controllers/events.js"
import {verifyToken} from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import Event from "./models/Event.js";
import {users, posts, events} from "./data/index.js";



//configurations --
const __filename=fileURLToPath(import.meta.url);   //saving the path of the current module source file into variable __filename -- moduleused= url
const __dirname=path.dirname(__filename);           //used to store the directory name in which our current module source code is present. --moduleUsed= path
dotenv.config();                                    //used to load the environment variables in process.env onject
const app=express();
app.use(express.json());                         //app.use is udes to add the functions into the middleware. express.json is used to parse JSON encoded data and store into req.body object
app.use(helmet());                              //
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));     //It is used to set the crossorigin policy to cross-origin means that the browser can fetch resources from other domains. Basically it is used to add security so that browsers dont allow other appciations to access your all resources
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));   //set sthe directory where we keep our images etc.


//File storage
const storage=multer.diskStorage({                /*This all can be found on the multer documentation */
  destination: function(req,file,cb){             //when anyone will upload some file then it will get stored in public/assets which is implemented below as const upload=multer({storage});
    cb(null, "public/assets");
  },
  filename: function (req,file,cb){
    cb(null, file.originalname);
  }
})
const upload=multer({storage});

/*ROUTES WITH FILES*/
app.post("/auth/register", upload.single("picture"), register);              //the upload.single method specifies that only a single file should be uploaded and the name of the file input should be "picture". After the file is uploaded, the register function is called to handle the rest of the request processing.
app.post("/posts", verifyToken, upload.single("picture"), createPost);       //The second route handler is for the /posts endpoint. It also uses the upload middleware to handle file uploads for a single file input named "picture".
app.post("/events",verifyToken, upload.single("picture"), createEvent);       //In addition, it also uses the verifyToken middleware to verify the JWT token included in the request header.
                                                                             //The order in which the middleware is used is important, as the verifyToken middleware should be executed before the upload middleware.
                                                                             /*This ensures that the JWT token is verified before any file upload is allowed. After the file is uploaded and the token is verified, the createPost function is called to handle the rest of the request processing.*/

/* ROUTES */
app.use("/auth", authRoutes);              //These all are used to set the API endpoints such as auth, users and posts
app.use("/users",userRoutes);                //and the middleware which will handle each API endpoint such as
app.use("/posts", postRoutes);              // authroutes, userroutes, post routes
app.use("/events", eventRoutes);


//MONGOOSE Setup
const PORT= process.env.port || 6001;
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

  /*ADD DATA ONE TIME */
  // User.insertMany(users);
  // Post.insertMany(posts);
  // Event.insertMany(events);

}).catch((error) => console.log(`${error} did not connect`));
