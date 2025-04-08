import React, { useState } from "react";
import ItineraryForm from "./ItineraryForm";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [itinerary, setItinerary] = useState([]);
  const [view, setView] = useState("register");

  const handleGenerate = async ({ city, days, interests }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to generate an itinerary.");
      return;
    }

    try {
      const queryString = `${API_URL}/api/itineraries/generate?city=${encodeURIComponent(city)}&days=${encodeURIComponent(days)}&interests=${encodeURIComponent(interests)}`;
      console.log("🔍 Requesting:", queryString);

      const res = await fetch(queryString, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to generate itinerary");
      }

      setItinerary(data);
    } catch (error) {
      console.error("❌ Itinerary generation error:", error);
      alert(`Failed to generate itinerary: ${error.message}`);
    }
  };

  const handleLoginSuccess = (token) => {
    localStorage.setItem("token", token);
    setView("main");
  };

  return (
    <div className="App" style={{ padding: "2rem" }}>
      <h1>🌍 TravelGenie</h1>

      {view === "register" && (
        <>
          <RegisterForm onSuccess={() => setView("login")} />
          <p>
            Already have an account? <button onClick={() => setView("login")}>Login</button>
          </p>
        </>
      )}

      {view === "login" && (
        <>
          <LoginForm onLogin={handleLoginSuccess} />
          <p>
            Don’t have an account? <button onClick={() => setView("register")}>Register</button>
          </p>
        </>
      )}

      {view === "main" && (
        <>
          <ItineraryForm onGenerate={handleGenerate} />
          <div>
            {itinerary.length ? (
              itinerary.map((day, index) => (
                <div key={index}>
                  <h3>Day {day.day}</h3>
                  <ul>
                    {day.activities.map((place, i) => (
                      <li key={i}>
                        <strong>{place.name}</strong> — {place.category}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p>No itinerary yet. Fill the form to generate one.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
