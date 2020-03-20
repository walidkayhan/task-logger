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

export const openModal = (type, id) => dispatch => {
  dispatch({ type: OPEN_TASK_MODAL, payload: type });
  id && dispatch({ type: SELECT_CURRENT_TASK, payload: id });
};

export const closeModal = () => dispatch => {
  dispatch({ type: CLOSE_TASK_MODAL });
};

export const getTasks = () => async dispatch => {
  try {
    dispatch({ type: SET_TASK_LOADING });

    const res = await axios.get("/api/tasks", null, config);

    if (res.data.success)
      dispatch({ type: GET_TASKS, payload: res.data.tasks });
  } catch (error) {
    errorOutput(error);
  }
};

export const addTask = task => async dispatch => {
  try {
    dispatch({ type: SET_TASK_LOADING });

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

export const editTask = task => async dispatch => {
  try {
    const res = await axios.put(`/api/tasks/${task._id}`, task, config);

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

export const deleteTasks = tasksList => async dispatch => {
  try {
    dispatch({ type: SET_TASK_LOADING });

    const res = await axios.post("/api/tasks/delete", { tasksList }, config);

    if (res.data.success) {
      dispatch({ type: DELETE_TASKS, payload: tasksList });
      message.success(res.data.message);
    } else {
      message.error(res.data.message);
    }
  } catch (error) {
    errorOutput(error);
  }
};

export const selectTask = id => dispatch => {
  dispatch({ type: SELECT_TASK, payload: id });
};

export const unselectTask = id => dispatch =>
  dispatch({ type: UNSELECT_TASK, payload: id });

export const selectAllTasks = () => dispatch =>
  dispatch({ type: SELECT_ALL_TASKS });

export const unselectAllTasks = () => dispatch =>
  dispatch({ type: UNSELECT_ALL_TASKS });

export const setCurrentTask = task => dispatch => {
  dispatch({ type: SET_CURRENT_TASK, payload: task });
};

export const setErrors = error => dispatch => {
  dispatch({ type: HANDLE_ERRORS, payload: error });
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
