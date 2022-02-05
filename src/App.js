import { Container } from "@mui/material";
import React from "react";
import Loading from "./components/Loading";
import UserTable from "./components/UserTable";
import { useFetchUsers } from "./hooks/useFetchUsers";
import { Title, UserList, UserListHeader, UserListBody } from "./styles";

function App() {
  const { users, isLoading } = useFetchUsers();

  if (isLoading) return <Loading />;

  return (
    <Container maxWidth="md">
      {/* Title */}
      <Title>Dashboard</Title>

      <UserList>
        {/* User list - Header */}
        <UserListHeader>
          <h4>User list</h4>
        </UserListHeader>

        {/* User list - Body */}
        <UserListBody>
          <UserTable users={users} />
        </UserListBody>
      </UserList>
    </Container>
  );
}

export default App;
