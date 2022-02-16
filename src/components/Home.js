import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import UserTable from "./UserTable";
import { fetchUsers, selectUsers } from "../features/usersSlice";
import { UserList, UserListHeader, UserListBody } from "./styles";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const usersStatus = useSelector(state => state.users.status);
  const error = useSelector(state => state.users.error);

  let navigate = useNavigate();

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
    <UserList>
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
            onClick={() => navigate("/form")}
          >
            Add new
          </Button>
        </Grid>
      </UserListHeader>

      <UserListBody>
        {users.length > 0 ? (
          <UserTable users={users} />
        ) : (
          <>
            <Typography fontSize={18} fontWeight={600} textAlign="center">
              There are no users.
            </Typography>
            <Typography textAlign="center">
              If you want to add a new one, please press "Add New" button.
            </Typography>
          </>
        )}
      </UserListBody>
    </UserList>
  );
}

export default Home;
