import {
  GET_TASKS,
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASKS,
  SET_CURRENT_TASK,
  SELECT_CURRENT_TASK,
  SELECT_TASK,
  SELECT_ALL_TASKS,
  UNSELECT_TASK,
  UNSELECT_ALL_TASKS,
  CLEAR_CURRENT_TASK,
  OPEN_TASK_MODAL,
  CLOSE_TASK_MODAL,
  SET_TASK_LOADING,
  HANDLE_ERRORS,
  CLEAR_ERRORS
} from "../store/Types";

const initialState = {
  tasks: [],
  taskLoading: false,
  message: "",
  showModal: false,
  modalType: "",
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

    case SELECT_CURRENT_TASK:
      return {
        ...state,
        currentTask: state.tasks.find(task => task._id === action.payload)
      };

    case CLEAR_CURRENT_TASK:
      return {
        ...state,
        currentTask: null
      };

    case SELECT_TASK:
      return {
        ...state,
        selectedTasks: action.payload
      };

    case SELECT_ALL_TASKS:
      return {
        ...state,
        selectedTasks: state.tasks.map(task => task._id)
      };

    case UNSELECT_TASK:
      return {
        ...state,
        selectedTasks: state.selectedTasks.filter(
          task => task._id !== action.payload._id
        )
      };

    case UNSELECT_ALL_TASKS:
      return {
        ...state,
        selectedTasks: []
      };

    case OPEN_TASK_MODAL:
      return {
        ...state,
        showModal: true,
        modalType: action.payload
      };

    case CLOSE_TASK_MODAL:
      return {
        ...state,
        showModal: false,
        modalType: "",
        currentTask: {
          title: "",
          department: "",
          description: "",
          user: null,
          startDate: null,
          endDate: null
        }
      };

    case SET_TASK_LOADING:
      return {
        ...state,
        taskLoading: true
      };

    case HANDLE_ERRORS:
      return {
        ...state,
        errors: action.payload,
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
