//* native component imports
import SubContainer from "./SubContainer";

//* MUI components import
import { Box, styled } from "@mui/material";

//? styled components
const StyledMainCtn = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  borderTop: "0.5px solid black",
  color: theme.palette.secondary.main,
  fontSize: "1.335rem",
  fontWeight: 500,

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2.5),
    fontSize: "1.2rem",
  },
}));

const StyledSubCtn = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  marginTop: theme.spacing(3),
  justifyContent: "space-between",

  [theme.breakpoints.down("md")]: {
    rowGap: theme.spacing(2),
    flexDirection: "column",
  },
}));

const StyledCatSpan = styled("span")(({ theme }) => ({
  cursor: "pointer",
  backgroundColor: "#ADD8E6",
  borderRadius: theme.shape.borderRadius,
  padding: "0 3px",
  transition: "background-color 0.2s ease-in-out",
  fontSize: "0.85rem",

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
          <Box sx={{ fontSize: "0.85rem" }}>
            Asked: <StyledCatSpan>{time}</StyledCatSpan> ago
          </Box>
        </StyledSubCtn>
      </StyledMainCtn>
    </SubContainer>
  );
}
