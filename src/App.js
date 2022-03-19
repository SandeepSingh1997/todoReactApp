import React, { useState } from "react";
import { nanoid } from "nanoid";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

  const FILTER_NAMES = Object.keys(FILTER_MAP);
  const filterList = FILTER_NAMES.map((name) => {
    return (
      <FilterButton
        key={name}
        changeFilter={changeFilter}
        name={name}
        isPressed={name === filter}
      />
    );
  });

  function changeFilter(name) {
    setFilter(name);
  }

  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), completed: false, name: name };
    setTasks([...tasks, newTask]);
  }

  function editTask(id, newName) {
    const editedTasksList = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTasksList);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      console.log(task);
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function onDeleteTask(id) {
    const remainingTasks = tasks.filter((task) => {
      return id !== task.id;
    });

    setTasks(remainingTasks);
  }

  const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => {
    return (
      <Todo
        id={task.id}
        key={task.id}
        name={task.name}
        completed={task.completed}
        toggleTaskCompleted={toggleTaskCompleted}
        onDeleteTask={onDeleteTask}
        editTask={editTask}
      />
    );
  });
  const taskNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${taskNoun} remaining`;
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />

      <div className="filters btn-group stack-exception">{filterList}</div>

      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
