import React from "react";

export default function ReservationItem({reservation}) {
  return (
    <tr>
      <td>{reservation.reservation_id}</td>
      <td>{reservation.last_name}, {reservation.first_name}</td>
      <td>{reservation.mobile_number}</td>
      <td>{reservation.reservation_date}</td>
      <td>{reservation.reservation_time}</td>
      <td>{reservation.people}</td>
    </tr>
  )
}