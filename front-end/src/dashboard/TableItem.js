import React from "react";
import { deleteSeat } from "../utils/api";
import { listReservations, listTables } from "../utils/api";

export default function TableItem({ table, setTables, setReservations, date }) {
  let status = !table.reservation_id ? "Free" : "Occupied";

  async function deleteHandler(table) {
    const abortController = new AbortController();

    let result = window.confirm(
      "Is this table ready to seat new guests? /n This cannot be undone."
    );
    if (result) {
      return deleteSeat(table, abortController.signal).then();
    }
  }

  function refreshTables() {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables);

    return () => abortController.abort();
  }

  function refreshRes() {
    const abortController = new AbortController();
    listReservations({ date }, abortController.signal).then(setReservations);
    return () => abortController.abort();
  }

  return (
    <tr key={table.table_id} data-table-id-status={table.table_id}>
      <td>{table.table_id}</td>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
      <td>{status}</td>
      <td>
      {table.reservation_id && (<button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          data-table-id-finish={table.table_id}
          onClick={
            (event) => {
              event.preventDefault();
              deleteHandler(table).then(refreshTables).then(refreshRes)
            }
          }
        >
          Finish
        </button>)}
      </td>
    </tr>
  );
}
