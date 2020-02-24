import React from "react";
import { Typography, Table, Button, Avatar } from "antd";

const { Title } = Typography;

const Users = () => {
  const columns = [
    {
      title: "",
      dataIndex: "icon",
      key: "icon",
      render: data => (
        <Avatar style={{ backgroundColor: data.favoriteColor }}>
          {data.firstLetter}
        </Avatar>
      )
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: text => <a href={`mailto:${text}`}>{text}</a>
    },
    {
      title: "Created",
      dataIndex: "created",
      key: "created"
    }
  ];

  const data = [
    {
      key: "1",
      icon: {
        firstLetter: "J",
        favoriteColor: "#f56a00"
      },
      name: "John Appleseed",
      position: "Web Developer",
      email: "john@appleseed.ca",
      created: "2020-02-23"
    },
    {
      key: "2",
      icon: {
        firstLetter: "M",
        favoriteColor: "#faad14"
      },
      name: "Mike Wazowski",
      position: "Marketing Manager",
      email: "mike@monstersinc.ca",
      created: "2020-01-03"
    },
    {
      key: "3",
      icon: {
        firstLetter: "P",
        favoriteColor: "#7cb305"
      },
      name: "Pamela Smith",
      position: "Senior Accountant",
      email: "pamela@example.ca",
      created: "2019-06-14"
    }
  ];

  return (
    <div>
      <Title className="text-center">Users</Title>

      <Button
        type="primary"
        size={"large"}
        icon="user-add"
        style={{ marginBottom: "1rem" }}
      >
        Add New User
      </Button>

      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Users;
