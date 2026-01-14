import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchProfiles = async () => {
      try {
        const res = await axiosInstance.get("/profiles");
        if (isMounted) setProfiles(res.data);
      } catch (error) {
        console.log("Error fetching profiles", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProfiles();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ---------- NAVBAR ---------- */}
{/* ---------- NAVBAR ---------- */}
<div className="bg-white shadow-sm border-b">
  <div className="max-w-7xl mx-auto py-4 flex items-center justify-between">

    {/* Left: Logo + Icon */}
    <div
      onClick={() => navigate("/")}
      className="flex items-center gap-2 cursor-pointer"
    >
      <HomeIcon className="h-7 w-7 text-indigo-600" />
      <h2 className="text-2xl font-bold text-indigo-700">
        Roomie
      </h2>
    </div>

    {/* Right: Actions */}
    <div className="flex items-center gap-4">

      {/* Home */}
      <button
        onClick={() => navigate("/")}
        title="Home"
        className="p-2 rounded-full hover:bg-gray-100 transition"
      >
        <HomeIcon className="h-6 w-6 text-gray-600 hover:text-indigo-600" />
      </button>

      {/* Search Roommate */}
      <button
        onClick={() => navigate("/search-roommate")}
        title="Search Roommate"
        className="p-2 rounded-full hover:bg-gray-100 transition"
      >
        <UsersIcon className="h-6 w-6 text-gray-600 hover:text-indigo-600" />
      </button>

      {/* Search Room & Roommate */}
      <button
        onClick={() => navigate("/search-room-and-roommate")}
        title="Search Room & Roommate"
        className="p-2 rounded-full hover:bg-gray-100 transition"
      >
        <MagnifyingGlassIcon className="h-6 w-6 text-gray-600 hover:text-green-600" />
      </button>

      {/* Settings */}
      <button
        onClick={() => navigate("/settings")}
        title="Settings"
        className="p-2 rounded-full hover:bg-gray-100 transition"
      >
        <Cog6ToothIcon className="h-6 w-6 text-gray-600 hover:text-indigo-600" />
      </button>

      {/* Divider */}
      <div className="h-6 w-px bg-gray-300" />

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        <ArrowRightOnRectangleIcon className="h-5 w-5" />
        Logout
      </button>

    </div>
  </div>
</div>



      {/* ---------- MAIN CONTENT ---------- */}
      <div className="p-6">
        {/* -------- Top Section with Heading & Icons -------- */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Find Your Perfect Roommate 🏠
            </h1>
            <p className="text-gray-600">
              Browse roommate profiles that match your preferences
            </p>
          </div>

          {/* ---- Small Search Icons Right Top ---- */}
          <div className="flex gap-3">
            {/* Search Roommate */}
            <button
              onClick={() => navigate("/search-roommate")}
              title="Search Roommate"
              className="bg-indigo-600 text-white p-3 rounded-full shadow hover:bg-indigo-700 transition"
            >
              🔍
            </button>

            {/* Search Room & Roommate */}
            <button
              onClick={() => navigate("/search-room-and-roommate")}
              title="Search Room & Roommate"
              className="bg-green-600 text-white p-3 rounded-full shadow hover:bg-green-700 transition"
            >
              🔍
            </button>
          </div>
        </div>

       {/* ---------- HERO SECTION ---------- */}
<div className="flex justify-center mt-20 mb-20">
  <div className="w-full max-w-5xl  bg-linear-to-br from-indigo-500 via-violet-500 to-blue-500 animate-gradient
 rounded-2xl px-30 py-14 text-center shadow-lg">

    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-5xl font-bold text-white mb-6"
    >
      Shared Living, Made Simple
    </motion.h1>

    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      className="text-2xl text-white mb-6"
    >
      Match with roommates who align with your lifestyle, budget, and move-in plans.
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
      className="text-white leading-relaxed text-lg"
    >
      Roomie helps students and working professionals discover compatible roommates
      without the stress of endless calls, unreliable listings, or awkward mismatches.
      Explore verified profiles, understand preferences upfront, and connect only when
      you’re confident it’s the right fit.
    </motion.p>

  </div>
</div>





        {/* ---------- Profiles Section ---------- */}
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
    </div>
  );
};

export default Dashboard;

