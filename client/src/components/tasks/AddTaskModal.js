import React from "react";
import { Modal, Button } from "antd";
import { connect } from "react-redux";

import AddTaskForm from "./AddTaskForm";

import { addTask, openModal, closeModal } from "../../actions/taskActions";

const AddTaskModal = ({
  addTask,
  closeModal,
  loading,
  currentTask,
  showModal
}) => {
  const onOK = () => addTask(currentTask);

  const onCancel = () => closeModal();

  return (
    <div>
      <Modal
        title="Add New Task"
        visible={showModal}
        onOk={onOK}
        onCancel={onCancel}
        confirmLoading={loading}
        footer={[
          <Button key="submit" type="primary" onClick={onOK} loading={loading}>
            Add Task
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
  showModal: state.tasks.showModal
});

export default connect(mapStateToProps, { addTask, openModal, closeModal })(
  AddTaskModal
);
