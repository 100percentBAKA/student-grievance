import React, { useState } from "react";

//* native components imports
import MarginTopBox from "../components/ui/MarginTopBox";
import BannerBG from "../components/ui/BannerBG";
import SubContainer from "../components/ui/SubContainer";
import CustomH3 from "../components/ui/CustomH3";

//* MUI components imports
import {
  Box,
  Button,
  Checkbox,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";

//* constants imports
import {
  BANNER_SIZE_FORM,
  BANNER_SIZE_FORM_MD,
  FONTSIZE_BIGGER,
  FONTSIZE_MEDIUM,
  FONTSIZE_SMALL,
} from "../data/constants";
import categories from "../data/grievanceCategories";

//* yup and formik
import { useFormik } from "formik";
import * as yup from "yup";

//? styled components
const StyledInstructionBox = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100%",
  flexDirection: "column",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const StyledLi = styled("li")(({ theme }) => ({
  fontSize: FONTSIZE_MEDIUM,

  [theme.breakpoints.down("md")]: {
    fontSize: FONTSIZE_SMALL,
    marginBottom: theme.spacing(1),
  },
}));

const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  rowGap: theme.spacing(4),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  borderRadius: "3px",
  textTransform: "none",
  backgroundColor: theme.palette.primary.main,
  boxShadow: `0 4px 10px 0 rgba(255, 101, 0, 0.3), 0 6px 20px 0 rgba(255, 101, 0, 0.19)`,
  fontSize: FONTSIZE_MEDIUM,
  width: "fit-content",
  padding: "0.6rem 0.8rem",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#e63c1e",
    boxShadow: `0 8px 20px 0 rgba(255, 101, 0, 0.35), 0 12px 40px 0 rgba(255, 101, 0, 0.24)`,
  },

  [theme.breakpoints.down("md")]: {
    fontSize: FONTSIZE_SMALL,
  },
}));

// const StyledLabel = styled("label")(({ theme }) => ({
//   fontSize: FONTSIZE_MEDIUM,
//   fontWeight: 600,
// }));

function BannerDisplay({ viewPort }) {
  return (
    <BannerBG height={viewPort ? BANNER_SIZE_FORM_MD : BANNER_SIZE_FORM}>
      <SubContainer>
        <StyledInstructionBox>
          <CustomH3 color="white" fontSize={FONTSIZE_BIGGER}>
            Writing a good grievance
          </CustomH3>
          <ul id="back-to-top-anchor">
            <StyledLi>Summarize your problem in a one-line title.</StyledLi>
            <StyledLi>Describe your problem in more detail.</StyledLi>
            <StyledLi>
              Add “categories” which help surface your question to faculties.
            </StyledLi>
            <StyledLi>Review your question and post it to the site.</StyledLi>
          </ul>
        </StyledInstructionBox>
      </SubContainer>
    </BannerBG>
  );
}

function FormDisplay() {
  //? schema
  const schema = yup.object().shape({
    fullName: yup.string(),
    studentId: yup.string(),
    contactInfo: yup.string(),
    title: yup
      .string()
      .min(15, "Title must be a minimum of 15 characters")
      .required("Title is required"),
    desc: yup
      .string()
      .min(50, "Description must be a minimum of 50 characters")
      .required("Description is required"),
    selectedOption: yup
      .array()
      .min(1, "Select a Min of 1 category")
      .required("Please select an option"),
  });

  //? formik form handling
  //! inject the values from the session storage / cookies into the initial values of fullname, studentId and contactInfo
  const formik = useFormik({
    initialValues: {
      fullName: "Adarsh G S",
      studentId: "1RN21CS011",
      contactInfo: "1n21cs011.adarshgs@gmail.com",
      title: "",
      desc: "",
      selectedOption: ["Administration"],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const [selectedOptions, setSelectedOptions] = useState([]);

  return (
    <Box sx={{ my: 5 }}>
      <Box
        sx={{ fontSize: "1.6rem", fontWeight: 700, mb: 5, textAlign: "center" }}
      >
        Report an Issue
      </Box>

      <StyledForm onSubmit={formik.handleSubmit}>
        {/* <StyledLabel htmlFor="title">Title</StyledLabel> */}

        <TextField
          id="fullName"
          name="fullName"
          label="Full Name"
          placeholder="Enter your Full Name"
          variant="outlined"
          fullWidth
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.fullName && Boolean(formik.errors.fullName)}
          helperText={formik.touched.fullName && formik.errors.fullName}
          disabled
        />

        <TextField
          id="studentId"
          name="studentId"
          label="Student Id"
          placeholder="Enter your Student Id"
          variant="outlined"
          fullWidth
          value={formik.values.studentId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.studentId && Boolean(formik.errors.studentId)}
          helperText={formik.touched.studentId && formik.errors.studentId}
          disabled
        />

        <TextField
          id="contactInfo"
          name="contactInfo"
          label="Contact Information"
          placeholder="Your Email or Phone number"
          variant="outlined"
          fullWidth
          value={formik.values.contactInfo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.contactInfo && Boolean(formik.errors.contactInfo)
          }
          helperText={formik.touched.contactInfo && formik.errors.contactInfo}
          disabled
        />

        <TextField
          id="title"
          name="title"
          label="Title"
          placeholder="Be specific and imagine you’re asking a question to another person."
          variant="outlined"
          fullWidth
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />

        {/* <StyledLabel htmlFor="desc">Description</StyledLabel> */}
        <TextField
          id="desc"
          name="desc"
          label="Description"
          placeholder="Introduce the grievance and expand on what you put in the title. Minimum 20 characters."
          variant="outlined"
          fullWidth
          multiline
          rows={5}
          value={formik.values.desc}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.desc && Boolean(formik.errors.desc)}
          helperText={formik.touched.desc && formik.errors.desc}
        />

        <Select
          multiple
          id="selectedOption"
          value={formik.values.selectedOption}
          name="selectedOption"
          onChange={(e) => {
            formik.handleChange(e);
            setSelectedOptions(e.target.value);
          }}
          renderValue={(selected) => selected.join(", ")}
          onBlur={formik.handleBlur}
          error={Boolean(
            formik.touched.selectedOption && formik.errors.selectedOption
          )}
        >
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.cat}>
              <Checkbox checked={selectedOptions.indexOf(cat.cat) > -1} />
              <ListItemText primary={cat.cat} />
            </MenuItem>
          ))}
        </Select>

        <StyledButton
          variant="outlined"
          sx={{ width: "fit-content" }}
          type="submit"
        >
          Submit
        </StyledButton>
      </StyledForm>
    </Box>
  );
}

export default function GrievanceForm() {
  //? useMediaQuery
  const theme = useTheme();
  const isScreenSmaller = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <MarginTopBox>
      <BannerDisplay viewPort={isScreenSmaller} />
      <SubContainer>
        <FormDisplay />
      </SubContainer>
    </MarginTopBox>
  );
}
