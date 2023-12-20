import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import RoomTable from "../../components/RoomTable";

const AdminDashboardRoom = () => {
  const [roomRequest, setRoomRequest] = useState([]);

  useEffect(() => {
    const apiUrl = "http://localhost:3000/room-bookings";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setRoomRequest(data.bookingData || []))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="h overflow-hidden m-auto">
      <NavBar isAdmin={true}/>
      <div className="d-flex">
        <div className="flex-grow-1 p-3">
        <h2 className="m-4 p-lg-1">Ticket Request Room</h2>
          <RoomTable roomRequests={roomRequest}></RoomTable>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardRoom;
