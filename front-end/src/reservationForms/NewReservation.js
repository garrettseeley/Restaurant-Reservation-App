import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { postReservation } from "../utils/api";
import { asDateString } from "../utils/date-time";
import ReservationForm from "./ReservationForm";

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

  return (
    <>
      {resErrors.length === 0 ? null : (
        <ul className="alert alert-danger">
          {resErrors.map((r, index) => (
            <li key={index}>{r}</li>
          ))}
        </ul>
      )}
      <ReservationForm
        reservation={reservation}
        setReservation={setReservation}
        submitHandler={submitHandler}
      />
    </>
  );
}
