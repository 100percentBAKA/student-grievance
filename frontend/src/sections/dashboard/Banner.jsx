//* MUI components imports
import { Box, styled } from "@mui/material";

//* native components import
import CustomH3 from "../../components/CustomH3";
import ContainedButton from "../../components/ContainedButton";
import SubContainer from "../../components/SubContainer";
import BannerBG from "../../components/BannerBG";

//* react router dom
import { Link } from "react-router-dom";

//? styled components
const StyledContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

const StyledSubCtn = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(10),
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",

  [theme.breakpoints.down("md")]: {
    paddingTop: theme.spacing(3),
    alignItems: "start",
    flexDirection: "column",
  },
}));

export default function Banner() {
  return (
    <BannerBG>
      <SubContainer className="something">
        <StyledSubCtn>
          <StyledContentBox>
            <CustomH3 fontSize="2rem" color="white">
              Raised Grievances
            </CustomH3>

            <CustomH3 fontSize="1.25rem" fontWeight={400} color="white">
              Raise / Update
            </CustomH3>
          </StyledContentBox>

          {/* //! Using Link component from 'react-router-dom' here */}
          <Box component={Link} sx={{ textDecoration: "none" }} to="/form">
            <ContainedButton padding="0.6rem 1.2rem">
              Raise Grievance
            </ContainedButton>
          </Box>
        </StyledSubCtn>
      </SubContainer>
    </BannerBG>
  );
}
