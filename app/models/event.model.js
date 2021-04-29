import mongoose, { Schema } from "mongoose";

const EventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
    participantIds: [{ type: String }],
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

// EventSchema.virtual("participants", {
//   ref: "User",
//   localField: "participantIds",
//   foreignField: "_id",
//   justOne: false,
// });
const Event = mongoose.model("Event", EventSchema);

export default Event;
