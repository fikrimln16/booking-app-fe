import React from "react";
import NavBar from "../../components/NavBar";
import RequestForm from "../../components/RequestForm";

const UserDashboardEquipment = () => {
  return (
    <div className="h overflow-hidden m-auto">
      <NavBar/>
      <div className="d-flex">
        <div className="flex-grow-1 p-3">
          <RequestForm />
        </div>
      </div>
    </div>
  );
};

export default UserDashboardEquipment;
