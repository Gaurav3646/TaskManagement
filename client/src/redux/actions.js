// Actions
export const ADD_TASK_SUCCESS = "ADD_TASK_SUCCESS";
export const GET_TASKS_SUCCESS = "GET_TASKS_SUCCESS";
export const UPDATE_TASK_SUCCESS = "UPDATE_TASK_SUCCESS";
export const DELETE_TASK_SUCCESS = "DELETE_TASK_SUCCESS";
export const SELECT_TASK = "SELECT_TASK";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";

// Action creators
export const addTaskSuccess = (task) => ({
  type: ADD_TASK_SUCCESS,
  task,
});
export const getTasksSuccess = (tasks) => ({
  type: GET_TASKS_SUCCESS,
  tasks,
});

export const updateTaskSuccess = (task) => ({
  type: UPDATE_TASK_SUCCESS,
  task,
});

export const deleteTaskSuccess = (taskId) => ({
  type: DELETE_TASK_SUCCESS,
  taskId,
});

export const selectTask = (task) => ({
  type: SELECT_TASK,
  task,
});

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  isLoading,
});

export const setError = (error) => ({
  type: SET_ERROR,
  error,
});
