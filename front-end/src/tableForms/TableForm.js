import React from "react";
import { useHistory } from "react-router-dom";

export default function TableForm({ setTable, table, submitHandler }) {
  const history = useHistory();

  function changeHandler({ target: {name, value } }) {
    setTable((previousState) => ({
      ...previousState,
      [name]: value,
    }))
  }

  async function cancelHandler(event) {
    event.preventDefault();
    history.goBack();
  }

  return (
    <>
      <form>
        <fieldset>
          <div className="row">
            <h2 className="col">Create Table</h2>
          </div>
          <div className="row">
            <div className="form-group col">
              <label htmlFor="table_name">Table Name</label>
              <div>
                <input 
                  type="text"
                  id="table_name"
                  name="table_name"
                  placeholder="Table Name"
                  requiredvalue={table.table_name}
                  onChange={changeHandler}
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group col">
              <label htmlFor="capacity">Capacity</label>
              <div>
                <input 
                  type="number"
                  id="capacity"
                  name="capacity"
                  placeholder="Capacity of Table"
                  value={table.capacity}
                  onChange={changeHandler}
                  className="form-control"
                  required
                  min="1"
                />
              </div>
            </div>
          </div>
          <button
            type="cancel"
            className="btn btn-secondary mr-2"
            onClick={cancelHandler}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={submitHandler}
          >
            Submit
          </button>
        </fieldset>
      </form>
    </>
  )
}