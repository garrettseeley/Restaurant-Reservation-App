import React from "react";
import { Link } from "react-router-dom";

export default function TableItem({table}) {
  return (
    <tr data-table-id-status={table.table_id}>
      <td>{table.table_id}</td>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
      <td>{!table.reservation_id ? "Free" : "Occupied"}</td>
      <td>buttons</td>
    </tr>
  )
}