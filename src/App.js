import { Container, Grid } from "@mui/material";
import React from "react";
import UserTable from "./components/UserTable";

function App() {
  return (
    <Container maxWidth="md">
      <h1 style={{ marginTop: 34, marginBottom: 34 }}>Dashboard</h1>

      <Grid
        style={{
          padding: 1,
          borderRadius: 8,
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        }}
      >
        {/* User list - Header */}
        <Grid padding={4} style={{ borderBottom: "1px solid black" }}>
          <h4>User list</h4>
        </Grid>

        {/* Table */}
        <Grid padding={4}>
          <UserTable />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
