import React, { useState, useEffect } from "react";
import { Table, Avatar } from "antd";
import { EditOutlined } from "@ant-design/icons";

import { connect } from "react-redux";

import {
  getTasks,
  openModal,
  selectTask,
  unselectTask,
  selectAllTasks,
  unselectAllTasks
} from "../../actions/taskActions";

import moment from "moment";

const { Column } = Table;

const TasksTable = ({
  getTasks,
  openModal,
  selectTask,
  selectAllTasks,
  unselectAllTasks,
  selectedTasks,
  tasks,
  loading
}) => {
  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    setData(
      tasks.map(task => {
        return {
          key: task._id,
          title: task.title,
          department: task.department,
          description: task.description,
          user: {
            id: task.user._id,
            name: task.user.name,
            favoriteColor: task.user.favoriteColor
              ? task.user.favoriteColor
              : "#00000"
          },
          startDate: task.startDate,
          endDate: task.endDate,
          editTask: task._id
        };
      })
    );
  }, [tasks]);

  const [data, setData] = useState([]);

  const onSelectChange = selected => {
    console.log(selected);
    selected.length > 0 ? selectTask(selected) : selectTask([]);
  };

  const onSelectAll = selected =>
    selected ? selectAllTasks() : unselectAllTasks();

  const rowSelection = {
    selectedTasks,
    onChange: onSelectChange,
    onSelectAll
  };

  return (
    <Table dataSource={data} rowSelection={rowSelection} loading={loading}>
      <Column
        title="Task"
        dataIndex="title"
        key="title"
        sorter={(a, b) => a.title.length - b.title.length}
      />
      <Column title="Department" dataIndex="department" key="department" />
      <Column title="Description" dataIndex="description" key="description" />
      <Column
        title="User"
        dataIndex="user"
        key="user"
        render={(text, data) => (
          <div>
            <Avatar style={{ backgroundColor: data.user.favoriteColor }}>
              {data.user.name.charAt(0)}
            </Avatar>{" "}
            {data.user.name}
          </div>
        )}
      />
      <Column
        title="Start Date"
        dataIndex="startDate"
        key="startDate"
        render={(text, data) =>
          data.startDate ? moment(data.startDate).format("YYYY-MM-DD") : "None"
        }
      />
      <Column
        title="End Date"
        dataIndex="endDate"
        key="endDate"
        render={(text, data) =>
          data.endDate !== null
            ? moment(data.endDate).format("YYYY-MM-DD")
            : "None"
        }
      />
      <Column
        title="Edit"
        dataIndex="editTask"
        key="editTask"
        render={(text, data) => (
          <a href="#!" onClick={() => openModal("editTask", data.key)}>
            <EditOutlined style={{ fontSize: "2rem" }} />
          </a>
        )}
      />
    </Table>
  );
};

const mapStateToProps = state => ({
  tasks: state.tasks.tasks,
  loading: state.tasks.taskLoading,
  selectedTasks: state.tasks.selectedTasks
});

export default connect(mapStateToProps, {
  getTasks,
  openModal,
  selectTask,
  unselectTask,
  selectAllTasks,
  unselectAllTasks
})(TasksTable);
