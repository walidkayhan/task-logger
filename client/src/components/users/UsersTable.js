import React, { useState } from "react";
import { Table, Avatar } from "antd";

const UsersTable = () => {
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
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      sorter: (a, b) => a.position.length - b.position.length
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.length - b.email.length,
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

  const [selectedRows, setSelectedRows] = useState([]);

  const onSelectChange = selectedRowKeys => setSelectedRows(selectedRowKeys);
  const rowSelection = {
    selectedRows,
    onChange: onSelectChange
  };

  return (
    <Table columns={columns} dataSource={data} rowSelection={rowSelection} />
  );
};

export default UsersTable;
