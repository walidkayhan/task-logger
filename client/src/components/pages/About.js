import React from "react";
import { GithubOutlined, InfoCircleOutlined, MailOutlined } from '@ant-design/icons';
import { Typography } from "antd";

const { Title } = Typography;

const About = () => {
  return (
    <div>
      <Title className="text-center">About</Title>

      <h2 className="about-item">
        <InfoCircleOutlined /> This App was Developed By Walid Kayhan,
        February 2020 <br /> Note that this app reverts the data back to it's
        original state every 30 minutes
      </h2>

      <h2 className="about-item">
        <GithubOutlined /> Link to Code on Github{" "}
        <a href="https://github.com/walidkayhan/task-logger">here</a>
      </h2>

      <h2 className="about-item">
        <MailOutlined /> Email me if you have any questions or suggestions{" "}
        <a href="mailto:walid.kayhan@hotmail.com">walid.kayhan@hotmail.com</a>
      </h2>
    </div>
  );
};

export default About;
