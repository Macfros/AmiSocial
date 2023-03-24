import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER UESR */
export const register = async ( req , res ) => {
  try{
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt= await bcrypt.genSalt();   // here we are encypting our passwrd. it generates random salt using bcrypt to encypt our password
    const passwordHash= await bcrypt.hash(password, salt);

    const newUser= new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random()*10000),
      impressions: Math.floor(Math.random()*10000)
    });

    const savedUser= await newUser.save();    //newUser is saved. .save is an asynchromous function that returns a promise. asynchronous fnunction means that it may not happen immediately but it will eventually.await - it is used to wait for the new user to save before execution of the rest of the code
    res.status(201).json(savedUser);
  } catch(err){

      res.status(500).json({ error: err.message});
  }
}

/*LOGGING IN*/
export const login = async (req,res) =>{
  try{
    const {email, password}= req.body;
    const user = await User.findOne({email :email});   //were using mongoose to find the one that has the specified email and storing it in user

    if(!user) return res.status(400).json({msg: "User Does Not exist. "});

     const isMatch = await bcrypt.compare(password, user.password);

     if(!isMatch) return res.status(400).json({msg: "Invalid Credentials"});

     const token= jwt.sign({id: user._id},process.env.JWT_SECRET);
     delete user.password;   //we will delete the user .password so that it doesnt get sent back to the frontend
     res.status(200).json({ token, user});

  }catch(err){
    res.status(500).json({ error: err.message});
  }
}
