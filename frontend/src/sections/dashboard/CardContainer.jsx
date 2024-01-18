//* native components import
import SubContainer from "../../components/SubContainer";
import { FONTSIZE_MEDIUM, FONTSIZE_SMALL } from "../../data/constants";

//* MUI components import
import { Box, Button, ButtonGroup, styled } from "@mui/material";

//* data import
import grievanceCardDisplayData from "../../data/grievanceCardDisplayData";

//* react router dom imports
import { Link } from "react-router-dom";

//? styled components
const StyledBtn = styled(Button)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: FONTSIZE_MEDIUM,

  [theme.breakpoints.down("md")]: {
    fontSize: FONTSIZE_SMALL,
  },
}));

const StyledBtnGrp = styled(ButtonGroup)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const StyledMainCtn = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5),
  display: "flex",
  flexDirection: "column",
  borderTop: "0.5px solid black",
  color: theme.palette.secondary.main,
  fontSize: FONTSIZE_MEDIUM,
  fontWeight: 500,

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const StyledSubCtn = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  marginTop: theme.spacing(2),
  justifyContent: "space-between",

  [theme.breakpoints.down("md")]: {
    marginTop: theme.spacing(1),
    rowGap: theme.spacing(2.5),
    flexDirection: "column",
  },
}));

const StyledCatSpan = styled("span")(({ theme }) => ({
  cursor: "pointer",
  backgroundColor: "#ADD8E6",
  borderRadius: theme.shape.borderRadius,
  padding: "0 3px",
  transition: "background-color 0.2s ease-in-out",
  fontSize: FONTSIZE_SMALL,

  "&:hover": {
    backgroundColor: "#87CEEB",
  },
}));

const StyledCardTitle = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  color: theme.palette.secondary.main,
  fontSize: FONTSIZE_MEDIUM,
  textDecoration: "none",
  transition: "color 0.3s ease",

  [theme.breakpoints.down("md")]: {
    fontSize: FONTSIZE_SMALL,
  },

  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const CardContainer = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <StyledBtnGrp
        variant="outlined"
        aria-label="outlined button group"
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: FONTSIZE_MEDIUM,
        }}
      >
        {["All", "Resolved", "Unresolved"].map((buttonText) => (
          <StyledBtn>{buttonText}</StyledBtn>
        ))}
      </StyledBtnGrp>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: 5,
          marginBottom: 5,
        }}
      >
        {grievanceCardDisplayData.map((data, index) => (
          <SubContainer>
            <StyledMainCtn key={index}>
              <StyledCardTitle component={Link} to="/grievance/1">
                {data.title}
              </StyledCardTitle>
              <StyledSubCtn>
                <Box sx={{ display: "flex", columnGap: 1 }}>
                  {data.cat.map((cat, catIndex) => (
                    <StyledCatSpan key={catIndex}>{cat}</StyledCatSpan>
                  ))}
                </Box>
                <Box sx={{ fontSize: FONTSIZE_SMALL }}>
                  Asked: {data.time} ago
                </Box>
              </StyledSubCtn>
            </StyledMainCtn>
          </SubContainer>
        ))}
      </Box>
    </Box>
  );
};

export default CardContainer;
