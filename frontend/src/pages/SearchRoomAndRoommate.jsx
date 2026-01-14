import { useState } from "react";
import { useNavigate } from "react-router-dom";

const dummyListings = [
  {
    _id: "1",
    city: "Bangalore",
    rent: 9000,
    roomType: "Shared",
    furnished: "Furnished",
    preference: "Anyone",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
  },
  {
    _id: "2",
    city: "Delhi",
    rent: 12000,
    roomType: "1BHK",
    furnished: "Semi-Furnished",
    preference: "Male",
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c",
  },
  {
    _id: "3",
    city: "Pune",
    rent: 8000,
    roomType: "PG",
    furnished: "Furnished",
    preference: "Female",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
  },
];

const SearchRoomAndRoommate = () => {
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const [roomType, setRoomType] = useState("");
  const [preference, setPreference] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      let filtered = dummyListings;

      if (city) {
        filtered = filtered.filter((r) =>
          r.city.toLowerCase().includes(city.toLowerCase())
        );
      }

      if (minRent) filtered = filtered.filter((r) => r.rent >= minRent);
      if (maxRent) filtered = filtered.filter((r) => r.rent <= maxRent);
      if (roomType) filtered = filtered.filter((r) => r.roomType === roomType);
      if (preference)
        filtered = filtered.filter((r) => r.preference === preference);

      setResults(filtered);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        🏠 Search Room & Roommate
      </h1>
      <p className="text-gray-600 mb-6">
        Find rooms with compatible roommates in one place
      </p>

      {/* Filters */}
      <form
        onSubmit={handleSearch}
        className="bg-white p-5 rounded shadow grid grid-cols-1 md:grid-cols-5 gap-4 mb-8"
      >
        <input
          type="text"
          placeholder="City"
          className="border p-2 rounded"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <input
          type="number"
          placeholder="Min Rent"
          className="border p-2 rounded"
          value={minRent}
          onChange={(e) => setMinRent(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Rent"
          className="border p-2 rounded"
          value={maxRent}
          onChange={(e) => setMaxRent(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
        >
          <option value="">Room Type</option>
          <option value="1BHK">1BHK</option>
          <option value="Shared">Shared</option>
          <option value="PG">PG</option>
        </select>

        <select
          className="border p-2 rounded"
          value={preference}
          onChange={(e) => setPreference(e.target.value)}
        >
          <option value="">Roommate Preference</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Anyone">Anyone</option>
        </select>

        <button
          type="submit"
          className="md:col-span-5 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Search
        </button>
      </form>

      {/* Results */}
      {loading ? (
        <p>Searching...</p>
      ) : results.length === 0 ? (
        <p className="bg-white p-4 rounded shadow">
          No rooms found. Try changing filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((room) => (
            <div
              key={room._id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <img
                src={room.image}
                className="h-40 w-full object-cover"
                alt="room"
              />

              <div className="p-4">
                <h2 className="text-lg font-semibold">
                  ₹{room.rent} / month
                </h2>
                <p className="text-gray-600 text-sm">{room.city}</p>

                <div className="mt-2 text-sm text-gray-700">
                  <p>🏠 {room.roomType}</p>
                  <p>👤 {room.preference}</p>
                  <p>🚿 {room.furnished}</p>
                </div>

                <button
                  onClick={() => navigate(`/room/${room._id}`)}
                  className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchRoomAndRoommate;
