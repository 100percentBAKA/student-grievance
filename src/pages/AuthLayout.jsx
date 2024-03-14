import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import swiper1 from "../assets/rns-audi.png";

// * MUI Components
import { Box, styled } from "@mui/material";

//* react router dom imports
import { useNavigate } from "react-router-dom";

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

//? styles components
const StyledMainCtn = styled(Box)(({ theme }) => ({
  height: "100vh",
  width: "100vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
}));

const StyledImg = styled("img")(({ theme }) => ({
  height: "100vh",
  width: "68%",
  maxWidth: "100%",
  objectFit: "cover",

  [theme.breakpoints.down("xl")]: {
    width: "57%",
  },

  [theme.breakpoints.down("lg")]: {
    width: "53%",
  },

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

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
        // console.log(basicAuthHeader);
        const response = await axios.get(
          `https://43.204.145.104:8000/user/login/${email}`,
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
      <StyledMainCtn>
        <StyledImg src={swiper1} alt="RNSIT AUDITORIUM" />

        <Box
          sx={{
            // p: 4,
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Outlet />
        </Box>

        {/* Modal window with loader */}
        <ModalWindowLoader modal={modal} setModal={setModal} />
      </StyledMainCtn>
    </>
  );
};

export default LoginPage;
