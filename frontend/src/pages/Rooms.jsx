import { useState, useEffect } from "react";
import axios from "axios";

export default function Rooms() {
  const [rooms,setRooms] = useState([]);

  useEffect(()=>{
    (async()=>{
      const res = await axios.get("http://localhost:5000/api/rooms");
      setRooms(res.data);
    })()
  },[]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Available Rooms</h1>

      <div className="grid gap-4">
        {rooms.map(r=>(
          <div key={r._id} className="border p-3 rounded">
            <p>City: {r.city}</p>
            <p>Rent: ₹{r.rent}</p>
            <p>{r.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
