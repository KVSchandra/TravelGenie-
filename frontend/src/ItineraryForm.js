import React, { useState } from "react";
import axios from "axios";

const ItineraryForm = () => {
  const [city, setCity] = useState("");
  const [days, setDays] = useState("");
  const [interests, setInterests] = useState("");
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to generate an itinerary.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/itineraries/generate", {
        params: {
          city,
          days,
          interests,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setItinerary(response.data);
      setError(null);
    } catch (err) {
      console.error("Error generating itinerary:", err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h2>Plan Your Trip 🧳</h2>
      <form onSubmit={handleSubmit}>
        <label>
          City:
          <input value={city} onChange={(e) => setCity(e.target.value)} required />
        </label>
        <label>
          Days:
          <input type="number" value={days} onChange={(e) => setDays(e.target.value)} required />
        </label>
        <label>
          Interests (comma-separated):
          <input value={interests} onChange={(e) => setInterests(e.target.value)} required />
        </label>
        <button type="submit">Generate Itinerary</button>
      </form>

      {error && <p style={{ color: "red" }}>❌ {error}</p>}
      {itinerary && (
        <div>
          <h3>Your Itinerary:</h3>
          <pre>{JSON.stringify(itinerary, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ItineraryForm;
