import { Button, Container, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./components/Loading";
import UserTable from "./components/UserTable";
import { addUser, fetchUsers, selectUsers } from "./features/usersSlice";
import { Title, UserList, UserListHeader, UserListBody } from "./styles";

function App() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const usersStatus = useSelector(state => state.users.status);
  const error = useSelector(state => state.users.error);

  useEffect(() => {
    if (usersStatus === "idle") {
      dispatch(fetchUsers());
    }
  }, [usersStatus, dispatch]);

  if (usersStatus === "loading") return <Loading />;

  if (usersStatus === "failed")
    return (
      <Container maxWidth="lg">
        <h1>{error}</h1>
      </Container>
    );

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
