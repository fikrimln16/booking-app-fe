import React, { useState, useEffect } from "react";
import axios from "axios";

const RoomTable = ({ roomRequests }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [visibleRows, setVisibleRows] = useState(8);
  const [displayedRequests, setDisplayedRequests] = useState([]);

  useEffect(() => {
    setDisplayedRequests(roomRequests.slice(0, visibleRows));
  }, [roomRequests, visibleRows]);

  const handleApproveClick = (request) => {
    if (request.status !== "Approved") {
      setShowConfirmationModal(true);
      setSelectedRequest(request);
    }
  };

  const handleConfirmation = () => {
    setShowConfirmationModal(false);

    axios.post("http://localhost:3000/approve-room", {
      nama: selectedRequest.name,
      email: selectedRequest.email,
      phoneNumber: selectedRequest.phoneNumber,
    })
      .then(response => {
        const updatedDisplayedRequests = displayedRequests.map(request =>
          request === selectedRequest
            ? { ...selectedRequest, status: "Approved" }
            : request
        );
        setDisplayedRequests(updatedDisplayedRequests);
      })
      .catch(error => {
        console.error('Error approving request:', error);
      });
  };

  const handleCancelConfirmation = () => {
    setShowConfirmationModal(false);
    setSelectedRequest(null);
  };

  const handleShowMore = () => {
    setVisibleRows((prevVisibleRows) => prevVisibleRows + 8);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Nama</th>
                <th scope="col">NIM</th>
                <th scope="col">Booking Date</th>
                <th scope="col">Start Time</th>
                <th scope="col">End Time</th>
                <th scope="col">Room</th>
                <th scope="col" className="text-center">
                  Status
                </th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedRequests.map((request, index) => (
                <tr key={index}>
                  <td>{request.name}</td>
                  <td>{request.email}</td>
                  <td>{request.bookingRoomDate}</td>
                  <td>{request.startTime}</td>
                  <td>{request.endTime}</td>
                  <td>{request.room}</td>
                  <td className="text-center">
                    {/* Ubah warna dan teks pada kolom Status */}
                    <span
                      className={`badge ${
                        request.status === "Approved"
                          ? "bg-success text-white"
                          : "bg-danger text-white"
                      }`}
                    >
                      {request.status === "Approved" ? "Approved" : "Pending"}
                    </span>
                  </td>
                  <td>
                    {request.status !== "Approved" && (
                      <button
                        type="button"
                        className="btn btn-dark"
                        onClick={() => handleApproveClick(request)}
                      >
                        <i className="fas fa-edit"></i> Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {roomRequests.length > visibleRows && (
            <button className="btn btn-primary" onClick={handleShowMore}>
              Show More
            </button>
          )}
        </div>
      </div>

      {/* Modal Konfirmasi */}
      <div
        className="modal"
        tabIndex="-1"
        role="dialog"
        style={{ display: showConfirmationModal ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Konfirmasi Approve</h5>
              <button
                type="button"
                className="close"
                onClick={handleCancelConfirmation}
              >
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Apakah Anda yakin ingin menyetujui permintaan ini?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancelConfirmation}
              >
                Batal
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleConfirmation}
              >
                Setuju
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomTable;


