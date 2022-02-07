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

  const [name, setName] = useState("");
  const [errorName, setErrorName] = useState(false);
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");

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

    if (!name) setErrorName(true);
    if (!email) setErrorEmail(true);

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
                  helperText={errorName ? "Name is required." : ""}
                  onChange={e => {
                    setName(e.target.value);
                    setErrorName(false);
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
                  helperText={errorEmail ? "Email is required." : ""}
                  onChange={e => {
                    setEmail(e.target.value);
                    setErrorEmail(false);
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
