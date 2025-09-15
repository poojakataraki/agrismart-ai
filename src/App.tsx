// src/App.tsx
import React, { useState } from "react";
import { FarmProfileForm } from "./components/FarmProfileForm";
import { RecommendationResults } from "./components/RecommendationResults";
import { History } from "./components/History";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Define types
export interface FarmProfile {
  location: string;
  soilType: string;
  farmSize: number;
  climate: string;
  waterAvailability: string;
  budget: string;
  previousCrops: string[];
  season: string;
  N?: number; // optional if user provides nutrients
  P?: number;
  K?: number;
  temperature?: number;
  humidity?: number;
  ph?: number;
  rainfall?: number;
}

interface Recommendation {
  crop: string;
  score: number;
}

function App() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [state, setState] = useState<"input" | "loading" | "results">("input");

  const handleProfileSubmit = async (profile: FarmProfile) => {
    setState("loading");

    try {
      // 1️⃣ Send full profile to backend
      const res = await fetch("https://agrismart-backend.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      const recommendations = data.recommendations;

      // 2️⃣ Save profile + recommendations in Firestore
      await addDoc(collection(db, "farmProfiles"), {
        profile,
        recommendations,
        createdAt: new Date(),
      });

      // 3️⃣ Update UI
      setRecommendations(recommendations);
      setState("results");
    } catch (err) {
      console.error("❌ Error:", err);
      setState("input");
    }
  };

  const handleReset = () => {
    setRecommendations([]);
    setState("input");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">
      <h1 className="text-4xl font-extrabold text-center text-green-800 mb-10 drop-shadow">
        🌾 AgriSmart AI
      </h1>

      {state === "input" && (
        <FarmProfileForm onSubmit={handleProfileSubmit} loading={state === "loading"} />
      )}


      {state === "loading" && (
        <div className="text-center text-green-700 font-semibold">
          ⏳ Analyzing your farm data...
        </div>
      )}

      {state === "results" && (
        <>
          <RecommendationResults
            recommendations={recommendations}
            onReset={handleReset}
          />
          <History /> {/* Shows past recommendations */}
        </>
      )}

    </div>
  );
}

export default App;

