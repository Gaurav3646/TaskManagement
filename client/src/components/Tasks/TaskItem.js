import classes from "./TaskItem.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../redux/thunks";
import { NavLink } from "react-router-dom";
const TaskItem = (props) => {
  const dispatch = useDispatch();
  console.log(props.children);
  return (
    <li className={classes.task}>
      <div className={classes.taskHeader}>
        <div className={classes.taskTitle}>
          <div>{props.children.title}</div>
          {props.children.completed && (
            <div className={classes.blueTick}>
              <CheckCircleOutlineIcon sx={{ color: "green", fontSize: 20 }} />
            </div>
          )}
        </div>
        <div className={classes.taskActionButtons}>
          <NavLink to={`/update/${props.children.id}`}>
            <button className={classes.taskEditButton}>
              <EditIcon sx={{ fontSize: 20 }} />
            </button>
          </NavLink>
          <button
            onClick={() => dispatch(deleteTask(props.children.id))}
            className={classes.taskDeleteButton}
          >
            <DeleteIcon sx={{ fontSize: 20 }} />
          </button>
        </div>
      </div>
      <div className={classes.taskDescription}>
        {props.children.description}
      </div>
    </li>
  );
};

export default TaskItem;
