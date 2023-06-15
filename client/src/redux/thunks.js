import {
  getTasksSuccess,
  setError,
  setLoading,
  updateTaskSuccess,
  deleteTaskSuccess,
  addTaskSuccess,
} from "./actions";
import axios from "axios";

export const addTask = (task, navigate) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post(
      "https://task-manager-wxtk.onrender.com/api/v1/tasks",
      task
    );
    const newtask = response.data.task;
    console.log(newtask);
    dispatch(
      addTaskSuccess({
        id: newtask._id,
        title: newtask.name,
        description: newtask.description,
        completed: newtask.completed,
      })
    );
    navigate("/");
  } catch (error) {
    // console.log(error);
    dispatch(setError(error.response.data.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const getTasks = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(
        "https://task-manager-wxtk.onrender.com/api/v1/tasks"
      );
      const { tasks } = await response.data;

      const loadedTasks = [];
      for (const taskKey in tasks) {
        loadedTasks.push({
          id: tasks[taskKey]._id,
          title: tasks[taskKey].name,
          description: tasks[taskKey].description,
          completed: tasks[taskKey].completed,
        });
      }
      dispatch(getTasksSuccess(loadedTasks));
    } catch (error) {
      dispatch(setError(error.response.data.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const updateTask = (taskId, updates, navigate) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.patch(
        `https://task-manager-wxtk.onrender.com/api/v1/tasks/${taskId}`,
        updates
      );
      dispatch(updateTaskSuccess(response.data));
      navigate("/");
    } catch (error) {
      dispatch(setError(error.response.data.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const deleteTask = (taskId) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      await axios.delete(
        `https://task-manager-wxtk.onrender.com/api/v1/tasks/${taskId}`
      );
      dispatch(deleteTaskSuccess(taskId));
    } catch (error) {
      dispatch(setError(error.response.data.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};
