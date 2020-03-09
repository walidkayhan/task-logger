import React from "react";
import { InfoCircleOutlined, ProfileOutlined, TeamOutlined } from '@ant-design/icons';
import { Menu } from "antd";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Menu mode="horizontal" theme="dark">
        <Menu.Item disabled>T Logger</Menu.Item>

        <Menu.Item key="tasks">
          <Link to="/">
            <ProfileOutlined />
            Tasks
          </Link>
        </Menu.Item>

        <Menu.Item key="users">
          <Link to="/users">
            <TeamOutlined />
            Users
          </Link>
        </Menu.Item>

        <Menu.Item key="about">
          <Link to="/about">
            <InfoCircleOutlined />
            About
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Header;
