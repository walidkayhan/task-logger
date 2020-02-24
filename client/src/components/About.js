import React from "react";
import { Typography, Icon } from "antd";

const { Title } = Typography;

const About = () => {
  return (
    <div>
      <Title className="text-center">About</Title>

      <h2 className="about-item">
        <Icon type="info-circle" /> This App was Developed By Walid Kayhan,
        Febuary 2020
      </h2>

      <h2 className="about-item">
        <Icon type="github" /> Link to Code on Github{" "}
        <a href="https://github.com/walidkayhan/task-logger">here</a>
      </h2>

      <h2 className="about-item">
        <Icon type="mail" /> Email me if you have any questions or suggestions{" "}
        <a href="mailto:walid.kayhan@hotmail.com">walid.kayhan@hotmail.com</a>
      </h2>
    </div>
  );
};

export default About;
