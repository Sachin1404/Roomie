import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const Dashboard = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProfiles = async () => {
    try {
      const res = await axiosInstance.get("/profiles");
      setProfiles(res.data);
    } catch (error) {
      console.log("Error fetching profiles", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Find Your Perfect Roommate 🏠
      </h1>
      <p className="text-gray-600 mb-6">
        Browse roommate profiles that match your preferences
      </p>

      {loading ? (
        <p className="text-gray-700">Loading profiles...</p>
      ) : profiles.length === 0 ? (
        <p className="text-gray-700 bg-white p-4 rounded shadow">
          No roommate profiles found yet. Be the first to create one!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((user) => (
            <div
              key={user._id}
              className="bg-white shadow rounded-lg p-4 border hover:scale-[1.02] transition"
            >
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar || "https://i.pravatar.cc/80"}
                  alt="avatar"
                  className="w-14 h-14 rounded-full object-cover border"
                />
                <div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-gray-600 text-sm">{user.city}</p>
                </div>
              </div>

              <div className="mt-3">
                <p className="text-gray-700">
                  <span className="font-semibold">Budget:</span> ₹{user.budget}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Preference:</span>{" "}
                  {user.preference || "Not specified"}
                </p>
              </div>

              <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
                View Profile
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
