import React from "react";
import ReservationItem from "./ReservationItem";
import { listReservations, mobileNumberSearch } from "../utils/api";

export default function ReservationList({
  reservations,
  setReservations,
  date,
  fromSearch,
  number,
}) {
  // function to refresh the reservations list when the cancel button is pressed and confirmed
  function refreshRes() {
    const abortController = new AbortController();
    if (!fromSearch) {
      listReservations({ date }, abortController.signal).then(setReservations);
    } else if (fromSearch) {
      mobileNumberSearch(number, abortController.signal).then(setReservations);
    }

    return () => abortController.abort();
  }

  // maps each item from the reservations to a table row
  const listItems = reservations.map((reservation) => (
    <tr key={reservation.reservation_id}>
      <ReservationItem reservation={reservation} refreshRes={refreshRes} />
    </tr>
  ));
  return (
    <>
      <div>
        {reservations.length === 0 && (
          <h5 className="my-4">There are no reservations today</h5>
        )}
      </div>
      <div>
        {reservations.length > 0 && (
          <table className="table mt-3 w-auto table-bordered">
            <thead className="thead-ox">
              <tr>
                <th>#</th>
                <th>NAME</th>
                <th>PHONE</th>
                <th>DATE</th>
                <th>TIME</th>
                <th>PEOPLE</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="tbody-white">{listItems}</tbody>
          </table>
        )}
      </div>
    </>
  );
}
