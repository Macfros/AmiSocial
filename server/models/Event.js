import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    eventHead: {
      type: String,
      required: true
    },
    eventDesc: {
      type: String,
      requires: true
    },
    eventPicture: {
      type: String,
      default: "",
    },
    eventApplyLink: {
      type: String,
      default: ""
    },
    department: String,
  }, {timestamps: true}
);

const Event= mongoose.model("Event", eventSchema);

export default Event;
