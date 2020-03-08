import {
  GET_USERS,
  ADD_USERS,
  EDIT_USER,
  DELETE_USERS,
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER,
  SELECT_USER,
  UNSELECT_USER,
  SELECT_USERS,
  UNSELECT_ALL_USERS,
  OPEN_ADD_USER_MODAL,
  CLOSE_ADD_USER_MODAL,
  HANDLE_ERRORS,
  SET_LOADING
} from "../store/Types";

import { message, notification } from "antd";

import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

const errorOutput = (error, dispatch) => {
  dispatch({ type: HANDLE_ERRORS });

  if (error.response.status === 500) {
    notification[error]({
      message: error.response.data.message,
      description:
        "There seems to be a problem with the server right now, please try again later"
    });
  } else {
    notification["error"]({
      message: "Error",
      description:
        "There seems to be a problem right now, please try again later"
    });
  }
};

export const getUsers = () => async dispatch => {
  try {
    dispatch({ type: SET_LOADING });

    const res = await axios.get("/api/users", null, config);

    dispatch({ type: GET_USERS, payload: res.data.users });
  } catch (error) {
    errorOutput(error, dispatch);
  }
};
