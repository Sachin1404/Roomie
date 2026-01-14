import { useParams, useNavigate } from "react-router-dom";

const dummyRoom = {
  _id: "1",
  city: "Bangalore",
  rent: 9000,
  roomType: "Shared",
  furnished: "Furnished",
  address: "BTM Layout, Bangalore",
  description:
    "Spacious shared room with good ventilation, close to metro and IT hubs.",
  phone: "+91 98765 43210",
  images: [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
  ],
  roommates: [
    {
      name: "Aman Verma",
      age: 23,
      occupation: "Software Engineer",
    },
    {
      name: "Rahul Mehta",
      age: 24,
      occupation: "MBA Student",
    },
  ],
};

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const hasProfile = localStorage.getItem("hasProfile") === "true";

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-indigo-600 font-semibold"
      >
        ← Back
      </button>

      {/* Room Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {dummyRoom.images.map((img, index) => (
          <img
            key={index}
            src={img}
            className="rounded-lg h-60 w-full object-cover"
          />
        ))}
      </div>

      {/* Room Info */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h1 className="text-2xl font-bold mb-2">
          ₹{dummyRoom.rent} / month
        </h1>
        <p className="text-gray-600">{dummyRoom.address}</p>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <p>🏠 {dummyRoom.roomType}</p>
          <p>🚿 {dummyRoom.furnished}</p>
          <p>📍 {dummyRoom.city}</p>
        </div>

        <p className="mt-4 text-gray-700">
          {dummyRoom.description}
        </p>
      </div>

      {/* Roommates */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">
          Roommates ({dummyRoom.roommates.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dummyRoom.roommates.map((mate, index) => (
            <div
              key={index}
              className="border rounded p-4"
            >
              <h3 className="font-semibold">{mate.name}</h3>
              <p className="text-sm text-gray-600">
                {mate.age} yrs • {mate.occupation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-2">
          Contact Owner
        </h2>

        {hasProfile ? (
          <p className="text-lg font-semibold text-green-600">
            📞 {dummyRoom.phone}
          </p>
        ) : (
          <div className="bg-yellow-50 border border-yellow-300 p-4 rounded">
            <p className="text-gray-800 mb-3">
              🔒 Create a profile to view contact details
            </p>
            <button
              onClick={() => navigate("/create-profile")}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Create Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomDetails;
