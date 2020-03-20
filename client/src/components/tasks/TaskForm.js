import React, { useEffect } from "react";
import { Form } from "antd";
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
  getUsers,
  showModal,
  type
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    form.resetFields();
  }, [showModal]);

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
    <Form
      form={form}
      initialValues={
        type === "editTask" && {
          title: currentTask.title,
          description: currentTask.description,
          department: currentTask.department,
          user: currentTask.user && currentTask.user.name,
          dates: [
            currentTask.startDate && moment(currentTask.startDate),
            currentTask.endDate && moment(currentTask.endDate)
          ]
        }
      }
    >
      <Item
        name="title"
        validateTrigger={["onBlur", "onChange"]}
        rules={[
          {
            required: true,
            message: "Please enter the task name"
          }
        ]}
      >
        <Input
          placeholder="Task Name"
          id="title"
          onChange={e => onChange(e)}
          value={currentTask.title ? currentTask.title : null}
        />
      </Item>

      <Item
        name="department"
        validateTrigger="onBlur"
        rules={[
          {
            required: true,
            message: "Please select a department"
          }
        ]}
      >
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a Department"
          optionFilterProp="children"
          onChange={value =>
            setCurrentTask({ ...currentTask, department: value })
          }
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          <Option value="Information Technology">Information Technology</Option>
          <Option value="Financial">Financial</Option>
          <Option value="Marketing">Marketing</Option>
          <Option value="Customer Service">Customer Service</Option>
          <Option value="Shipping">Shipping</Option>
          <Option value="Manufacturing">Manufacturing</Option>
        </Select>
      </Item>

      <Item help="This is optional" name="description">
        <TextArea
          placeholder="Task Description"
          allowClear
          id="description"
          onChange={e => onChange(e)}
        />
      </Item>

      <br />

      <Item
        name="user"
        validateTrigger="onBlur"
        rules={[
          {
            required: true,
            message: "Please select a user for this task"
          }
        ]}
      >
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
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
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
      </Item>

      <Item name="dates" help="This is optional">
        <RangePicker
          ranges={{
            Today: [moment(), moment()]
          }}
          onChange={onDateChange}
          format="YYYY-MM-DD"
        />
      </Item>
    </Form>
  );
};

const mapStateToProps = state => ({
  currentTask: state.tasks.currentTask,
  showModal: state.tasks.showModal,
  users: state.users.users,
  loading: state.users.loading,
  type: state.tasks.modalType
});

export default connect(mapStateToProps, {
  setCurrentTask,
  getUsers
})(AddTaskForm);
