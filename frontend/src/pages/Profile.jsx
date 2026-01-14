import { useParams } from "react-router-dom";
import { useState } from "react";

const dummyProfiles = [
  {
    _id: "1",
    name: "Aman Verma",
    city: "Delhi",
    budget: 7000,
    preference: "Male",
    profession: "Student",
    bio: "Friendly student looking for a clean and peaceful roommate.",
    avatar: "https://i.pravatar.cc/150?img=12",
    phone: "9876543210",
  },
  {
    _id: "2",
    name: "Priya Sharma",
    city: "Bangalore",
    budget: 9000,
    preference: "Female",
    profession: "Software Engineer",
    bio: "Working professional, non-smoker, loves cooking.",
    avatar: "https://i.pravatar.cc/150?img=47",
    phone: "9998887776",
  },
  {
    _id: "3",
    name: "Rahul Mehta",
    city: "Mumbai",
    budget: 8500,
    preference: "Anyone",
    profession: "Marketing Executive",
    bio: "Easy-going and adaptable roommate.",
    avatar: "https://i.pravatar.cc/150?img=33",
    phone: "9123456780",
  },
];

const Profile = () => {
  const { id } = useParams();
  const [showContact, setShowContact] = useState(false);

  const user = dummyProfiles.find((u) => u._id === id);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-700">User not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-md">
        <div className="flex flex-col items-center">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full border object-cover"
          />

          <h1 className="text-2xl font-bold mt-4">{user.name}</h1>
          <p className="text-gray-500">{user.city}</p>
        </div>

        <div className="mt-6 space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">Profession:</span>{" "}
            {user.profession}
          </p>
          <p>
            <span className="font-semibold">Budget:</span> ₹{user.budget}
          </p>
          <p>
            <span className="font-semibold">Roommate Preference:</span>{" "}
            {user.preference}
          </p>
          <p>
            <span className="font-semibold">About:</span> {user.bio}
          </p>
        </div>

        {/* CONTACT SECTION */}
        {showContact ? (
          <p className="mt-6 text-center text-lg font-semibold text-green-700">
            📞 Contact: {user.phone}
          </p>
        ) : (
          <button
            onClick={() => setShowContact(true)}
            className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Contact
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;

