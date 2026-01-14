import { useState } from "react";
import { useNavigate } from "react-router-dom";

const indianCities = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Chandigarh",
  "Noida",
  "Gurgaon",
  "Faridabad",
  "Ghaziabad",
  "Lucknow",
  "Kanpur",
  "Indore",
  "Bhopal",
  "Patna",
  "Ranchi",
  "Bhubaneswar",
  "Cuttack",
  "Raipur",
  "Nagpur",
  "Nashik",
  "Aurangabad",
  "Thane",
  "Panvel",
  "Navi Mumbai",
  "Surat",
  "Vadodara",
  "Rajkot",
  "Udaipur",
  "Jodhpur",
  "Kota",
  "Ajmer",
  "Amritsar",
  "Ludhiana",
  "Jalandhar",
  "Patiala",
  "Dehradun",
  "Haridwar",
  "Roorkee",
  "Shimla",
  "Solan",
  "Manali",
  "Kullu",
  "Srinagar",
  "Jammu",
  "Anantnag",
  "Leh",
  "Kargil",
  "Guwahati",
  "Silchar",
  "Dibrugarh",
  "Jorhat",
  "Tezpur",
  "Shillong",
  "Imphal",
  "Aizawl",
  "Kohima",
  "Agartala",
  "Gangtok",
  "Itanagar",
  "Dimapur",
  "Mokokchung",
  "Ziro",
  "Pasighat",
  "Vijayawada",
  "Guntur",
  "Visakhapatnam",
  "Rajahmundry",
  "Kakinada",
  "Tirupati",
  "Warangal",
  "Karimnagar",
  "Nizamabad",
  "Coimbatore",
  "Madurai",
  "Trichy",
  "Salem",
  "Erode",
  "Tirunelveli",
  "Vellore",
  "Hosur",
  "Tiruppur",
  "Kochi",
  "Ernakulam",
  "Thrissur",
  "Trivandrum",
  "Kozhikode",
  "Kottayam",
  "Alappuzha",
  "Palakkad",
  "Malappuram",
  "Kannur",
  "Kasaragod",
  "Udupi",
  "Mangalore",
  "Hubli",
  "Dharwad",
  "Belgaum",
  "Davangere",
  "Mysore",
  "Shimoga",
  "Tumkur",
  "Ballari",
];



const dummyResults = [
  {
    _id: "1",
    name: "Aman Verma",
    city: "Delhi",
    budget: 7000,
    preference: "Male",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    _id: "2",
    name: "Priya Sharma",
    city: "Bangalore",
    budget: 9000,
    preference: "Female",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    _id: "3",
    name: "Rahul Mehta",
    city: "Mumbai",
    budget: 8500,
    preference: "Anyone",
    avatar: "https://i.pravatar.cc/150?img=33",
  },
  {
    _id: "4",
    name: "Sneha Kapoor",
    city: "Pune",
    budget: 6500,
    preference: "Female",
    avatar: "https://i.pravatar.cc/150?img=25",
  },
  {
    _id: "5",
    name: "Karan Singh",
    city: "Noida",
    budget: 8000,
    preference: "Anyone",
    avatar: "https://i.pravatar.cc/150?img=15",
  },
  {
    _id: "6",
    name: "Anjali Gupta",
    city: "Gurgaon",
    budget: 10000,
    preference: "Female",
    avatar: "https://i.pravatar.cc/150?img=60",
  },
];

const SearchRoommate = () => {
    const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");
  const [preference, setPreference] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);


  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API delay
    setTimeout(() => {
      let filtered = dummyResults;

      if (city) {
        filtered = filtered.filter((u) =>
          u.city.toLowerCase().includes(city.toLowerCase())
        );
      }

      if (minBudget) {
        filtered = filtered.filter((u) => u.budget >= Number(minBudget));
      }

      if (maxBudget) {
        filtered = filtered.filter((u) => u.budget <= Number(maxBudget));
      }

      if (preference) {
        filtered = filtered.filter((u) => u.preference === preference);
      }

      setResults(filtered);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        🔍 Search Roommate
      </h1>
      <p className="text-gray-600 mb-6">
        Apply filters below to find compatible roommates
      </p>

      {/* ---------- Search Form ---------- */}
      <form
        onSubmit={handleSearch}
        className="bg-white p-5 rounded shadow grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
      >
        <div className="relative">
  <input
    type="text"
    placeholder="Enter City"
    className="border p-2 rounded w-full"
    value={city}
    onChange={(e) => {
      const value = e.target.value;
      setCity(value);

      if (value.length > 0) {
        const matches = indianCities
          .filter((c) =>
            c.toLowerCase().startsWith(value.toLowerCase())
          )
          .slice(0, 6); // limit suggestions

        setSuggestions(matches);
      } else {
        setSuggestions([]);
      }
    }}
    onBlur={() => {
      // Delay so click works
      setTimeout(() => setSuggestions([]), 150);
    }}
  />

  {/* Suggestions dropdown */}
  {suggestions.length > 0 && (
    <ul className="absolute z-10 bg-white border rounded w-full mt-1 shadow">
      {suggestions.map((c) => (
        <li
          key={c}
          onClick={() => {
            setCity(c);
            setSuggestions([]);
          }}
          className="px-3 py-2 cursor-pointer hover:bg-indigo-100"
        >
          {c}
        </li>
      ))}
    </ul>
  )}
</div>


        <input
          type="number"
          placeholder="Min Budget"
          className="border p-2 rounded"
          value={minBudget}
          onChange={(e) => setMinBudget(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Budget"
          className="border p-2 rounded"
          value={maxBudget}
          onChange={(e) => setMaxBudget(e.target.value)}
        />

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
          className="md:col-span-4 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Search
        </button>
      </form>

      {/* ---------- Results Grid ---------- */}
      {loading ? (
        <p className="text-gray-700">Searching...</p>
      ) : results.length === 0 ? (
        <p className="text-gray-700 bg-white p-4 rounded shadow">
          No roommates found. Try different filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((user) => (
            <div
              key={user._id}
              className="bg-white shadow rounded-lg p-4 border hover:scale-[1.02] transition"
            >
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
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
                  {user.preference}
                </p>
              </div>

                <button
        onClick={() => navigate(`/profile/${user._id}`)}
        className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
    >
    View Profile
</button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchRoommate;

