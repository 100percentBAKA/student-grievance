//* MUI components import
import { Box } from "@mui/material";

//* native section import
import Navbar from "./Navbar";
import Banner from "./Banner";
import CardContainer from "./CardContainer";

export default function MainDashboardPage() {
  return (
    <Box>
      <Navbar />
      <Banner />
      <CardContainer />
    </Box>
  );
}
