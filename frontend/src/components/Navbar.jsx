import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      
      {/* Logo / App Name */}
      <h1
        className="text-xl font-bold text-indigo-600 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        Roomie 🏠
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Search Roommate */}
        <button
          onClick={() => navigate("/search-roommate")}
          title="Search Roommate"
          className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700"
        >
          🔍
        </button>

        {/* Search Room & Roommate */}
        <button
          onClick={() => navigate("/search-room-and-roommate")}
          title="Search Room & Roommate"
          className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700"
        >
          🏠
        </button>

        {/* User Name (optional) */}
        {user && (
          <span className="text-gray-700 font-medium">
            Hi, {user.name}
          </span>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
