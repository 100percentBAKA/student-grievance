//* MUI components
import { Box, styled } from "@mui/material";

//* constants imports
import { FONTSIZE_MEDIUM } from "../../data/constants";

//? styled components
const StyledMainCtn = styled(Box)(({ theme, height }) => ({
  display: "flex",
  flexDirection: "column",
  rowGap: theme.spacing(2),

  height: height,
  border: `0.5px solid black`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  color: theme.palette.secondary.main,
  fontSize: FONTSIZE_MEDIUM,
  fontWeight: 600,

  position: "relative",

  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(1.5),
  },
}));

export default function CustomCardForm({ children, height }) {
  return <StyledMainCtn height={height}>{children}</StyledMainCtn>;
}
