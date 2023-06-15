import Section from "../UI/Section";

import classes from "./Update.module.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addTask, updateTask } from "../../redux/thunks";
import { green } from "@mui/material/colors";
const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const taskTitleInputRef = useRef();
  const taskDescriptionInputRef = useRef();
  const checkboxRef = useRef(null);
  const dispatch = useDispatch();
  const loadedTasks = useSelector((state) => state.tasks);
  const isLoading = useSelector((state) => state.isLoading);
  const foundTask = loadedTasks.find((task) => task.id === id);

  const error = useSelector((state) => state.error);
  if (!foundTask) {
    return (
      <Section>
        <div className={classes.container}>No task found.</div>
      </Section>
    );
  }
  const enterTaskHandler = async (
    enteredTitleValue,
    enteredDescriptionValue,
    isChecked
  ) => {
    dispatch(
      updateTask(
        {
          name: enteredTitleValue,
          description: enteredDescriptionValue,
          completed: isChecked,
        },
        navigate
      )
    );
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredTitleValue = taskTitleInputRef.current.value;
    const enteredDescriptionValue = taskDescriptionInputRef.current.value;
    const isChecked = checkboxRef.current.checked;
    if (enteredTitleValue.trim().length === 0) {
      return taskTitleInputRef.current.focus();
    }
    if (enteredDescriptionValue.trim().length === 0) {
      return taskDescriptionInputRef.current.focus();
    }
    console.log(enteredDescriptionValue, enteredTitleValue);
    enterTaskHandler(enteredTitleValue, enteredDescriptionValue, isChecked);
  };

  return (
    <Section>
      <form className={classes.form} onSubmit={submitHandler}>
        <label>Title</label>
        <input type="text" value={foundTask.title} ref={taskTitleInputRef} />
        <label>Description</label>
        <textarea value={foundTask.description} ref={taskDescriptionInputRef} />
        <label>
          <input
            type="checkbox"
            color={green}
            defaultChecked={foundTask.completed}
            ref={checkboxRef}
          />
          Completed
        </label>

        <button>{isLoading ? "Updating..." : "Update Task"}</button>
      </form>
      {error && <p>{error}</p>}
    </Section>
  );
};
export default Update;
