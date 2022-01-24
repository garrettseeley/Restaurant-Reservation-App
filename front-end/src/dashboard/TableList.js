import React from "react";
import TableItem from "./TableItem";

export default function TableList({
  tables,
  setTables,
  setReservations,
  date,
}) {
  const listItems = tables.map((table) => (
    <TableItem
      table={table}
      setTables={setTables}
      setReservations={setReservations}
      date={date}
    />
  ));
  return (
    <table className="table mt-3">
      <thead>
        <tr>
          <th>#</th>
          <th>TABLE NAME</th>
          <th>CAPACITY</th>
          <th>STATUS</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{listItems}</tbody>
    </table>
  );
}
