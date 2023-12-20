import React from 'react';

const Sidebar = () => {
  return (
    <div className="d-flex flex-column align-items-center p-2 justify-content-start position-fixed" style={{ width: '20%', height: '100vh' }}>
      <a className="text-black text-decoration-none mb-2 mt-5">Request Equipment</a>
      <a className="text-black text-decoration-none mb-2 mt-5">Request Room</a>
    </div>
  );
};

export default Sidebar;
