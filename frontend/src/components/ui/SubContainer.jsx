//* MUI components
import { Box, styled } from "@mui/material";

//* styled components
const SubBox = styled(Box)(({ theme }) => ({
  width: "1200px", // desktop first approach
  margin: "auto",
  height: "100%",
  // backgroundColor: "red",

  [theme.breakpoints.down("lg")]: {
    width: "900px",
  },

  [theme.breakpoints.down("md")]: {
    width: "600px",
  },

  [theme.breakpoints.down("sm")]: {
    width: "300px",
  },
}));

export default function SubContainer({ children }) {
  return <SubBox>{children}</SubBox>;
}
