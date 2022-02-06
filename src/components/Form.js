import { Button, Container, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormBody, FormHeader, FormSection } from "./styles";

function Form() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);

  let navigate = useNavigate();

  return (
    <FormSection>
      {/* User list - Header */}
      <FormHeader container alignItems="center">
        <Grid item xs={8}>
          <h3>Form</h3>
        </Grid>
      </FormHeader>

      {/* User list - Body */}
      <FormBody>
        <form>
          <Grid container maxWidth="xs" alignItems="center" textAlign="center">
            <Grid item xs={2} textAlign="right" margin={1}>
              <span>Name</span>
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                size="small"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Grid>

            <Grid item xs={2} textAlign="right" margin={1}>
              <span>Email</span>
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                size="small"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
          </Grid>

          <Grid
            container
            alignItems="center"
            justifyContent="right"
            style={{ marginTop: 34 }}
          >
            <Button
              variant="outlined"
              color="error"
              size="large"
              style={{ textTransform: "capitalize", marginRight: 24 }}
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="success"
              size="large"
              style={{ textTransform: "capitalize" }}
              type="submit"
              // onClick={addNewUser}
            >
              Submit
            </Button>
          </Grid>
        </form>
      </FormBody>
    </FormSection>
  );
}

export default Form;
