import { useState } from "react";

//* MUI components import
import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  TextareaAutosize,
  styled,
} from "@mui/material";

//* native components imports
import SubContainer from "../../components/SubContainer";
import CustomCardForm from "../../components/CustomCardForm";
import { FONTSIZE_MEDIUM } from "../../data/constants";

//* formik and yup install
import { useFormik } from "formik";
import * as Yup from "yup";

//* data imports
import categories from "../../data/grievanceCategories";

const GRIEVANCE_FORM_SCHEMA = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  desc: Yup.string().required("Description is required"),
  selectedOption: Yup.array().required("Please select an option"),
});

//? styled components
const StyledCardSubCtn = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  rowGap: theme.spacing(7),

  [theme.breakpoints.down("md")]: {
    rowGap: theme.spacing(4),
  },
}));

const StyledHeader = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

const StyledTextArea = styled(TextareaAutosize)(({ theme }) => ({
  padding: theme.spacing(2),
  fontFamily: theme.typography.fontFamily,
  fontSize: FONTSIZE_MEDIUM,
}));

const StyledHelperText = styled(FormHelperText)(({ theme }) => ({
  color: "red",
  marginLeft: theme.spacing(1),
}));

export default function FormContainer() {
  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      selectedOption: [],
    },
    validationSchema: GRIEVANCE_FORM_SCHEMA,
    onSubmit: (values) => {
      //! API call handling will be performed here
      console.log(values);
    },
  });

  const [selectedOptions, setSelectedOptions] = useState([]);

  return (
    <Box sx={{ width: "100%", marginTop: 5, marginBottom: 5 }}>
      <SubContainer>
        <form onSubmit={formik.handleSubmit}>
          <StyledCardSubCtn>
            <CustomCardForm>
              <StyledHeader>Title</StyledHeader>
              <TextField
                id="form-title"
                name="title"
                label="Title"
                variant="outlined"
                placeholder="Be specific and imagine you’re asking a question to another person."
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.title && formik.errors.title)}
              />
              {formik.touched.title && formik.errors.title && (
                <StyledHelperText>{formik.errors.title}</StyledHelperText>
              )}
            </CustomCardForm>

            <CustomCardForm>
              <StyledHeader>What are the details of your problem?</StyledHeader>
              <StyledTextArea
                placeholder="Introduce the issue and expand on what you put in the title. Minimum 50 characters."
                id="form-textarea"
                name="desc"
                value={formik.values.desc}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.desc && formik.errors.desc)}
              />
              {formik.touched.desc && formik.errors.desc && (
                <StyledHelperText>{formik.errors.desc}</StyledHelperText>
              )}
            </CustomCardForm>

            <CustomCardForm>
              <StyledHeader>Categories</StyledHeader>
              <Select
                // input={<OutlinedInput label="Categories" />}
                multiple
                id="form-option"
                name="selectedOption"
                value={formik.values.selectedOption}
                renderValue={(selected) => selected.join(", ")}
                onChange={(e) => {
                  formik.handleChange(e);
                  setSelectedOptions(e.target.value);
                }}
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

              {formik.touched.selectedOption &&
                formik.errors.selectedOption && (
                  <StyledHelperText>
                    {formik.errors.selectedOption}
                  </StyledHelperText>
                )}
            </CustomCardForm>
          </StyledCardSubCtn>

          <Button
            type="submit"
            sx={{
              marginTop: 5,
              color: "white",
              borderRadius: "3px",
              textTransform: "none",
              backgroundColor: "#ff6500",
              boxShadow: `0 4px 10px 0 rgba(255, 101, 0, 0.3), 0 6px 20px 0 rgba(255, 101, 0, 0.19)`,
              fontSize: FONTSIZE_MEDIUM,
              width: "fit-content",
              padding: "0.6rem 1.2rem",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#e63c1e",
                boxShadow: `0 8px 20px 0 rgba(255, 101, 0, 0.35), 0 12px 40px 0 rgba(255, 101, 0, 0.24)`,
              },
            }}
          >
            Submit
          </Button>
        </form>
      </SubContainer>
    </Box>
  );
}
