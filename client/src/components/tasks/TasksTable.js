import React, { useState, useEffect } from "react";
import { Table, Avatar } from "antd";

import { connect } from "react-redux";

import { getTasks } from "../../actions/taskActions";

import moment from "moment";

const { Column } = Table;

const TasksTable = ({ getTasks, tasks, loading }) => {
  const [data, setData] = useState([]);

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
          endDate: task.endDate
        };
      })
    );
  }, [tasks]);

  const [selectedRows, setSelectedRows] = useState([]);

  const onSelectChange = selectedRowKeys => setSelectedRows(selectedRowKeys);
  const rowSelection = {
    selectedRows,
    onChange: onSelectChange
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
    </Table>
  );
};

const mapStateToProps = state => ({
  tasks: state.tasks.tasks,
  loading: state.tasks.loading
});

export default connect(mapStateToProps, { getTasks })(TasksTable);
