import { useState } from "react";
import axios from "axios";

export default function CreateProfile() {
  const [form, setForm] = useState({
    age: "",
    gender: "",
    city: "",
    budget: "",
    role: "",
    description: "",
    moveInDate: "",
    hasRoom: false,
    roomDetails: {
      address: "",
      details: ""
    },
    preferences: {
      smoking: false,
      drinking: false,
      foodType: "veg"
    }
  });

  const updateField = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const updateRoom = (field, value) => {
    setForm({
      ...form,
      roomDetails: { ...form.roomDetails, [field]: value }
    });
  };

  const updatePref = (field, value) => {
    setForm({
      ...form,
      preferences: { ...form.preferences, [field]: value }
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/profile",
        form,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Profile Created Successfully");
      console.log(res.data);
    } catch (err) {
      console.log("Error:", err?.response?.data);
      alert(err?.response?.data?.msg || err.message || "Something went wrong");
    }
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="border p-6 rounded-lg w-100 shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Create Profile
        </h1>

        <form onSubmit={submit} className="grid gap-3">

          {/* Age */}
          <input
            className="border p-2"
            placeholder="Age"
            type="number"
            min={0}
            max={125}
            value={form.age}
            onChange={e => updateField("age", e.target.value)}
          />

          {/* Gender */}
          <select
            className="border p-2"
            value={form.gender}
            onChange={e => updateField("gender", e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>

          {/* City */}
          <input
            className="border p-2"
            placeholder="City"
            value={form.city}
            onChange={e => updateField("city", e.target.value)}
          />

          {/* Budget */}
          <input
            className="border p-2"
            placeholder="Budget"
            type="number"
            value={form.budget}
            onChange={e => updateField("budget", e.target.value)}
          />

          {/* Role */}
          <select
            className="border p-2"
            value={form.role}
            onChange={e => updateField("role", e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="working">Working</option>
          </select>

          {/* Description */}
          {form.role && (
            <textarea
              className="border p-2"
              placeholder={
                form.role === "student"
                  ? "Describe about your studies, lifestyle, college, etc"
                  : "Describe your work, lifestyle, office timings, etc"
              }
              value={form.description}
              onChange={e => updateField("description", e.target.value)}
            />
          )}

          {/* Move in date */}
          <label className="text-sm font-semibold">Move-in Date</label>
          <input
            type="date"
            className="border p-2"
            value={form.moveInDate}
            onChange={e => updateField("moveInDate", e.target.value)}
          />

          {/* Has Room */}
          <label className="font-semibold">Do you already have a room?</label>
          <select
            className="border p-2"
            value={form.hasRoom}
            onChange={e => updateField("hasRoom", e.target.value === "true")}
          >
            <option value={false}>No, I need a room</option>
            <option value={true}>Yes, I already have a room</option>
          </select>

          {/* Room Fields – only when hasRoom = true */}
          {form.hasRoom && (
            <>
              <h2 className="font-semibold mt-2">Room Details</h2>

              <input
                className="border p-2"
                placeholder="Room Address"
                value={form.roomDetails.address}
                onChange={e => updateRoom("address", e.target.value)}
              />

              <textarea
                className="border p-2"
                placeholder="Describe the room, facilities, rent share etc"
                value={form.roomDetails.details}
                onChange={e => updateRoom("details", e.target.value)}
              />
            </>
          )}

          {/* Preferences */}
          <h2 className="font-semibold mt-2">Preferences</h2>

          <label>
            <input
              type="checkbox"
              checked={form.preferences.smoking}
              onChange={e => updatePref("smoking", e.target.checked)}
            />{" "}
            Smoking
          </label>

          <label>
            <input
              type="checkbox"
              checked={form.preferences.drinking}
              onChange={e => updatePref("drinking", e.target.checked)}
            />{" "}
            Drinking
          </label>

          <select
            className="border p-2"
            value={form.preferences.foodType}
            onChange={e => updatePref("foodType", e.target.value)}
          >
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
            <option value="both">Both</option>
          </select>

          <button className="bg-purple-600 text-white p-2 rounded mt-2">
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}



