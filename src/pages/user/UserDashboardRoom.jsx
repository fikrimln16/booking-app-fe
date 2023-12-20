import React from "react";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";
import RequestFormRoom from "../../components/RequestFormRoom";

const UserDashboardRoom = () => {
  return (
    <div className="h overflow-hidden m-auto">
      <NavBar/>
      <div className="d-flex">
        <div className="flex-grow-1 p-3">
          <RequestFormRoom />
        </div>
      </div>
    </div>
  );
};

export default UserDashboardRoom;
