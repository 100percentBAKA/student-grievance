//* MUI components imports
import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";

//* native components imports
import MarginTopBox from "../components/ui/MarginTopBox";
import SubContainer from "../components/ui/SubContainer";
import CustomH3 from "../components/ui/CustomH3";
import BannerBG from "../components/ui/BannerBG";
import CustomCardForm from "../components/ui/CustomCardForm";

//* constants import
import {
  BANNER_SIZE_FORM,
  FONTSIZE_BIGGER,
  FONTSIZE_MEDIUM,
  FONTSIZE_SMALL,
  BANNER_SIZE_FORM_MD,
} from "../data/constants";

//* formik and yup install
import { useFormik } from "formik";
import * as Yup from "yup";

//* data imports
import categories from "../data/grievanceCategories";
import { useState } from "react";

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

const StyledHelperText = styled(FormHelperText)(({ theme }) => ({
  color: "red",
  marginLeft: theme.spacing(1),
}));

const GRIEVANCE_FORM_SCHEMA = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  desc: Yup.string().required("Description is required"),
  selectedOption: Yup.array().required("Please select an option"),
});

export default function MainFormPage() {
  //? useMediaQuery
  const theme = useTheme();
  const isScreenSmaller = useMediaQuery(theme.breakpoints.down("md"));

  //? formik form handling
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
    <MarginTopBox>
      <BannerBG
        height={isScreenSmaller ? BANNER_SIZE_FORM_MD : BANNER_SIZE_FORM}
      >
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

      <Box sx={{ width: "100%", marginTop: 5, marginBottom: 5 }}>
        <SubContainer>
          <form onSubmit={formik.handleSubmit}>
            <StyledCardSubCtn>
              <CustomCardForm>
                <StyledHeader>Title</StyledHeader>
                <TextField
                  id="form-title"
                  name="form-title"
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
                <StyledHeader>
                  What are the details of your problem?
                </StyledHeader>
                <TextField
                  id="form-desc"
                  name="form-desc"
                  label="Description"
                  variant="outlined"
                  value={formik.values.desc}
                  multiline
                  placeholder="Introduce the grievance and expand on what you put in the title. Minimum 20 characters."
                  rows={5}
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
                    formik.touched.selectedOption &&
                      formik.errors.selectedOption
                  )}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.cat}>
                      <Checkbox
                        checked={selectedOptions.indexOf(cat.cat) > -1}
                      />
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
    </MarginTopBox>
  );
}
