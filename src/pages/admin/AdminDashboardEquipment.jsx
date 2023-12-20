import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import EquipmentTable from "../../components/EquipmentTable";

const AdminDashboardEquipment = () => {
  const [equipmentRequest, setEquipmentRequest] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://localhost:3000/equipments-bookings';

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setEquipmentRequest(data.bookingEquipments || []))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="h overflow-hidden m-auto">
      <NavBar isAdmin={true}/>
      <div className="d-flex">
        <div className="flex-grow-1 p-3">
          <h2 className="m-4 p-lg-1">Ticket Request Equipment</h2>
          <EquipmentTable equipmentRequests={equipmentRequest}></EquipmentTable>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardEquipment;
