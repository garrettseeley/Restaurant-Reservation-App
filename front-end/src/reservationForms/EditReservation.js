import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ReservationForm from "./ReservationForm";
import { asDateString } from "../utils/date-time";
import { readReservation, updateReservation } from "../utils/api";
import ErrorList from "../layout/ErrorList";

export default function EditReservation() {
  const history = useHistory();
  const { reservation_id } = useParams();

  const initialState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const [reservation, setReservation] = useState({ ...initialState });
  const [reservationErrors, setReservationErrors] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    async function singleReservation() {
      try {
        const response = await readReservation(
          reservation_id,
          abortController.signal
        );
        const date = new Date(response.reservation_date)
        setReservation({...response, reservation_date: asDateString(date)})
      } catch (error) {
        setReservationErrors(error);
      }
      return () => abortController.abort();
    }
    singleReservation();
  }, [reservation_id]);

  async function submitHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await updateReservation({
        ...reservation,
        people: Number(reservation.people),
      }, abortController.signal);
    } catch (error) {
      setReservationErrors(error);
      return;
    }
    let resDate = reservation.reservation_date;
    setReservation({...initialState});
    history.push(`/dashboard?date=${resDate}`)
  }

  return (
    <>
      <ErrorList error={reservationErrors} />
      <ReservationForm 
        reservation={reservation}
        setReservation={setReservation}
        submitHandler={submitHandler}
      />
    </>
  );
}
