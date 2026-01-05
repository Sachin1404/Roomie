import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [data, setData] = useState({ name:"", email:"", password:"" });

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      data
    );

    alert(res.data.msg);   // <-- show backend message
  } catch (err) {
    alert(err.response?.data?.msg || "Something went wrong");
  }
};


  return (
    <div className="h-screen flex justify-center items-center bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow w-80">
        <h2 className="text-xl font-bold mb-4">Register</h2>

        <input className="border p-2 w-full mb-2"
          placeholder="Name"
          onChange={e=>setData({...data,name:e.target.value})}
        />

        <input className="border p-2 w-full mb-2"
          placeholder="Email"
          onChange={e=>setData({...data,email:e.target.value})}
        />

        <input className="border p-2 w-full mb-2"
          placeholder="Password"
          type="password"
          onChange={e=>setData({...data,password:e.target.value})}
        />

        <button type="submit" className="bg-blue-600 text-white w-full p-2 rounded">
          Register
        </button>
      </form>
    </div>
  )
}
