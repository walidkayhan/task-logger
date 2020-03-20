import React from "react";
import { Modal, Button } from "antd";
import { connect } from "react-redux";

import AddTaskForm from "./TaskForm";

import {
  addTask,
  editTask,
  openModal,
  closeModal
} from "../../actions/taskActions";

const TaskModal = ({
  addTask,
  editTask,
  closeModal,
  loading,
  currentTask,
  showModal,
  type
}) => {
  const onOK = () =>
    type === "addTask" ? addTask(currentTask) : editTask(currentTask);

  const onCancel = () => closeModal();

  return (
    <div>
      <Modal
        title={type === "addTask" ? "Add New Task" : "Edit Task"}
        visible={showModal}
        onOk={onOK}
        onCancel={onCancel}
        confirmLoading={loading}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={onOK}
            loading={loading}
            disabled={
              currentTask.title && currentTask.department && currentTask.user
                ? false
                : true
            }
          >
            {type === "addTask" ? "Add Task" : "Edit Task"}
          </Button>,
          <Button key="back" onClick={onCancel}>
            Cancel
          </Button>
        ]}
      >
        <AddTaskForm />
      </Modal>
    </div>
  );
};

const mapStateToProps = state => ({
  loading: state.tasks.loading,
  currentTask: state.tasks.currentTask,
  showModal: state.tasks.showModal,
  errors: state.tasks.errors,
  type: state.tasks.modalType
});

export default connect(mapStateToProps, {
  addTask,
  editTask,
  openModal,
  closeModal
})(TaskModal);
