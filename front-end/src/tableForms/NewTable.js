import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TableForm from "./TableForm";
import { postTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function NewTable() {
  const history = useHistory();

  //sets the initial state
  const initialState = {
    table_name: "",
    capacity: "",
  };

  const [table, setTable] = useState({ ...initialState });
  const [tableErrors, setTableErrors] = useState(null);

  async function submitHandler(event) {
    event.preventDefault();
    try {
      await postTable({
        ...table,
        capacity: Number(table.capacity),
      });
    } catch (error) {
      setTableErrors(error.message.split("."));
      return;
    }
    setTable({ ...initialState });
    history.push(`/dashboard`);
  }

  return (
    <>
      <ErrorAlert error={tableErrors} />
      <TableForm
        table={table}
        setTable={setTable}
        submitHandler={submitHandler}
      />
    </>
  );
}
