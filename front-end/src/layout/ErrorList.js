import React from "react";
import ErrorAlert from "./ErrorAlert";

//

export default function ErrorList({ error }) {
  const errorMessages = error?.message.split(".");
  const errorItems = errorMessages?.map((errMessage) => (
    <ErrorAlert error={errMessage} />
  ));
  return (
    error && (
      <div className="alert alert-danger mt-2">
        <ul>{errorItems}</ul>
      </div>
    )
  );
}
