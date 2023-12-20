import React, { useState, useEffect } from "react";
import axios from 'axios';

const EquipmentTable = ({ equipmentRequests }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [visibleRows, setVisibleRows] = useState(8);
  const [displayedRequests, setDisplayedRequests] = useState([]);

  useEffect(() => {
    setDisplayedRequests(equipmentRequests.slice(0, visibleRows));
  }, [equipmentRequests, visibleRows]);

  const handleApproveClick = (request) => {
    if (request.status !== "Approved") {
      setShowConfirmationModal(true);
      setSelectedRequest(request);
    }
  };

  const handleConfirmation = () => {
    setShowConfirmationModal(false);

    axios
      .post("http://localhost:3000/approve-equipment", {
        nama: selectedRequest.nama,
        nim: selectedRequest.nim,
        date: selectedRequest.date,
      })
      .then((response) => {
        const updatedDisplayedRequests = displayedRequests.map((request) =>
          request === selectedRequest
            ? { ...selectedRequest, status: "Approved" }
            : request
        );
        setDisplayedRequests(updatedDisplayedRequests);
      })
      .catch((error) => {
        console.error("Error approving request:", error);
      })
      .finally(() => {
        setSelectedRequest(null);
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
                <th scope="col">Date</th>
                <th scope="col">Agenda</th>
                <th scope="col">Location</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Borrowed Equipment</th>
                <th scope="col" className="text-center">
                  Status
                </th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedRequests.map((request, index) => (
                <tr key={index}>
                  <td>{request.nama}</td>
                  <td>{request.nim}</td>
                  <td>{request.date}</td>
                  <td>{request.agenda}</td>
                  <td>{request.location}</td>
                  <td>{request.phoneNumber}</td>
                  <td>{request.borrowedEquipment.join(", ")}</td>
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
          {equipmentRequests.length > visibleRows && (
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

export default EquipmentTable;
