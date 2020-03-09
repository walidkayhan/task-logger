import React, { useEffect } from "react";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Select, DatePicker } from "antd";
import moment from "moment";

import { connect } from "react-redux";

import { setCurrentTask } from "../../actions/taskActions";
import { getUsers } from "../../actions/userActions";

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Item } = Form;

const AddTaskForm = ({
  currentTask,
  users,
  loading,
  setCurrentTask,
  getUsers
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    getUsers();

    return () => {
      //
    };
  }, []);

  const onChange = e => {
    setCurrentTask({ [e.target.id]: e.target.value });
  };

  const onDateChange = (dates, dateStrings) => {
    setCurrentTask({
      ...currentTask,
      startDate: dateStrings[0],
      endDate: dateStrings[1]
    });
  };

  return (
    <Form form={form} name="register" scrollToFirstError>
      <Item
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!"
          },
          {
            required: true,
            message: "Please input your E-mail!"
          }
        ]}
      >
        <Input placeholder="Task Name" id="title" onChange={e => onChange(e)} />
      </Item>

      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a Department"
        optionFilterProp="children"
        onChange={value =>
          setCurrentTask({ ...currentTask, department: value })
        }
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value="Information Technology">Information Technology</Option>
        <Option value="Financial">Financial</Option>
        <Option value="Marketing">Marketing</Option>
        <Option value="Customer Service">Customer Service</Option>
        <Option value="Shipping">Shipping</Option>
        <Option value="Manufacturing">Manufacturing</Option>
      </Select>

      <br />
      <br />

      <TextArea
        placeholder="Task Description"
        allowClear
        id="description"
        onChange={e => onChange(e)}
        value={currentTask.description}
      />

      <br />
      <br />

      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a User"
        optionFilterProp="children"
        id="user"
        onChange={value =>
          setCurrentTask({ ...currentTask, user: JSON.parse(value) })
        }
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        loading={loading}
      >
        {users.map(user => (
          <Option
            key={user._id}
            value={JSON.stringify({
              name: `${user.firstName} ${user.lastName}`,
              _id: user._id,
              favoriteColor: user.favoriteColor
            })}
          >{`${user.firstName} ${user.lastName}`}</Option>
        ))}
      </Select>

      <br />
      <br />

      <RangePicker
        ranges={{
          Today: [moment(), moment()]
        }}
        onChange={onDateChange}
        format="YYYY-MM-DD"
      />
    </Form>
  );
};

const mapStateToProps = state => ({
  currentTask: state.tasks.currentTask,
  users: state.users.users,
  loading: state.users.loading
});

export default connect(mapStateToProps, { setCurrentTask, getUsers })(
  AddTaskForm
);
