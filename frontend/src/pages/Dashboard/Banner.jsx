//* images imports
import bannerBg from "../../assets/student-grievance-bg.jpg";

//* MUI components imports
import { Box, styled } from "@mui/material";

//* native components import
import CustomH3 from "../../components/CustomH3";
import ContainedButton from "../../components/ContainedButton";
import SubContainer from "../../components/SubContainer";

//? styled components
const StyledMainCtn = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(10),
  width: "100%",
  backgroundImage: `url(${bannerBg})`,
  height: "400px",
  objectFit: "cover",
}));

const StyledContentBox = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(5),
  display: "flex",
  flexDirection: "column",

  [theme.breakpoints.up("lg")]: {
    paddingTop: theme.spacing(13),
  },
}));

export default function Banner() {
  return (
    <StyledMainCtn>
      <SubContainer>
        <StyledContentBox>
          <CustomH3 fontSize="3rem" color="white">
            Raised Grievances
          </CustomH3>

          <CustomH3 fontSize="1.4rem" fontWeight={400} color="white">
            Raise / Update
          </CustomH3>
        </StyledContentBox>

        <ContainedButton padding="0.6rem 1.2rem">
          Raise Grievance
        </ContainedButton>
      </SubContainer>
    </StyledMainCtn>
  );
}
