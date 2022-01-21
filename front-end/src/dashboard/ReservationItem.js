import React from "react";
import { Link } from "react-router-dom";

export default function ReservationItem({reservation}) {
  return (
    <tr key={reservation.reservation_id}>
      <td>{reservation.reservation_id}</td>
      <td>{reservation.last_name}, {reservation.first_name}</td>
      <td>{reservation.mobile_number}</td>
      <td>{reservation.reservation_date}</td>
      <td>{reservation.reservation_time}</td>
      <td>{reservation.people}</td>
      <td>{reservation.status}</td>
      <td>{reservation.status === "booked" && (
        <Link to={`/reservations/${reservation.reservation_id}/seat`}>
          <button
            className="btn btn-secondary"
            type="submit"
            href={`/reservations/${reservation.reservation_id}/seat`}
          >
            Seat
          </button>
        </Link>
      )}</td>
    </tr>
  )
}