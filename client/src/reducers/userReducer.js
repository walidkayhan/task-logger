import {
  GET_USERS,
  ADD_USER,
  EDIT_USER,
  DELETE_USERS,
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER,
  SELECT_USER,
  SELECT_USERS,
  UNSELECT_USER,
  UNSELECT_ALL_USERS,
  OPEN_ADD_USER_MODAL,
  CLOSE_ADD_USER_MODAL,
  SET_LOADING,
  HANDLE_ERRORS,
  CLEAR_ERRORS
} from "../store/Types";

const initialState = {
  users: [],
  userLoading: false,
  message: "",
  showModal: false,
  currentUser: null,
  selectedUsers: [],
  errors: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        userLoading: false
      };

    case ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users],
        userLoading: false
      };

    case EDIT_USER:
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.id ? action.payload : user
        ),
        userLoading: false
      };

    case DELETE_USERS:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload.id),
        userLoading: false
      };

    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };

    case CLEAR_CURRENT_USER:
      return {
        ...state,
        currentUser: null
      };

    case SELECT_USER:
      return {
        ...state,
        selectedUsers: [action.payload, ...state.selectedUsers]
      };

    case SELECT_USERS:
      return {
        ...state,
        selectedUsers: [...action.payload, ...state.selectedUsers]
      };

    case UNSELECT_USER:
      return {
        ...state,
        selectedUsers: state.selectedUsers.map(
          user => user.id !== action.payload.id
        )
      };

    case UNSELECT_ALL_USERS:
      return {
        ...state,
        selectedUsers: []
      };

    case OPEN_ADD_USER_MODAL:
      return {
        ...state,
        showModal: true
      };

    case CLOSE_ADD_USER_MODAL:
      return {
        ...state,
        showModal: false
      };

    case SET_LOADING:
      return {
        ...state,
        userLoading: true
      };

    case HANDLE_ERRORS:
      return {
        ...state,
        errors: action.payload,
        userLoading: false
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
