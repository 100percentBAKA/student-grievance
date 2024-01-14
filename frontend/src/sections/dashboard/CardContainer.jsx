//* native components import
import CustomCard from "../../components/CustomCardDashboard";
import { FONTSIZE_MEDIUM, FONTSIZE_SMALL } from "../../data/constants";

//* data import
import grievanceCardDisplayData from "../../data/grievanceCardDisplayData";

//* MUI components import
import { Box, Button, ButtonGroup, styled } from "@mui/material";

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
  marginBottom: theme.spacing(5),
}));

const StyledCardCtn = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

export default function CardContainer() {
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

      <StyledCardCtn>
        {grievanceCardDisplayData.map((data, index) => (
          <CustomCard
            title={data.title}
            cats={data.cat}
            time={data.time}
            key={index}
          />
        ))}
      </StyledCardCtn>
    </Box>
  );
}
