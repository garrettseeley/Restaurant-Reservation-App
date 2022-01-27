import React from "react";

/**
 * Defines the alert message to render if the specified error is truthy.
 * @param error
 *  an instance of an object with `.message` property as a string, typically an Error instance.
 * @returns {JSX.Element}
 *  a bootstrap danger alert that contains the message string.
 */

function ErrorAlert({ error = [] }) {
  // maps the error messages 
  const errorItems = error?.map((errMessage, index) => (
    <>
      {errMessage && (
        <li key={index}>{errMessage.replace(/[_]/g, " ")}.</li>
      )}
    </>
  ));
  return (
    error && (
      <div className="alert alert-danger mt-2">
        <ul>{errorItems}</ul>
      </div>
    )
  );
}

export default ErrorAlert;
