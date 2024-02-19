import React, { useState } from "react";

// * MUI Components
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Checkbox,
  Grid,
  FormControlLabel,
  Link,
  Typography,
  TextField,
} from "@mui/material";

//* react router dom imports
import { useNavigate } from "react-router-dom";

// * MUI Icons
import { LockOutlined } from "@mui/icons-material";

//* yup and formik
import { useFormik } from "formik";
import * as yup from "yup";

//* hash loader
import ModalWindowLoader from "../components/ui/ModalWindowLoader";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

//* login schema
const LOGIN_SCHEMA = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage = () => {
  const navigate = useNavigate();

  //? use auth from auth context
  const { login } = useAuth();

  const [modal, setModal] = useState(null);
  const [error, setError] = useState(null);

  //? formik form validation
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: LOGIN_SCHEMA,

    onSubmit: async () => {
      const email = formik.values.email;
      const password = formik.values.password;
      setModal(true);
      try {
        const basicAuthHeader = "Basic " + btoa(email + ":" + password);
        const response = await axios.get(
          `http://localhost:8080/user/login/${email}`,
          {
            headers: {
              Authorization: basicAuthHeader,
              "Content-Type": "application/json",
            },
          }
        );

        //? store the btoa generated token only after successful request
        localStorage.setItem("auth", JSON.stringify(basicAuthHeader));

        const usn = email.substring(0, 10);
        const updatedData = {
          ...response.data,
          email,
          usn,
        };
        localStorage.setItem("userDetails", JSON.stringify(updatedData));

        //? set isAuthenticated to true
        login();
        navigate("/");
      } catch (error) {
        setError(error);
      } finally {
        setModal(false);
      }
    },
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 10,
        }}
      >
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            padding: 2,
            border: "1px solid black",
            borderRadius: "10px",
            marginTop: 8,
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ bgcolor: "secondary.main", margin: 1 }}>
              <LockOutlined />
            </Avatar>
            <Typography variant="h5" component="h1">
              Sign In
            </Typography>

            <Box
              component="form"
              noValidate
              sx={{ marginTop: 3, width: "100%" }}
              onSubmit={formik.onSubmit}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    fullWidth
                    label="Email Address"
                    required
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    fullWidth
                    label="Password"
                    required
                    id="password"
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Remember me"
                  />
                </Grid>
              </Grid>

              <Grid item xs={12} sx={{ marginTop: 3 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={formik.handleSubmit}
                >
                  SIGN UP
                </Button>
              </Grid>

              <Grid
                container
                justifyContent="space-between"
                sx={{ marginTop: 2 }}
              >
                <Grid item>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>

            <Typography variant="body2" sx={{ marginTop: 3 }}>
              Copyright ©{" "}
              <Link href="#" color="inherit">
                RNSIT
              </Link>{" "}
              {new Date().getFullYear()}
            </Typography>
          </Box>
        </Container>

        {/* Modal window with loader */}
        <ModalWindowLoader modal={modal} setModal={setModal} />
      </Box>

      {error ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "red",
            fontWeight: 600,
            fontSize: "18px",
            marginTop: 5,
          }}
        >
          Please check username and password !!
        </Box>
      ) : (
        ""
      )}
    </>
  );
};

export default LoginPage;
