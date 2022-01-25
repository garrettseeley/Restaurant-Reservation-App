import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import { listTables } from "../utils/api";
import { previous, next, today } from "../utils/date-time";
import { Link } from "react-router-dom";
import ReservationList from "../lists/ReservationList";
import TableList from "../lists/TableList";
import ErrorList from "../layout/ErrorList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadDashboard, [date]);
  useEffect(loadTables, []);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="row">
        <div className="col">
          <div className="d-md-flex mb-3">
            <h4 className="mb-0">Reservations for date {date}</h4>
          </div>
          <div>
            <Link to={`/dashboard?date=${previous(date)}`}>
              <button className="btn btn-secondary mr-2">Previous</button>
            </Link>
            <Link to={`/dashboard?date=${today()}`}>
              <button className="btn btn-secondary mr-2">Today</button>
            </Link>
            <Link to={`/dashboard?date=${next(date)}`}>
              <button className="btn btn-secondary">Next</button>
            </Link>
          </div>
          <ErrorList error={reservationsError} />

          <div>
            <ReservationList reservations={reservations} />
          </div>
        </div>
        <div className="col">
          <ErrorList error={tablesError} />
          <div>
            <TableList
              tables={tables}
              setTables={setTables}
              setReservations={setReservations}
              date={date}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
