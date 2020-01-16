import React, { useState } from "react";
import NewTaskForm from "./NewTask";
import Task from "./Task";

const List = props => {
  const [tasks, setTasks] = useState(props.taskList);
  const onDeleteHandler = indexOfWhateverINeed => {
    // delete some stuff
    tasks.splice(indexOfWhateverINeed, 1);
    setTasks([...tasks]);
    console.log("Delete this task!", tasks[indexOfWhateverINeed]);
  };
  const onCompletionChange = index => {
    tasks[index].completed = !tasks[index].completed;
    setTasks([...tasks]);
  };
  const submit = newTask => {
    setTasks([newTask, ...tasks]);
  };
  return (
    <div>
      <NewTaskForm submit={submit} />
      {tasks.map((task, index) => (
        <Task
          key={task._id}
          index={index}
          check={onCompletionChange}
          task={task}
          onDelete={onDeleteHandler}
        />
      ))}
    </div>
  );
};

export default List;
