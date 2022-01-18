import React from "react";
import ReservationItem from "./ReservationItem";

export default function ReservationList({reservations}) {

  const listItems = reservations.map((reservation) => (
    <ReservationItem reservation={reservation} />
  ))
  return (
    <table class="table mt-3">
      <thead>
        <tr>
          <th>#</th>
          <th>NAME</th>
          <th>PHONE</th>
          <th>DATE</th>
          <th>TIME</th>
          <th>PEOPLE</th>
        </tr>
      </thead>
      <tbody>
        {listItems}
      </tbody>
    </table>
  )
}