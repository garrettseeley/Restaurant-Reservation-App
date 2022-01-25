import React, { useState } from "react";
import ReservationList from "./lists/ReservationList";
import { mobileNumberSearch } from "./utils/api";

export default function Search() {
  const [number, setNumber] = useState("");
  const [reservations, setReservations] = useState([]);
  const [searched, setSearched] = useState(false);

  function changeHandler(event) {
    return setNumber(event.target.value);
  }

  async function submitHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      const data = await mobileNumberSearch(number, abortController.signal);
      setReservations(data);
      setSearched(true);
    } catch (error) {
      return;
    }
    return () => abortController.abort();
  }

  return (
    <>
      <div className="row">
        <h2 className="col">Search by Mobile Number</h2>
      </div>
      <div className="row">
        <div className="col-auto">
          <input
            id="input"
            name="mobile_number"
            required
            value={number}
            onChange={changeHandler}
            className="form-control"
          />
        </div>
        <div className="row">
          <div className="col">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={submitHandler}
            >
              Find
            </button>
          </div>
        </div>
      </div>
      <div>
        {!reservations.length && searched && (
          <div className="row">
            <div className="col">No reservations found</div>
          </div>
        )}
        {reservations.length > 0 && searched && (
          <div className="row">
            <div className="col">
            <ReservationList reservations={reservations}/>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
