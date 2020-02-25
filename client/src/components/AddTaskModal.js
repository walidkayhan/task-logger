import React, { useState } from "react";
import { Modal, Button } from "antd";

import AddTaskForm from "./AddTaskForm";

const AddTaskModal = () => {
  const [visible, setVisible] = useState(false);

  const onOK = e => {
    console.log(e);
    setVisible(false);
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
        footer={[
          <Button key="submit" type="primary" onClick={onOK}>
            Add
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
