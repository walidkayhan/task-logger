import React from "react";
import moment from "moment";
import { Input, Select, DatePicker } from "antd";

const { Option } = Select;
const { TextArea } = Input;
const { MonthPicker, RangePicker } = DatePicker;

const AddTaskForm = () => {
  function onChange(value) {
    console.log(`selected ${value}`);
  }

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val) {
    console.log("search:", val);
  }

  return (
    <div>
      <Input placeholder="Task Name" />
      <br />
      <br />
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a Department"
        optionFilterProp="children"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value="InformationTechnology">Information Technology</Option>
        <Option value="Financial">Financial</Option>
        <Option value="Marketing">Marketing</Option>
        <Option value="CustomerService">Customer Service</Option>
        <Option value="Shipping">Shipping</Option>
        <Option value="Manufacturing">Manufacturing</Option>
      </Select>

      <br />
      <br />

      <TextArea placeholder="Task Description" allowClear onChange={onChange} />

      <br />
      <br />

      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a User"
        optionFilterProp="children"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value="johnAppleseed">John Appleseed</Option>
        <Option value="mikeWazowski">Mike Wazowski</Option>
        <Option value="pamelaSmith">Pamela Smith</Option>
      </Select>

      {/* <DatePicker
        disabledDate={this.disabledStartDate}
        showTime
        format="YYYY-MM-DD"
        value={startValue}
        placeholder="Start"
        onChange={this.onStartChange}
        onOpenChange={this.handleStartOpenChange}
      />
      <DatePicker
        disabledDate={this.disabledEndDate}
        showTime
        format="YYYY-MM-DD"
        value={endValue}
        placeholder="End"
        onChange={this.onEndChange}
        open={endOpen}
        onOpenChange={this.handleEndOpenChange}
      /> */}
    </div>
  );
};

export default AddTaskForm;
