import React from "react";
import { UserAddOutlined } from '@ant-design/icons';
import { Typography, Button } from "antd";

import UsersTable from "../users/UsersTable";
import AddUserModal from "../users/AddUserModal";

const { Title } = Typography;

const Users = () => {
  return (
    <div>
      <Title className="text-center">Users</Title>

      <Button
        type="primary"
        size={"large"}
        icon={<UserAddOutlined />}
        style={{ marginBottom: "1rem" }}
      >
        Add New User
      </Button>

      <UsersTable />

      <AddUserModal />
    </div>
  );
};

export default Users;
