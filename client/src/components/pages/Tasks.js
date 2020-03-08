import React from "react";
import { Typography, Button } from "antd";
import TasksTable from "../tasks/TasksTable";
import AddTaskModal from "../tasks/AddTaskModal";

import { connect } from "react-redux";

import { openModal } from "../../actions/taskActions";

const { Title } = Typography;

const Tasks = ({ openModal }) => {
  return (
    <div>
      <Title className="text-center">Tasks</Title>

      <Button
        type="primary"
        size={"large"}
        icon="file-add"
        style={{ marginBottom: "1rem" }}
        onClick={() => openModal()}
      >
        Add New Task
      </Button>

      <TasksTable />

      <AddTaskModal />
    </div>
  );
};

export default connect(null, { openModal })(Tasks);
