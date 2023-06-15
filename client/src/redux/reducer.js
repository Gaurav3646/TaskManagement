import {
  GET_TASKS_SUCCESS,
  UPDATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  SELECT_TASK,
  SET_LOADING,
  SET_ERROR,
  ADD_TASK_SUCCESS,
} from "./actions";
const initialState = {
  tasks: [],
  selectedTask: null,
  isLoading: false,
  error: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK_SUCCESS:
      return { ...state, tasks: [action.task, ...state.tasks] };
    case GET_TASKS_SUCCESS:
      return { ...state, tasks: action.tasks };
    case UPDATE_TASK_SUCCESS:
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.task.id ? action.task : task
      );
      return { ...state, tasks: updatedTasks };
    case DELETE_TASK_SUCCESS:
      const remainingTasks = state.tasks.filter(
        (task) => task.id !== action.taskId
      );
      return { ...state, tasks: remainingTasks };
    case SELECT_TASK:
      return { ...state, selectedTask: action.task };
    case SET_LOADING:
      return { ...state, isLoading: action.isLoading };
    case SET_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default reducer;
