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

import { message, notification } from "antd";

import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

const errorOutput = (error, dispatch) => {
  console.log(error);

  if (error.response.status === 500) {
    notification[error]({
      message: error.response.data.message,
      description:
        "There seems to be a problem with the server right now, please try again later"
    });
  } else {
    dispatch({ type: HANDLE_ERRORS });

    if (error.response.data.errors) {
      const { errors } = error.response.data;

      errors.forEach(error =>
        notification["error"]({
          message: "Error",
          description: error.msg
        })
      );
    } else {
      notification["error"]({
        message: "Error",
        description:
          "There seems to be a problem right now, please try again later"
      });
    }
  }
};

export const openModal = () => dispatch => {
  dispatch({ type: OPEN_ADD_TASK_MODAL });
};

export const closeModal = () => dispatch => {
  dispatch({ type: CLOSE_ADD_TASK_MODAL });
};

export const getTasks = () => async dispatch => {
  try {
    dispatch({ type: SET_LOADING });

    const res = await axios.get("/api/tasks", null, config);

    if (res.data.success)
      dispatch({ type: GET_TASKS, payload: res.data.tasks });
  } catch (error) {
    errorOutput(error);
  }
};

export const addTask = task => async dispatch => {
  try {
    dispatch({ type: SET_LOADING });

    const res = await axios.post("/api/tasks", task, config);

    if (res.data.success) {
      dispatch({ type: ADD_TASK, payload: res.data.task });
      message.success(res.data.message);
    } else {
      message.error(res.data.message);
    }
  } catch (error) {
    errorOutput(error, dispatch);
  }
};

//NOT FINISHED, SOME PROBLEMS IN THIS
export const editTask = task => async dispatch => {
  try {
    const res = await axios.put(`/api/tasks/${task._id}`, config);

    if (res.data.success) {
      dispatch({ type: EDIT_TASK, payload: task });
      message.success(res.data.message);
    } else {
      message.error(res.data.message);
    }
  } catch (error) {
    errorOutput(error);
  }
};

//NOT FINISHED, SOME PROBLEMS IN THIS
export const deleteTask = task => async dispatch => {
  try {
    const res = await axios.delete(`/api/tasks/${task._id}`, config);

    if (res.data.success) {
      dispatch({ type: DELETE_TASKS, payload: task });
      message.success(res.data.message);
    } else {
      message.error(res.data.message);
    }
  } catch (error) {
    errorOutput(error);
  }
};

export const setCurrentTask = task => dispatch => {
  dispatch({ type: SET_CURRENT_TASK, payload: task });
};
