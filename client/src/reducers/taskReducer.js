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
  taskLoading: false,
  message: "",
  showModal: false,
  selectedTasks: [],
  currentTask: {
    title: "",
    department: "",
    description: "",
    user: null,
    startDate: null,
    endDate: null
  },
  errors: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        taskLoading: false
      };

    case ADD_TASK:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        currentTask: {
          title: "",
          department: "",
          description: "",
          user: null,
          startDate: null,
          endDate: null
        },
        showModal: false,
        taskLoading: false
      };

    case EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task._id === action.payload._id ? action.payload : task
        ),
        currentTask: {
          title: "",
          department: "",
          description: "",
          user: null,
          startDate: null,
          endDate: null
        },
        showModal: false,
        taskLoading: false
      };

    case DELETE_TASKS:
      return {
        ...state,
        tasks: state.tasks.filter(
          task => !action.payload.some(deletedTask => task._id === deletedTask)
        ),
        selectedTasks: [],
        taskLoading: false
      };

    case SET_CURRENT_TASK:
      return {
        ...state,
        currentTask: { ...state.currentTask, ...action.payload }
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
        taskLoading: true
      };

    case HANDLE_ERRORS:
      return {
        ...state,
        //errors: action.payload,
        taskLoading: false
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
