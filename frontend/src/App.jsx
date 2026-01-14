import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateProfile from "./pages/CreateProfile";
import Rooms from "./pages/Rooms";
import SearchRoommate from "./pages/SearchRoommate";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Search is public */}
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/search-roommate" element={<SearchRoommate />} />

        {/* Protected */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/create-profile" 
          element={
            <ProtectedRoute>
              <CreateProfile />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/profile/:id" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />

      </Routes>
    </Router>
  );
}

export default App;


