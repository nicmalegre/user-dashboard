import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addUser, selectUserById } from "../features/usersSlice";
import { useUpdateUser } from "../hooks/useUpdateUser";
import Loading from "./Loading";
import { FormBody, FormHeader, FormSection, FormInput } from "./styles";

function Form() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();

  const [name, setName] = useState(null);
  const [errorName, setErrorName] = useState("");
  const [email, setEmail] = useState(null);
  const [errorEmail, setErrorEmail] = useState("");
  const [username, setUsername] = useState(null);
  const [city, setCity] = useState(null);

  const { user } = location.state || {};
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setUsername(user.username);
      setCity(user.address.city);
    }
  }, [user]);

  const { handleUpdateUser, isLoading } = useUpdateUser();
  const userSelected = useSelector(state => selectUserById(state, user?.id));

  const handleSubmit = async e => {
    e.preventDefault();

    if (!name) setErrorName("Name is required.");
    if (!email) setErrorEmail("Email is required.");

    const saveUser = {
      name: name,
      username: username,
      email: email,
      address: { city: city },
    };

    if (name && email) {
      if (userSelected) {
        await handleUpdateUser({ id: user.id, ...saveUser });
      } else {
        dispatch(
          addUser({
            id: Math.floor(Math.random() * 100).toString(),
            ...saveUser,
          })
        );
      }

      navigate("/");
    }
  };

  if (isLoading) return <Loading />;

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
            {/* NAME INPUT */}
            <FormInput container maxWidth="xs" textAlign="center">
              <Grid item xs={2} margin={1}>
                <span>Name *</span>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  size="small"
                  value={name}
                  error={errorName}
                  helperText={errorName ?? null}
                  onChange={e => {
                    setName(e.target.value);
                    setErrorName(null);
                  }}
                />
              </Grid>
            </FormInput>

            {/* EMAIL INPUT */}
            <FormInput container maxWidth="xs" textAlign="center">
              <Grid item xs={2} margin={1}>
                <span>Email *</span>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  size="small"
                  value={email}
                  error={errorEmail}
                  helperText={errorEmail ?? null}
                  onChange={e => {
                    setEmail(e.target.value);
                    setErrorEmail(null);
                  }}
                />
              </Grid>
            </FormInput>

            {/* USERNAME INPUT */}
            <FormInput container maxWidth="xs" textAlign="center">
              <Grid item xs={2} margin={1}>
                <span>Username</span>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  size="small"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </Grid>
            </FormInput>

            {/* CITY */}
            <FormInput container maxWidth="xs" textAlign="center">
              <Grid item xs={2} margin={1}>
                <span>City</span>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  size="small"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                />
              </Grid>
            </FormInput>
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
              onClick={handleSubmit}
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
