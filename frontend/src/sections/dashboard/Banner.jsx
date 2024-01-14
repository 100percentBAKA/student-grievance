//* MUI components imports
import { Box, styled, useMediaQuery, useTheme } from "@mui/material";

//* native components import
import CustomH3 from "../../components/CustomH3";
import ContainedButton from "../../components/ContainedButton";
import SubContainer from "../../components/SubContainer";
import BannerBG from "../../components/BannerBG";

import {
  BANNER_SIZE_DASHBOARD,
  BANNER_SIZE_DASHBOARD_MD,
  FONTSIZE_BIGGER,
} from "../../data/constants";

//* react router dom
import { Link } from "react-router-dom";

//? styled components
const StyledSubCtn = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100%",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",

  [theme.breakpoints.down("md")]: {
    alignItems: "start",
    justifyContent: "center",
    flexDirection: "column",
  },
}));

//? constants

export default function Banner() {
  //? useMediaQuery
  const theme = useTheme();
  const isScreenSmaller = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <BannerBG
      height={
        isScreenSmaller ? BANNER_SIZE_DASHBOARD_MD : BANNER_SIZE_DASHBOARD
      }
    >
      <SubContainer className="something">
        <StyledSubCtn>
          <CustomH3 fontSize={FONTSIZE_BIGGER} color="white">
            Student Dashboard
          </CustomH3>

          {/* //! Using Link component from 'react-router-dom' here */}
          <Box
            component={Link}
            sx={{ textDecoration: "none", marginTop: 2 }}
            to="/form"
            id="back-to-top-anchor"
          >
            <ContainedButton padding="0.6rem 1rem">
              Raise Grievance
            </ContainedButton>
          </Box>
        </StyledSubCtn>
      </SubContainer>
    </BannerBG>
  );
}
