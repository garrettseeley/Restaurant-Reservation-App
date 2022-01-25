import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { postReservation } from "../utils/api";
import { asDateString } from "../utils/date-time";
import ReservationForm from "./ReservationForm";
import ErrorList from "../layout/ErrorList";

export default function NewReservation() {
  const history = useHistory();
  const today = new Date();

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
    try {
      await postReservation({
        ...reservation,
        people: Number(reservation.people),
      });
    } catch (error) {
      setReservationErrors(error);
      return;
    }
    let resDate = reservation.reservation_date;
    setReservation({ ...initialState });
    history.push(`/dashboard?date=${resDate}`);
  }

  return (
    <>
      <ErrorList error={reservationErrors}/>
      <ReservationForm
        reservation={reservation}
        setReservation={setReservation}
        submitHandler={submitHandler}
      />
    </>
  );
}
