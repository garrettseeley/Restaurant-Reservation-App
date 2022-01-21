import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TableForm from "./TableForm";
import { postTable } from "../utils/api";
import ErrorList from "../layout/ErrorList";

export default function NewTable() {
  const history = useHistory();

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
      setTableErrors(error);
      return;
    }
    setTable({ ...initialState });
    history.push(`/dashboard`);
  }

  return (
    <>
      <ErrorList error={tableErrors} />
      <TableForm
        table={table}
        setTable={setTable}
        submitHandler={submitHandler}
      />
    </>
  );
}
