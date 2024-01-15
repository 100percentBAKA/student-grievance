//* native component imports
import SubContainer from "./SubContainer";

//* MUI components import
import { Box, styled } from "@mui/material";

//* import constants
import { FONTSIZE_MEDIUM, FONTSIZE_SMALL } from "../data/constants";

//? styled components
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

export default function CustomCard({ title, cats, time }) {
  return (
    <SubContainer>
      <StyledMainCtn>
        <Box sx={{ cursor: "pointer" }}>{title}</Box>
        <StyledSubCtn>
          <Box sx={{ display: "flex", columnGap: 1 }}>
            {cats.map((cat, index) => (
              <StyledCatSpan key={index}>{cat}</StyledCatSpan>
            ))}
          </Box>
          <Box sx={{ fontSize: FONTSIZE_SMALL }}>Asked: {time} ago</Box>
        </StyledSubCtn>
      </StyledMainCtn>
    </SubContainer>
  );
}
