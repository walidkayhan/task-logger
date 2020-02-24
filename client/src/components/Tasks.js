import React from "react";
import { Typography, Table, Button, Icon, Popover } from "antd";

const { Title } = Typography;

const Tasks = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: text => <a>{text}</a>
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address"
    }
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park"
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park"
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park"
    }
  ];

  const content = (
    <div>
      <Button
        type="primary"
        size={"large"}
        icon="file-add"
        style={{ marginBottom: "1rem" }}
      >
        Add New Task
      </Button>
      <br />
      <Button
        type="primary"
        size={"large"}
        icon="user-add"
        style={{ marginBottom: "1rem" }}
      >
        Add New User
      </Button>
    </div>
  );

  return (
    <div>
      <Title className="text-center">Tasks</Title>

      <Popover placement="right" content={content} trigger="click">
        <Button
          type="primary"
          shape="circle"
          size={"large"}
          style={{ marginBottom: "1rem" }}
        >
          <Icon type="plus" />
        </Button>
      </Popover>

      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Tasks;
