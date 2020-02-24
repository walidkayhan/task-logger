import React from "react";
import { Typography, Button } from "antd";
import TasksTable from "./TasksTable";

const { Title } = Typography;

const Tasks = () => {
  return (
    <div>
      <Title className="text-center">Tasks</Title>

      <Button
        type="primary"
        size={"large"}
        icon="file-add"
        style={{ marginBottom: "1rem" }}
      >
        Add New Task
      </Button>

      <TasksTable />
    </div>
  );
};

export default Tasks;
