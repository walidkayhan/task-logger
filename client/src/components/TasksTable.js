import React, { useState } from "react";
import { Table, Avatar } from "antd";

const TasksTable = () => {
  const columns = [
    {
      title: "Task",
      dataIndex: "task",
      key: "task",
      sorter: (a, b) => a.task.length - b.task.length
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      sorter: (a, b) => a.type.length - b.type.length
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: text => (text ? text : "None")
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      sorter: (a, b) => a.user.name.length - b.user.name.length,
      render: user => (
        <div>
          <Avatar style={{ backgroundColor: user.favoriteColor }}>
            {user.name.charAt(0)}
          </Avatar>{" "}
          {user.name}
        </div>
      )
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate"
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate"
    }
  ];

  const data = [
    {
      key: "1",
      task: "Updated UI",
      type: "Information Technology",
      description: "Updated UI of our website to a more modern look",
      user: {
        id: "njqhwudg7sa",
        name: "John Appleseed",
        favoriteColor: "#f56a00"
      },
      startDate: "2020-02-17",
      endDate: "2020-02-24"
    },
    {
      key: "2",
      task: "Collected 2 Account Receivables",
      type: "Financial",
      description: "Collected 2 payments for outstanding invoices",
      user: {
        id: "hjdsuiasgd783",
        name: "Pamela Smith",
        favoriteColor: "#7cb305"
      },
      startDate: "2020-02-23",
      endDate: "2020-02-23"
    },
    {
      key: "3",
      task: "Developed Advertisment Banner Wireframe",
      type: "Marketing",
      description: "",
      user: {
        id: "dnaduasy7321",
        name: "Mike Wazowski",
        favoriteColor: "#faad14"
      },
      startDate: "2020-02-17",
      endDate: "2020-02-24"
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

export default TasksTable;
