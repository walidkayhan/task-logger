import React from "react";
import { Typography, Button } from "antd";

import UsersTable from "./UsersTable";

const { Title } = Typography;

const Users = () => {
  return (
    <div>
      <Title className="text-center">Users</Title>

      <Button
        type="primary"
        size={"large"}
        icon="user-add"
        style={{ marginBottom: "1rem" }}
      >
        Add New User
      </Button>

      <UsersTable />
    </div>
  );
};

export default Users;
