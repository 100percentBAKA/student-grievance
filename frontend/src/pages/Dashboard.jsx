//* MUI components import
import { Box } from "@mui/material";

//* native section import
import Banner from "../sections/dashboard/Banner";
import CardContainer from "../sections/dashboard/CardContainer";

//* native components import
import MarginTopBox from "../components/MarginTopBox";
import ScrollTop from "../components/ScrollTop";

export default function Dashboard() {
  return (
    <MarginTopBox>
      <Banner />
      <CardContainer />
      <ScrollTop />
    </MarginTopBox>
  );
}
