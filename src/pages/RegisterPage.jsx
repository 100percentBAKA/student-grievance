import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import useMutateRegister from "../queries/useMutateRegister";
import useMutateRegisterFaculty from "../queries/useMutateRegisterFaculty";

//* MUI components imports
import { useNavigate } from "react-router-dom";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import ModalWindowLoader from "../components/ui/ModalWindowLoader";

// Register schema
const SIGNUP_SCHEMA = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .matches(
      /^1rn(19|20|21|22|23)(cs|ai|ds|ec)([0-1][0-9][0-9]|200|400|401|402|403|404|405)\.\w+@\w+\.\w+$/,
      "Code must follow the specified pattern"
    )
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  role: yup.string().required("User role is required"),
});

const RegisterPage = () => {
  const mutation = useMutateRegister();
  const mutationFaculty = useMutateRegisterFaculty();

  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
    validationSchema: SIGNUP_SCHEMA,
    onSubmit: async (values) => {
      try {
        const updatedValues = {
          usn: formik.values.email.substring(0, 10).toUpperCase(),
          user: {
            username: formik.values.email,
            password: formik.values.password,
            firstname: formik.values.firstName,
            lastname: formik.values.lastName,
          },
        };
        setModal(true);
        console.log(updatedValues);

        let response;
        // add student / faculty
        if (formik.values.role !== "STUDENT") {
          response = await mutationFaculty.mutateAsync(updatedValues);
        } else {
          response = await mutation.mutateAsync(updatedValues);
        }

        console.log(response);
        navigate("/auth/login");
      } catch (err) {
        console.error(err);
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
          alignItems: "center",
          height: "100%",
        }}
      >
        <Container component="main">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 2,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlined />
            </Avatar>
            <Typography variant="h5" component="h1">
              Sign up
            </Typography>

            <Box component="form" noValidate sx={{ marginBottom: 3 }}>
              <Grid container spacing={1} sx={{ marginTop: 1.5 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoFocus
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </Grid>

                {/* <Grid item xs={12}>
                  <TextField
                    autoFocus
                    type="password"
                    required
                    label="Confirm Password"
                    fullWidth
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.confirmPassword &&
                      Boolean(formik.errors.confirmPassword)
                    }
                    helperText={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                  />
                </Grid> */}

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="role-select-label">Role</InputLabel>
                    <Select
                      labelId="role-select-label"
                      id="role"
                      name="role"
                      value={formik.values.role}
                      label="Role"
                      onChange={formik.handleChange}
                      error={formik.touched.role && Boolean(formik.errors.role)}
                    >
                      <MenuItem value="STUDENT">Student</MenuItem>
                      <MenuItem value="FACULTY">Faculty</MenuItem>
                    </Select>
                    {formik.touched.role && formik.errors.role && (
                      <FormHelperText error>
                        {formik.errors.role}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Remember Me"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={formik.handleSubmit}
                  >
                    SIGN UP
                  </Button>
                </Grid>

                <Grid container justifyContent="flex-end" sx={{ marginTop: 2 }}>
                  <Grid item>
                    <Link href="/auth/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ marginBottom: 1 }}
            >
              Copyright ©{" "}
              <Link href="#" color="inherit">
                RNSIT
              </Link>{" "}
              {new Date().getFullYear()}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* loading modal */}
      <ModalWindowLoader modal={modal} setModal={setModal} />
    </>
  );
};

export default RegisterPage;
