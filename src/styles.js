import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Title = styled("h1")(() => ({
  margin: "32px 0px 32px 0px",
}));

export const UserList = styled(Grid)(() => ({
  borderRadius: 8,
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
}));

export const UserListHeader = styled(Grid)(() => ({
  padding: 32,
  borderBottom: "1px solid rgba(0, 0, 0, 0.24)",
}));

export const UserListBody = styled(Grid)(() => ({
  padding: 32,
}));
