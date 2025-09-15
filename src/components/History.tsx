// src/components/History.tsx
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface Recommendation {
  crop: string;
  score: number;
}

interface HistoryEntry {
  id: string;
  profile: {
    soilType: string;
    rainfall: number;
    temperature: number;
    humidity: number;
    ph: number;
  };
  recommendations: Recommendation[];
  createdAt: { seconds: number };
}

export const History: React.FC = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const q = query(
        collection(db, "farmProfiles"),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as HistoryEntry[];

      setHistory(data);
    };

    fetchHistory();
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-green-800 mb-4">
        📜 Past Recommendations
      </h2>

      {history.length === 0 ? (
        <p className="text-gray-600">No history yet. Run a recommendation first.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {history.map((entry) => (
            <div
              key={entry.id}
              className="bg-white rounded-2xl shadow-md p-4 border border-green-200"
            >
              <p className="text-sm text-gray-500">
                {new Date(entry.createdAt.seconds * 1000).toLocaleString()}
              </p>
              <p className="text-sm text-gray-700">
                Soil: {entry.profile.soilType}, Temp: {entry.profile.temperature}°C, 
                Humidity: {entry.profile.humidity}%, pH: {entry.profile.ph}, 
                Rainfall: {entry.profile.rainfall} mm, N: {entry.profile.N}, 
                P: {entry.profile.P}, K: {entry.profile.K}
              </p>


              {/* ✅ Bar chart for recommendations */}
              <div className="h-56 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={entry.recommendations}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="crop" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" fill="#16a34a" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
