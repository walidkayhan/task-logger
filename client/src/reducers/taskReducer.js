import {
  GET_TASKS,
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASKS,
  SET_CURRENT_TASK,
  SELECT_TASK,
  SELECT_TASKS,
  UNSELECT_TASK,
  UNSELECT_ALL_TASKS,
  CLEAR_CURRENT_TASK,
  OPEN_ADD_TASK_MODAL,
  CLOSE_ADD_TASK_MODAL,
  SET_LOADING,
  HANDLE_ERRORS,
  CLEAR_ERRORS
} from "../store/Types";

const initialState = {
  tasks: [],
  loading: false,
  message: "",
  showModal: false,
  selectedTasks: [],
  currentTask: null,
  errors: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        loading: false
      };

    case ADD_TASK:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        showModal: false,
        loading: false
      };

    case EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        ),
        loading: false
      };

    case DELETE_TASKS:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload.id),
        loading: false
      };

    case SET_CURRENT_TASK:
      return {
        ...state,
        currentTask: action.payload
      };

    case CLEAR_CURRENT_TASK:
      return {
        ...state,
        currentTask: null
      };

    case SELECT_TASK:
      return {
        ...state,
        selectedTasks: [action.payload, ...state.selectedTasks]
      };

    case SELECT_TASKS:
      return {
        ...state,
        selectedTasks: [...action.payload, ...state.selectedTasks]
      };

    case UNSELECT_TASK:
      return {
        ...state,
        selectedTasks: state.selectedTasks.filter(
          task => task.id !== action.payload.id
        )
      };

    case UNSELECT_ALL_TASKS:
      return {
        ...state,
        selectedTask: []
      };

    case OPEN_ADD_TASK_MODAL:
      return {
        ...state,
        showModal: true
      };

    case CLOSE_ADD_TASK_MODAL:
      return {
        ...state,
        showModal: false
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true
      };

    case HANDLE_ERRORS:
      return {
        ...state,
        errors: action.payload,
        loading: false
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        errors: null
      };

    default:
      return {
        ...state
      };
  }
};
