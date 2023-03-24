import Event from "../models/Event.js";
import User from "../models/User.js";

/*Create*/
export const createEvent= async (req,res)=> {
  try{

    const { userId, eventHead, eventDesc, eventPicture, eventApplyLink, department} = req.body;
    const user = await User.findById(userId);

    const newEvent= new Event({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      department: user.location,
      eventHead,
      eventDesc,
      eventApplyLink,
    })

    await newEvent.save();

    const post=await Event.find();
    res.status(201).json(event);
  } catch(err) {
    res.status(409).json({message: err.message});
  }
}


/*READ*/

export const getFeedEvents = async (req,res) => {
  try{
    const event= await Event.find();
    res.staus(200).json(post);
  } catch(err) {
    res.ststus(404).json({ message: err.message });
  }
}


export const getUserEvents = async (req,res) => {
  try{
    const {userId}= req.params;
    const post=await Event.find({ userId});
    res.status(200).json(event);
  } catch(err){
    res.status(404).json({ message: err.message});
  }
}
