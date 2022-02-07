import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ModalHeader, ModalBody, ModalFooter } from "./styles";
import { useDeleteUser } from "../hooks/useDeleteUser";
import Loading from "./Loading";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
};

export default function ModalBase({ open, setOpen, user }) {
  const { handleDeleteUser, isLoading } = useDeleteUser();

  const handleClose = () => setOpen(false);

  if (isLoading) return <Loading />;

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ModalHeader>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <b>Delete</b>
            </Typography>
          </ModalHeader>

          <ModalBody>
            {user && (
              <>
                <Typography component="p"> Name: {user.name}</Typography>
                <Typography component="p"> Email: {user.email}</Typography>
                <Typography component="p">Username: {user.username}</Typography>
                <Typography component="p">City: {user.address.city}</Typography>
              </>
            )}
          </ModalBody>

          <ModalFooter container alignItems="center" justifyContent="right">
            <Button
              variant="contained"
              color="inherit"
              size="large"
              style={{ textTransform: "capitalize", marginRight: 24 }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              size="large"
              style={{ textTransform: "capitalize" }}
              type="submit"
              onClick={() => {
                setOpen(false);
                handleDeleteUser(user.id);
              }}
            >
              Delete
            </Button>
          </ModalFooter>
        </Box>
      </Modal>
    </div>
  );
}
