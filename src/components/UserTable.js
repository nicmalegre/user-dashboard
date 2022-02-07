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
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalBase from "./Modal";
import { useDispatch } from "react-redux";
import { sortUsers } from "../features/usersSlice";

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
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [sort, setSort] = useState(true);

  const handleDelete = user => {
    setUserToDelete(user);
    setOpenModal(true);
  };

  useEffect(() => {
    dispatch(sortUsers({ sort }));
  }, [dispatch, sort]);

  return (
    <>
      <ModalBase open={openModal} setOpen={setOpenModal} user={userToDelete} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Id</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell
                align="center"
                style={{ cursor: "pointer" }}
                onClick={() => setSort(value => !value)}
              >
                Username ↑↓
              </StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">City</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 &&
              users.map(user => (
                <TableRow key={user.name}>
                  <StyledTableCell component="th" scope="row" align="center">
                    {user.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">{user.name}</StyledTableCell>
                  <StyledTableCell align="center">
                    {user.username ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">{user.email}</StyledTableCell>
                  <StyledTableCell align="center">
                    {user.address?.city ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="contained"
                      color="warning"
                      style={{ textTransform: "lowercase" }}
                      onClick={() => navigate("/form", { state: { user } })}
                    >
                      Edit
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="contained"
                      color="error"
                      style={{ textTransform: "lowercase" }}
                      onClick={() => handleDelete(user)}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default UserTable;
