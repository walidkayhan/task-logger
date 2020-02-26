import React, { useState } from "react";
import { Input, Select, DatePicker } from "antd";

const { Option } = Select;
const { TextArea } = Input;

const AddUserForm = () => {
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
      <Input placeholder="Name" />
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

      <Input type="email" placeholder="Email" />

      <br />
      <br />

      <p>Favorite Color:</p>
      <Input
        type="color"
        placeholder="Favorite Color"
        onChange={e => console.log(e.target.value)}
      />
    </div>
  );
};

export default AddUserForm;
