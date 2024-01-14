import { Box, styled, useMediaQuery, useTheme } from "@mui/material";

//* native components imports
import MarginTopBox from "../../components/MarginTopBox";
import SubContainer from "../../components/SubContainer";
import CustomH3 from "../../components/CustomH3";
import BannerBG from "../../components/BannerBG";

//* constants import
import {
  BANNER_SIZE_FORM,
  FONTSIZE_BIGGER,
  FONTSIZE_MEDIUM,
  FONTSIZE_SMALL,
  BANNER_SIZE_FORM_MD,
} from "../../data/constants";

const StyledInstructionBox = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100%",
  flexDirection: "column",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const StyledLi = styled("li")(({ theme }) => ({
  fontSize: FONTSIZE_MEDIUM,

  [theme.breakpoints.down("md")]: {
    fontSize: FONTSIZE_SMALL,
    marginBottom: theme.spacing(1),
  },
}));

export default function Banner() {
  //? useMediaQuery
  const theme = useTheme();
  const isScreenSmaller = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <MarginTopBox>
      <BannerBG
        height={isScreenSmaller ? BANNER_SIZE_FORM_MD : BANNER_SIZE_FORM}
      >
        <SubContainer>
          <StyledInstructionBox>
            <CustomH3 color="white" fontSize={FONTSIZE_BIGGER}>
              Writing a good grievance
            </CustomH3>
            <ul>
              <StyledLi>Summarize your problem in a one-line title.</StyledLi>
              <StyledLi>Describe your problem in more detail.</StyledLi>
              <StyledLi>
                Add “categories” which help surface your question to faculties.
              </StyledLi>
              <StyledLi>Review your question and post it to the site.</StyledLi>
            </ul>
          </StyledInstructionBox>
        </SubContainer>
      </BannerBG>
    </MarginTopBox>
  );
}
