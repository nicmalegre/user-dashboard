import { styled } from "@mui/material/styles";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.common.black,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function UserTable({ users }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Id</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Username</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">City</StyledTableCell>
            <StyledTableCell align="center">Edit</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length &&
            users.map(user => (
              <TableRow key={user.name}>
                <StyledTableCell component="th" scope="row" align="center">
                  {user.id}
                </StyledTableCell>
                <StyledTableCell align="center">{user.name}</StyledTableCell>
                <StyledTableCell align="center">
                  {user.username}
                </StyledTableCell>
                <StyledTableCell align="center">{user.email}</StyledTableCell>
                <StyledTableCell align="center">
                  {user.address?.city}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    color="warning"
                    style={{ textTransform: "lowercase" }}
                  >
                    Edit
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    color="error"
                    style={{ textTransform: "lowercase" }}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserTable;
