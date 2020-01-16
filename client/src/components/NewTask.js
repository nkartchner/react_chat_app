import React, { useState } from "react";
import faker from "faker";

const NewTaskForm = ({ submit }) => {
  const [newTask, setNewTask] = useState({
    text: "",
    _id: faker.random.uuid(),
    completed: false
  });
  const onChangeHandler = event => {
    setNewTask({
      ...newTask,
      text: event.target.value
    });
  };
  const onSubmit = () => {
    submit(newTask);
    setNewTask({
      _id: faker.random.uuid(),
      completed: false,
      text: ""
    });
  };
  return (
    <p>
      <input type="text" onChange={onChangeHandler} value={newTask.text} />
      <button onClick={onSubmit}>Submit</button>
    </p>
  );
};

export default NewTaskForm;
