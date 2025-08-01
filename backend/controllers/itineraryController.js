import Itinerary from "../models/Itinerary.js";

export const generateItinerary = async (req, res) => {
  try {
    const { city, days, interests } = req.query;

    if (!city || !days || !interests) {
      return res.status(400).json({ message: "Missing required query parameters" });
    }

    // Format interests
    const interestList = interests.split(',').map(i => i.trim());

    // Dummy itinerary generation (replace with AI or template logic later)
    const itinerary = {
      destination: city,
      days: Number(days),
      interests: interestList,
      plan: []
    };

    for (let i = 1; i <= Number(days); i++) {
      itinerary.plan.push({
        day: i,
        activities: [`Explore ${interestList[0]} spots in ${city}`, "Local food tour", "Evening stroll"]
      });
    }

    res.status(200).json({ success: true, itinerary });

  } catch (error) {
    console.error("❌ Itinerary generation failed:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
