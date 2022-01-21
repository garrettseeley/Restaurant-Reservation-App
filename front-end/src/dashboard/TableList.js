import React from "react";
import TableItem from "./TableItem";

export default function TableList({tables}) {
  const listItems = tables.map((table) => (
    <TableItem table={table} />
  ))
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
      <tbody>
        {listItems}
      </tbody>
    </table>
  )
}