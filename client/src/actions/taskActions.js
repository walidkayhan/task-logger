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

import { message } from 'antd';

import axios from 'axios';

const config = {
    headers: {
        'Content-Type': 'application/json'
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
        if(error.response.status === 500){

        } else {

        }
    }
}