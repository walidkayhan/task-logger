import React, { useState } from "react";
import { Input, Select, DatePicker } from "antd";

const { Option } = Select;
const { TextArea } = Input;

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

  const disabledStartDate = startValue => {
    if (!startValue || !datePicker.endValue) {
      return false;
    }
    return startValue.valueOf() > datePicker.endValue.valueOf();
  };

  const disabledEndDate = endValue => {
    if (!endValue || !datePicker.startValue) {
      return false;
    }
    return endValue.valueOf() <= datePicker.startValue.valueOf();
  };

  const onCalendarChange = (field, value) => {
    setDatePicker({ ...datePicker, [field]: value });
  };

  const onStartChange = value => {
    onCalendarChange("startValue", value);
  };

  const onEndChange = value => {
    onCalendarChange("endValue", value);
  };

  const handleStartOpenChange = open => {
    if (!open) {
      setDatePicker({ ...datePicker, endOpen: true });
    }
  };

  const handleEndOpenChange = open => {
    setDatePicker({ ...datePicker, endOpen: open });
  };

  const [datePicker, setDatePicker] = useState({
    startValue: null,
    endValue: null,
    endOpen: false
  });

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

      <br />
      <br />

      <DatePicker
        disabledDate={disabledStartDate}
        format="YYYY-MM-DD"
        value={datePicker.startValue}
        placeholder="Start Date"
        onChange={onStartChange}
        onOpenChange={handleStartOpenChange}
      />
      <DatePicker
        disabledDate={disabledEndDate}
        showTime
        format="YYYY-MM-DD"
        value={datePicker.endValue}
        placeholder="End Date"
        onChange={onEndChange}
        open={datePicker.endOpen}
        onOpenChange={handleEndOpenChange}
      />
    </div>
  );
};

export default AddTaskForm;
