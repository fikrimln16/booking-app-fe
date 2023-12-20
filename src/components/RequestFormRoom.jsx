import React, { useState } from "react";
import axios from "axios"
;
const RequestFormRoom = () => {
  const [bookingRoomDate, setBookingRoomDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [agenda, setAgenda] = useState("");
  const [userOperator, setUserOperator] = useState("");
  const [technicalNote, setTechnicalNote] = useState("");
  const [room, setRoom] = useState("");
  const [roomDesc, setRoomDesc] = useState("");
  const [locationDesc, setLocationDesc] = useState("");
  const [roomFacilities, setRoomFacilities] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  // Handlers for updating state
  const handleBookingRoomDateChange = (event) => {
    setBookingRoomDate(event.target.value);
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleAgendaChange = (event) => {
    setAgenda(event.target.value);
  };

  const handleUserOperatorChange = (event) => {
    setUserOperator(event.target.value);
  };

  const handleTechnicalNoteChange = (event) => {
    setTechnicalNote(event.target.value);
  };

  const handleRoomChange = (event) => {
    setRoom(event.target.value);
  };

  const handleRoomDescChange = (event) => {
    setRoomDesc(event.target.value);
  };

  const handleLocationDescChange = (event) => {
    setLocationDesc(event.target.value);
  };

  const handleRoomFacilitiesChange = (event) => {
    setRoomFacilities(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  // Request body
  const requestBody = {
    bookingRoomDate,
    startTime,
    endTime,
    agenda,
    userOperator,
    technicalNote,
    room,
    roomDesc,
    locationDesc,
    roomFacilities,
    name,
    email,
    phoneNumber,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setShowConfirmationModal(true);
  };

  const handleCancelConfirmation = () => {
    setShowConfirmationModal(false);
  };

  const handleConfirmation = () => {
    axios.post("http://localhost:3000/bookingRoom", requestBody)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          console.log("Request successfully submitted to the server");
          setBookingRoomDate("");
          setStartTime("");
          setEndTime("");
          setAgenda("");
          setUserOperator("");
          setTechnicalNote("");
          setRoom("");
          setRoomDesc("");
          setLocationDesc("");
          setRoomFacilities("");
          setName("");
          setEmail("");
          setPhoneNumber("");
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

  return (
    <div
      className="container mt-3 p-4"
      style={{ borderLeft: "2px solid black", borderRight: "2px solid black" }}
    >
      <h1 className="mb-4">Add Request Room</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="bookingRoomDate" className="form-label">
            Booking Room Date
          </label>
          <input
            type="date"
            className="form-control"
            id="bookingRoomDate"
            onChange={handleBookingRoomDateChange}
            placeholder="Select booking date"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="startTime" className="form-label">
            Start Time<span className="form-text text-danger">*</span>
          </label>
          <input
            type="time"
            className="form-control"
            id="startTime"
            required
            onChange={handleStartTimeChange}
            placeholder="Select start time"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endTime" className="form-label">
            End Time
          </label>
          <input
            type="time"
            className="form-control"
            id="endTime"
            onChange={handleEndTimeChange}
            placeholder="Select end time"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="agenda" className="form-label">
            Agenda
          </label>
          <input
            type="text"
            className="form-control"
            id="agenda"
            onChange={handleAgendaChange}
            placeholder="Input your agenda"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="userOperator" className="form-label">
            Use Operator<span className="form-text text-danger">*</span>
          </label>
          <select
            className="form-control"
            id="userOperator"
            required
            onChange={handleUserOperatorChange}
          >
            <option selected disabled>
              Masukkan pilihan
            </option>
            <option value="yes">yes</option>
            <option value="no">no</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="technicalNote" className="form-label">
            Technical Note
          </label>
          <textarea
            type="textarea"
            className="form-control"
            id="technicalNote"
            onChange={handleTechnicalNoteChange}
            placeholder="Input your technical note"
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="room" className="form-label">
            Room
          </label>
          <input
            type="text"
            className="form-control"
            id="room"
            onChange={handleRoomChange}
            placeholder="Input Room"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="roomDesc" className="form-label">
            Room Description
          </label>
          <textarea
            className="form-control"
            id="roomDesc"
            rows="3"
            onChange={handleRoomDescChange}
            placeholder="Input Room Description"
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="locationDesc" className="form-label">
            Location Description
          </label>
          <textarea
            className="form-control"
            id="locationDesc"
            rows="3"
            onChange={handleLocationDescChange}
            placeholder="Input Location Description"
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="roomFacilities" className="form-label">
            Room Facilities
          </label>
          <textarea
            className="form-control"
            id="roomFacilities"
            rows="3"
            onChange={handleRoomFacilitiesChange}
            placeholder="Input Room Facilities"
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            onChange={handleNameChange}
            placeholder="Input your name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={handleEmailChange}
            placeholder="Input your email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="phoneNumber"
            onChange={handlePhoneNumberChange}
            placeholder="Input your phone number"
          />
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
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

export default RequestFormRoom;
