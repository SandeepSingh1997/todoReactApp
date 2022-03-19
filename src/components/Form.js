import React, { useState } from "react";

export default function Form(props) {
  function handleSubmit(e) {
    e.preventDefault();
    if (name !== "") {
      props.addTask(name);
      setName("");
    }
  }

  function handleChange(e) {
    setName(e.target.value);
  }

  const [name, setName] = useState("");
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        onChange={handleChange}
        autoComplete="off"
        value={name}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}
