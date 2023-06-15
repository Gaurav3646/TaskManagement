import { useRef } from "react";

import classes from "./TaskForm.module.css";

const TaskForm = (props) => {
  const taskTitleInputRef = useRef();
  const taskDescriptionInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredTitleValue = taskTitleInputRef.current.value;
    const enteredDescriptionValue = taskDescriptionInputRef.current.value;
    if (enteredTitleValue.trim().length === 0) {
      return taskTitleInputRef.current.focus();
    }
    if (enteredDescriptionValue.trim().length === 0) {
      return taskDescriptionInputRef.current.focus();
    }

    console.log(enteredDescriptionValue, enteredTitleValue);
    props.onEnterTask(enteredTitleValue, enteredDescriptionValue);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <label>Title</label>
      <input type="text" ref={taskTitleInputRef} placeholder="Title" />
      <label>Description</label>
      <textarea ref={taskDescriptionInputRef} placeholder="Description" />
      <button>{props.loading ? "Sending..." : "Add Task"}</button>
    </form>
  );
};

export default TaskForm;
