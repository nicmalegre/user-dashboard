import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Title = styled("h1")(() => ({
  margin: "32px 0px 32px 0px",
}));

export const FormSection = styled(Grid)(() => ({
  borderRadius: 8,
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
}));

export const FormHeader = styled(Grid)(() => ({
  padding: "16px 32px 16px 32px",
  borderBottom: "1px solid rgba(0, 0, 0, 0.24)",
}));

export const FormBody = styled(Grid)(() => ({
  padding: 32,
}));

export const FormInput = styled(Grid)(() => ({
  marginTop: 20,
}));
