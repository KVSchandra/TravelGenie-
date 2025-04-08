import mongoose from "mongoose";

const itinerarySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

const Itinerary = mongoose.model("Itinerary", itinerarySchema);
export default Itinerary;
