import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [data,setData] = useState({email:"",password:""});

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      data
    );

    alert(res.data.msg);

    localStorage.setItem("token", res.data.token);
    window.location = "/";
  } catch (err) {
    console.log("Full Error:", err);
    console.log("Backend Response:", err.response?.data);

    const msg =
      err.response?.data?.msg ||      // our custom backend messages
      err.response?.data?.message ||  // generic error message
      "Server error";                 // fallback

    alert(msg);
  }
};



  return (
    <div className="h-screen flex justify-center items-center bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input className="border p-2 w-full mb-2"
          placeholder="Email"
          onChange={e=>setData({...data,email:e.target.value})}
        />

        <input className="border p-2 w-full mb-2"
          placeholder="Password"
          type="password"
          onChange={e=>setData({...data,password:e.target.value})}
        />

        <button className="bg-green-600 text-white w-full p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
