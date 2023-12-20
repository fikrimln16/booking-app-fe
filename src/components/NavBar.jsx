import React from 'react';

const NavBar = ({ isAdmin }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-danger bg-danger p-3">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <a className="navbar-brand text-white width-20px" href="#">
          <img src="logo-humic-text.png" alt="Logo" width="200" height="100" />
        </a>
        <ul className="navbar-nav mr-auto m-4">
          <li className="nav-item">
            <a className="nav-link text-white" href={isAdmin ? "/admin-request-room" : "/request-room"}>
              {isAdmin ? "Ticket Request Room" : "Request Room"}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href={isAdmin ? "/admin-request-equipment" : "/request-equipment"}>
              {isAdmin ? "Ticket Request Equipment" : "Request Equipment"}
            </a>
          </li>
        </ul>
      </div>

      <div className="navbar-center">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link text-white disabled" href="#">Login as</a>
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item m-auto">
            <a className="nav-link text-black font-weight-bold bg-white rounded p-2 mr-2" href="#">{isAdmin ? "Admin" : "User"}</a>
          </li>
          <li className="nav-item m-3">
            <a className="nav-link text-black font-weight-bold bg-white rounded p-2" href="/">LogOut</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

