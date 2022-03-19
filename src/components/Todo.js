import React, { useEffect, useRef, useState } from "react";

export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  function toggleIsEditing() {
    setEditing(true);
  }

  function cancelEditing() {
    setEditing(false);
  }

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault(); //imp otherwise the page will refresh again
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          New name for {props.name}
        </label>
        <input
          id={props.id}
          onChange={handleChange}
          className="todo-text"
          type="text"
          value={newName}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          onClick={cancelEditing}
          className="btn todo-cancel"
        >
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div>
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          onChange={() => props.toggleTaskCompleted(props.id)}
          defaultChecked={props.completed}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>

      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => {
            props.editTask(props.id);
          }}
          onClick={toggleIsEditing}
          ref={editButtonRef}
        >
          Edit <span className="visually-hidden">Eat</span>
        </button>

        <button
          type="button"
          onClick={() => {
            props.onDeleteTask(props.id);
          }}
          className="btn btn__danger"
        >
          Delete <span className="visually-hidden">Eat</span>
        </button>
      </div>
    </div>
  );
  useEffect(() => {
    if (isEditing) {
      editFieldRef.current.focus();
    } else {
      editButtonRef.current.focus();
    }
  }, [isEditing]);
  console.log("main render");
  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}
