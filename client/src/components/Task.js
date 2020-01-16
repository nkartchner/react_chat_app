import React from "react";

const Task = ({ task, index, check, onDelete }) => {
  return (
    <p className="task">
      <span className="task-text">
        #{index + 1} - {task.text}
      </span>{" "}
      <input
        type="checkbox"
        onChange={() => check(index)}
        checked={task.completed}
      />
      <button onClick={() => onDelete(index)}>Delete</button>
    </p>
  );
};

export default Task;
