import React from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Menu mode="horizontal" theme="dark">
        <Menu.Item disabled>T Logger</Menu.Item>

        <Menu.Item key="tasks">
          <Link to="/">
            <Icon type="profile" />
            Tasks
          </Link>
        </Menu.Item>

        <Menu.Item key="users">
          <Link to="/users">
            <Icon type="team" />
            Users
          </Link>
        </Menu.Item>

        <Menu.Item key="about">
          <Link to="/about">
            <Icon type="info-circle" />
            About
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Header;
