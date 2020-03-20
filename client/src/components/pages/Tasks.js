import React from "react";
import { FileAddOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Typography, Button, Popconfirm, message } from "antd";
import TasksTable from "../tasks/TasksTable";
import TaskModal from "../tasks/TaskModal";

import { connect } from "react-redux";

import { openModal, deleteTasks } from "../../actions/taskActions";

const { Title } = Typography;

const Tasks = ({ openModal, deleteTasks, modalType, selectedTasks }) => {
  const confirm = e => {
    //message.success("Click on Yes");
    deleteTasks(selectedTasks);
  };

  return (
    <div>
      <Title className="text-center">Tasks</Title>
      <Button
        type="primary"
        size="large"
        icon={<FileAddOutlined />}
        style={{ marginBottom: "1rem" }}
        onClick={() => openModal("addTask", null)}
      >
        Add New Task
      </Button>
      <br />
      <Popconfirm
        title={
          selectedTasks.length === 1
            ? "Are you sure you want to delete this task?"
            : `Are you sure you want to delete these ${selectedTasks.length} tasks?`
        }
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
        disabled={selectedTasks.length === 0 ? true : false}
        icon={<CloseCircleOutlined style={{ color: "red" }} />}
      >
        <Button
          type="primary"
          danger
          size="large"
          icon={<CloseCircleOutlined />}
          style={{ marginBottom: "1rem" }}
          disabled={selectedTasks.length === 0 ? true : false}
        >
          Delete Task(s)
        </Button>
      </Popconfirm>

      <TasksTable />
      <TaskModal type={modalType} />
    </div>
  );
};

const mapStateToProps = state => ({
  modalType: state.tasks.modalType,
  selectedTasks: state.tasks.selectedTasks
});

export default connect(mapStateToProps, { openModal, deleteTasks })(Tasks);
