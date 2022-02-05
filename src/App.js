import { Button, Container, Grid } from "@mui/material";
import React from "react";
import Loading from "./components/Loading";
import UserTable from "./components/UserTable";
import { useFetchUsers } from "./hooks/useFetchUsers";
import { Title, UserList, UserListHeader, UserListBody } from "./styles";

function App() {
  const { users, isLoading } = useFetchUsers();

  if (isLoading) return <Loading />;

  return (
    <Container maxWidth="lg">
      {/* Title */}
      <Title>Dashboard</Title>

      <UserList>
        {/* User list - Header */}
        <UserListHeader container alignItems="center">
          <Grid item xs={8}>
            <h3>User list</h3>
          </Grid>

          <Grid item xs={4} textAlign="end">
            <Button
              variant="contained"
              color="primary"
              size="large"
              style={{ textTransform: "capitalize" }}
            >
              Add new
            </Button>
          </Grid>
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
