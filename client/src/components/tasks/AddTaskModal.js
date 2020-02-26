import React, { useState } from "react";
import { Modal, Button } from "antd";

import AddTaskForm from "./AddTaskForm";

const AddTaskModal = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const onOK = e => {
    setLoading(true);

    setTimeout(() => {
      setVisible(false);
      setLoading(false);
    }, 1000);
  };

  const onCancel = e => {
    console.log(e);
    setVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        Open Modal
      </Button>
      <Modal
        title="Add New Task"
        visible={visible}
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

export default AddTaskModal;
