import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { addTask } from "../../redux/thunks";
const NewTask = (props) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.isLoading);
  const error = useSelector((state) => state.error);
  const enterTaskHandler = async (
    enteredTitleValue,
    enteredDescriptionValue
  ) => {
    dispatch(
      addTask(
        {
          name: enteredTitleValue,
          description: enteredDescriptionValue,
        },
        navigate
      )
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};
export default NewTask;
