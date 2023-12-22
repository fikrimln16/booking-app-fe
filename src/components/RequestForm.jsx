import React, { useState } from "react";
import axios from "axios";


const RequestForm = () => {
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [date, setDate] = useState("");
  const [agenda, setAgenda] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [borrowedEquipment, setBorrowedEquipment] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleNamaChange = (event) => {
    setNama(event.target.value);
  };

  const handleNimChange = (event) => {
    setNim(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleAgendaChange = (event) => {
    setAgenda(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const requestBody = {
    nama,
    nim,
    date,
    agenda,
    location,
    phoneNumber,
    borrowedEquipment
  };

  const handleBorrowedEquipmentChange = (event) => {
    const equipmentArray = event.target.value
      .split(" ")
      .filter((equipment) => equipment.trim() !== "");

    setBorrowedEquipment(equipmentArray);
  };

  const handleCancelConfirmation = () => {
    setShowConfirmationModal(false);
  };

  const handleConfirmation = () => {
    axios.post("http://localhost:3000/bookingEquipments", requestBody)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          console.log("Request successfully submitted to the server");
          setNama("");
          setNim("");
          setDate("");
          setAgenda("");
          setLocation("");
          setPhoneNumber("");
          setBorrowedEquipment("");
        } else {
          console.error("Failed to submit request to the server. Unexpected status code:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error during POST request:", error);
      })
      .finally(() => {
        setShowConfirmationModal(false);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setShowConfirmationModal(true);
  };

  return (
    <div
      className="container mt-3 p-4"
      style={{ borderLeft: "2px solid black", borderRight: "2px solid black" }}
    >
      <h1 className="mb-4">Add Request Equipment</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
            <span
              className="tooltip-element"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Masukkan nama anda"
            ></span>
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Input your name"
            onChange={handleNamaChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nimNip" className="form-label">
            NIM/NIP<span className="form-text text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="nim"
            placeholder="Input your NIM/NIP"
            required
            onChange={handleNimChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date<span className="form-text text-danger">*</span>
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            placeholder="Input date booking"
            required
            onChange={handleDateChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="agenda" className="form-label">
            Agenda<span className="form-text text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="agenda"
            placeholder="Input your agenda"
            required
            onChange={handleAgendaChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location<span className="form-text text-danger">*</span>
          </label>
          <select
            className="form-control"
            id="location"
            required
            onChange={handleLocationChange}
          >
            <option selected disabled>
              Input Room
            </option>
            <option value="TULT">TULT</option>
            <option value="Gedung A">Gedung A</option>
            <option value="GKU">Option 3</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="phoneNumber"
            placeholder="Input your phone number"
            onChange={handlePhoneNumberChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="borrowedEquipment" className="form-label">
            Borrowed Equipment<span className="form-text text-danger">*</span>
          </label>
          <textarea
            className="form-control"
            id="borrowedEquipment"
            rows="5"
            placeholder="Input your borrowed items"
            required
            onChange={handleBorrowedEquipmentChange}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>

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

export default RequestForm;
