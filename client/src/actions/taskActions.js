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

import { message, notification } from 'antd';

import axios from 'axios';

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

const errorOutput = (error) => {
    if(error.response.status === 500){
        notification[error]({
            message: error.response.data.message,
            description:
              'There seems to be a problem with the server right now, please try again later',
          });
    } else {
        notification[error]({
            message: 'Error',
            description:
              'There seems to be a problem right now, please try again later',
          });
    }
}

export const addTask = async (task) => dispatch => {

    try {
        const res = await axios.post('/api/tasks', task, config);

        if(res.data.success){
            dispatch({type: ADD_TASK, payload: task});
            message.success(res.data.message);
        } else {
            message.error(res.data.message);
        }
        
    } catch (error) {
        errorOutput(error);
    }
}