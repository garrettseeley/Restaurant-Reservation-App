import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { postReservation } from "../utils/api";
import { asDateString } from "../utils/date-time";

export default function NewReservation() {
  const history = useHistory();
  const date = new Date();

  const initialState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: asDateString(date),
    reservation_time: date.toTimeString().slice(0, 5),
    people: "",
  };

  const [reservation, setReservation] = useState({ ...initialState });
  const [resErrors, setResErrors] = useState([]);

  async function submitHandler(event) {
    event.preventDefault();

    try {
      await postReservation({
        ...reservation,
        people: Number(reservation.people),
      });
    } catch (error) {
      return setResErrors(error.message);
    }
    let resDate = reservation.reservation_date;
    setReservation({ ...initialState });
    history.push(`/dashboard?date=${resDate}`);
  }

  function changeHandler({ target: { name, value } }) {
    setReservation((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  }

  // function changePeopleHandler({ target: {name, value}}) {
  //   setReservation((previousState) => ({
  //     ...previousState,
  //     [name]: Number(value),
  //   }));
  // }

  async function cancelHandler(event) {
    event.preventDefault();
    history.goBack();
  }

  return (
    <>
      {resErrors.length === 0 ? null : (
        <ul className="alert alert-danger">
          {resErrors.map((r, index) => (
            <li key={index}>{r}</li>
          ))}
        </ul>
      )}
      <form>
        <fieldset>
          <div className="row">
            <h2 className="col">Create Reservation</h2>
          </div>
          <div className="row">
            <div className="form-group col">
              <label for="first_name">First Name</label>
              <div>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  placeholder="First Name"
                  required
                  value={reservation.first_name}
                  onChange={changeHandler}
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group col">
              <label for="last_name">Last Name</label>
              <div>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  placeholder="Last Name"
                  required
                  value={reservation.last_name}
                  onChange={changeHandler}
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group col">
              <label for="mobile_number">Mobile Number</label>
              <div>
                <input
                  type="text"
                  id="mobile_number"
                  name="mobile_number"
                  placeholder="Mobile Number"
                  required
                  value={reservation.mobile_number}
                  onChange={changeHandler}
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col">
              <label for="reservation_date">Reservation Date</label>
              <div>
                <input
                  type="date"
                  id="reservation_date"
                  name="reservation_date"
                  required
                  value={reservation.reservation_date}
                  onChange={changeHandler}
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group col">
              <label for="reservation_time">Reservation Time</label>
              <div>
                <input
                  type="time"
                  id="reservation_time"
                  name="reservation_time"
                  required
                  value={reservation.reservation_time}
                  onChange={changeHandler}
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group col">
              <label for="people">People</label>
              <div>
                <input
                  type="number"
                  id="people"
                  name="people"
                  placeholder="Number of People in Party"
                  required
                  value={reservation.people}
                  onChange={changeHandler}
                  className="form-control"
                  min="1"
                />
              </div>
            </div>
          </div>
          <button
            type="cancel"
            className="btn btn-secondary mr-2"
            onClick={cancelHandler}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={submitHandler}
          >
            Submit
          </button>
        </fieldset>
      </form>
    </>
  );
}
