import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { postReservation } from "../utils/api";
import { asDateString } from "../utils/date-time";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";

export default function NewReservation() {
  const history = useHistory();
  const today = new Date();

  // sets the initial state
  const initialState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: asDateString(today),
    reservation_time: today.toTimeString().slice(0, 5),
    people: "",
  };

  const [reservation, setReservation] = useState({ ...initialState });
  const [reservationErrors, setReservationErrors] = useState(null);

  async function submitHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await postReservation({
        ...reservation,
        people: Number(reservation.people),
      }, abortController.signal);
    } catch (error) {
      setReservationErrors(error.message.split("."));

      return;
    }
    let resDate = reservation.reservation_date;
    setReservation({ ...initialState });
    history.push(`/dashboard?date=${resDate}`);
  }

  return (
    <>
      <ErrorAlert error={reservationErrors}/>
      <ReservationForm
        reservation={reservation}
        setReservation={setReservation}
        submitHandler={submitHandler}
        status={"Create"}
      />
    </>
  );
}
